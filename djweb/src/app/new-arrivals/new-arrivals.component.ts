import { Component, OnInit } from '@angular/core';
import { Track } from '../track/track.component';
import { LibraryDataService } from '../service/data/library-data.service';
import { PlaylistDataService } from '../service/data/playlist-data.service';
import { Subscription } from 'rxjs';
import { CRATE_LAN_LIBRARY, CrateMeta } from '../app.constants';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss']
})
export class NewArrivalsComponent implements OnInit {
  tracks!: Track[];
  requestInterval: any;
  requestable: boolean = true;
  requestSubscription: Subscription;
  CRATE_LL: CrateMeta = CRATE_LAN_LIBRARY;
  
  constructor(
    private libraryDataService: LibraryDataService,
    private playlistDataService: PlaylistDataService
  ){
    this.requestSubscription = this.playlistDataService.watchForNotification().subscribe((data)=>{
      this.setReqDelay(data, new Date());
    })
  }

  ngOnInit(): void {
    //Get tracks
    this.libraryDataService.retrieveNewTracks().subscribe(
      data => {
        this.tracks = data._embedded.tracks;
      }
    )
  }

    /**
   * Add a song to the Auto DJ queue AND
   * add it to the default crate.
   * Set a delay on future requests 
   * using a calculation based on the song's duration.
   * @param id Track id
   * @param duration Track duration
   */
    requestSong(id: number, duration: number) {
      const now = new Date();
      const nru = localStorage.getItem('noRequestsUntil');
      if ((nru) && (now.getTime() < JSON.parse(nru))) { 
        console.log("Sorry, no requests until " + nru);
      } else {
        //console.log("Request song #" + id);
        var resultMsg: string;
        this.playlistDataService.requestTrackCrate(id, CRATE_LAN_LIBRARY.id).subscribe(data => {
          resultMsg = data;
          this.setReqDelay(duration, now);
          localStorage.setItem('lastRequest', id.toString());
          this.playlistDataService.notifyOfRequest(duration);
          this.libraryDataService.retrieveNewTracks().subscribe(
            data2 => {
              this.tracks = data2._embedded.tracks;
            }
          )
        });
      }
    }

  /**
   * Calculate and set a delay 
   * @param duration 
   * @param now 
   */
  setReqDelay(duration: number, now: Date) {
    this.requestInterval = setInterval(() => this.reqTimeoutOver(), duration * 100);
    let delayTime = now.getTime() + (duration * 100);
    this.requestable = false;
    console.log(now.getTime());
    console.log(duration * 1000);
    console.log(delayTime);
    localStorage.setItem('noRequestsUntil', JSON.stringify(delayTime));
  }

  /**
   * Reset request timeout variables when time's up
   */
  reqTimeoutOver() {
    this.requestable = true;
    clearInterval(this.requestInterval);
  }
}
