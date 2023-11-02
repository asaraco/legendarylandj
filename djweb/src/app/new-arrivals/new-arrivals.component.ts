import { Component, OnInit } from '@angular/core';
import { Track } from '../track/track.component';
import { LibraryDataService } from '../service/data/library-data.service';
import { PlaylistDataService } from '../service/data/playlist-data.service';
import { Subscription } from 'rxjs';
import { CRATE_LAN_LIBRARY, CrateMeta, UI_BTN_TOOLTIP_DISABLED, UI_REQUEST_TEXT } from '../app.constants';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss']
})
export class NewArrivalsComponent implements OnInit {
  tracks!: Track[];
  requestInterval: any;
  requestable: boolean = true;
  justRequested!: number;
  showReqToast: boolean = false;
  requestSubscription: Subscription;
  uploadSubscription: Subscription;
  buttonTooltip: string = "";
  CRATE_LL: CrateMeta = CRATE_LAN_LIBRARY;
  UI_REQUEST_TEXT: string = UI_REQUEST_TEXT;
  
  constructor(
    private libraryDataService: LibraryDataService,
    private playlistDataService: PlaylistDataService
  ){
    this.requestSubscription = this.playlistDataService.watchForNotification().subscribe((data)=>{
      this.justRequested = 999999999999999;
      this.setReqDelay(data.duration, data.reqTotal, new Date());
    });
    this.uploadSubscription = this.libraryDataService.watchForUpload().subscribe((data) => {
      //console.log("Detected upload");
      //Copy tracks to temp array
      let newTracks: Track[] = [];
      this.tracks.forEach(t => newTracks.push(Object.assign({}, t)));
      //Retrieve "new tracks" from service until something actually new is detected.
      //Since comparing the actual arrays would take a while, let's just compare length.
      //Unless someone else uploads something at the exact same time, this should usually be enough...
      let upInterval = setInterval(() => {
        if (newTracks.length==this.tracks.length) {
          //console.log(newTracks.length + " = " + this.tracks.length);
          this.libraryDataService.retrieveNewTracks().subscribe(
            data => {
              newTracks = data._embedded.tracks;
            }
          )
        } else {
          //console.log("Found new!");
          clearInterval(upInterval);
          this.ngOnInit();
        }
      }, 2500);
      
    });
  }

  ngOnInit(): void {
    //Get tracks
    this.libraryDataService.retrieveNewTracks().subscribe(
      data => {
        this.tracks = data._embedded.tracks;
      }
    );
    // Handle request blocking
    const now = new Date();
    const ls_noRequestsUntil = localStorage.getItem('noRequestsUntil');
    const ls_lastRequest = localStorage.getItem('lastRequest');
    if (ls_noRequestsUntil) {
      let remainingTimeout = JSON.parse(ls_noRequestsUntil) - now.getTime();
      if (remainingTimeout > 0) { 
        this.requestable = false;
        if (ls_lastRequest) this.justRequested = JSON.parse(ls_lastRequest);
        this.requestInterval = setInterval(() => this.reqTimeoutOver(), remainingTimeout);
      }
    }
  }

    /** 
   * Add a song to the Auto DJ queue AND
   * add it to the default crate.
   * Set a delay on future requests 
   * using a calculation based on the song's duration.
   * @param id Track id
   * @param duration Track duration
   */
    requestAndAddSong(id: number, duration: number) {
      const now = new Date();
      const nru = localStorage.getItem('noRequestsUntil');
      if ((nru) && (now.getTime() < JSON.parse(nru))) { 
        //console.log("Sorry, no requests until " + nru);
      } else {
        //Get total # of requests by this user from local storage
        //let userId = localStorage.getItem('userNumber');
        let ls_requestTotal = localStorage.getItem('requestTotal');
        let requestTotal: number = 0;
        if (ls_requestTotal) {
          requestTotal = JSON.parse(ls_requestTotal);
        }
        //console.log("requestTotal = " + requestTotal);
        //Make the request
        //console.log("Request song #" + id);
        var resultMsg: string;
        this.playlistDataService.requestTrackCrate(id, CRATE_LAN_LIBRARY.id).subscribe(data => {
          resultMsg = data;
          this.showReqToast = true;
          localStorage.setItem('lastRequest', id.toString());
          //this.setReqDelay(duration, now);
          this.playlistDataService.notifyOfRequest(duration, requestTotal, true);
          this.justRequested = id;
          let animationInterval = setInterval(() => {
            this.libraryDataService.retrieveNewTracks().subscribe(data2 => this.tracks = data2._embedded.tracks);
            clearInterval(animationInterval);
          }, 1000);          
        });
      }
    }

  /**
   * Calculate and set a delay 
   * @param duration 
   * @param now 
   */
  setReqDelay(duration: number, reqTotal: number, now: Date) {
    //Determine time since last request **NOT USED YET**
    const ls_noRequestsUntil = localStorage.getItem('noRequestsUntil');
    if (ls_noRequestsUntil) {
      let nru: number = JSON.parse(ls_noRequestsUntil);
      let timeSince: number = now.getTime() - nru;
      //console.log("NEW: It's been " + timeSince + " since a request was made and delayed");
      if (timeSince > 1800000) {  // 1,800,000 milliseconds = 30 minutes
        let discountFactor = 1 + (timeSince / 1800000); // At least 1; for every half hour, add another
        reqTotal = Math.round(reqTotal/discountFactor);
      }
    }
    //Calculate delay
    let newDelay = Math.round(duration) * ((1 + Math.round(reqTotal/3))*100);
    this.requestInterval = setInterval(() => this.reqTimeoutOver(), newDelay);
    let delayTime = now.getTime() + newDelay;
    this.requestable = false;
    //console.log("Setting noRequestsUntil to "+ delayTime);
    localStorage.setItem('noRequestsUntil', JSON.stringify(delayTime));
    reqTotal++;
    localStorage.setItem('requestTotal',JSON.stringify(reqTotal));
    //Set button tooltips
    this.buttonTooltip = UI_BTN_TOOLTIP_DISABLED;
  }

  /**
   * Reset request timeout variables when time's up
   */
  reqTimeoutOver() {
    this.justRequested = -1;
    this.requestable = true;
    clearInterval(this.requestInterval);
    this.buttonTooltip = "";
  }
}
