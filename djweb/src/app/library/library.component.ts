import { Component, HostListener, OnInit } from '@angular/core';
import { Track } from '../track/track.component';
import { LibraryDataService } from '../service/data/library-data.service';
import { UI_SEARCH_TEXT, UI_CATS_TEXT, CrateMeta, CRATES_SELECTABLE, CRATES_SIMPLEVIEW, CRATE_ALL, CRATES_ALBUMVIEW, UI_REQUEST_TEXT, UI_BTN_TOOLTIP_DISABLED } from '../app.constants';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, debounceTime, map, startWith } from 'rxjs';
import { PlaylistDataService } from '../service/data/playlist-data.service';
import { PlaylistTrack } from '../playlist-track/playlist-track.component';

/** Main component code */

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  tracks!: Track[];
  filteredTracks!: Observable<Track[]>;
  headingList: String[] = [];
  headingListChanged: boolean = true;
  //@Input() filterCrate: number = 0;
  selectedCrateId: number = 0;
  filterCrate: CrateMeta = CRATE_ALL;
  startsWith: string = "";
  searchTerm: string = "";
  searchControl: FormControl = new FormControl();
  justRequested: number = -1;
  showReqToast: boolean = false;
  requestInterval: any;
  toastInterval: any;
  alphabet: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  showCrateDropDown: boolean = false;
  scrolledDown: boolean = false;
  requestSubscription: Subscription;
  buttonTooltip: string = "";
  /* imported constants */
  UI_SEARCH_TEXT: string = UI_SEARCH_TEXT;
  UI_CATS_TEXT: string = UI_CATS_TEXT;
  UI_REQUEST_TEXT: string = UI_REQUEST_TEXT;
  CRATES_SELECTABLE: CrateMeta[] = CRATES_SELECTABLE;
  CRATES_SIMPLEVIEW: number[] = CRATES_SIMPLEVIEW;
  CRATES_ALBUMVIEW: number[] = CRATES_ALBUMVIEW;

  constructor(
    private libraryDataService: LibraryDataService,
    private playlistDataService: PlaylistDataService
  ){
    this.requestSubscription = this.playlistDataService.watchForNotification().subscribe((data)=>{
      this.justRequested = 999999999999999;
      this.setReqDelay(data.duration, data.reqTotal, new Date());
      if (data.triggerRefresh) {
        this.libraryDataService.retrieveAllTracks().subscribe(
          data => { 
                    this.tracks = data._embedded.tracks;
                    this.filteredTracks = this.searchControl.valueChanges.pipe(debounceTime(500), startWith(''), map(value => this._filter(value)));
                  }
        );
      }      
    })
  }

  ngOnInit(): void {
    // Get main list of tracks
    this.libraryDataService.retrieveAllTracks().subscribe(
      data => { 
                this.tracks = data._embedded.tracks;
                this.filteredTracks = this.searchControl.valueChanges.pipe(debounceTime(500), startWith(''), map(value => this._filter(value)));
              }
    );
    // Handle request blocking
    const now = new Date();
    const ls_noRequestsUntil = localStorage.getItem('noRequestsUntil');
    const ls_lastRequest = localStorage.getItem('lastRequest');
    if (ls_noRequestsUntil) {
      let remainingTimeout = JSON.parse(ls_noRequestsUntil) - now.getTime();
      if (remainingTimeout > 0) { 
        if (ls_lastRequest) this.justRequested = JSON.parse(ls_lastRequest);
        this.requestInterval = setInterval(() => this.reqTimeoutOver(), remainingTimeout);
      }
    }
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const number = document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 0) {
      this.scrolledDown = true;
    } else {
      this.scrolledDown = false;
    }
  }

  /**
   * This and calling code are borrowed from
   * https://stackblitz.com/angular/lndebkoyare?file=app%2Fautocomplete-filter-example.ts
   * @param value 
   * @returns 
   */
  private _filter(value: string): Track[] {
    const filterValue = value ? value.toLowerCase(): "";
    //return this.tracks.filter(track => this.friendlyTrackString(track).toLowerCase().includes(filterValue));
    if (this.selectedCrateId > 0) { // some track category selected
      // In order to avoid changing category view TOO fast, defer directive-modifying variable change to here
      //this.filterCrate = this.selectedCrateId;
      CRATES_SELECTABLE.forEach(c => {        if (c.id===this.selectedCrateId) this.filterCrate = c;      });
      this.headingListChanged = true;
      return this.tracks.filter(track => this.friendlyTrackString(track).toLowerCase().includes(filterValue) && track.crateIds.includes(this.selectedCrateId));
    } else {                      // "All tracks"
      // In order to avoid changing category view TOO fast, defer directive-modifying variable change to here
      //this.filterCrate = this.selectedCrateId;
      CRATES_SELECTABLE.forEach(c => {        if (c.id===this.selectedCrateId) this.filterCrate = c;      });
      this.headingListChanged = true;
      return this.tracks.filter(track => this.friendlyTrackString(track).toLowerCase().includes(filterValue));
    }
  }

  /**
   * Build an easily-searchable string of all the most pertinent metadata
   * about a track.
   * @param t Track metadata
   * @returns 
   */
  private friendlyTrackString(t: Track): string {
    var friendlyText: string = "";

    if (t.title) friendlyText += t.title;

    if (t.artist) { 
      friendlyText += " - " + t.artist;
    } else if (t.albumArtist) { 
      friendlyText += " - " + t.albumArtist;
    }

    if (t.album) {
      friendlyText += "[" + t.album + "]"
    }

    if (t.year) {
      friendlyText += " (" + t.year + ")"
    }

    if (t.genre) {
      friendlyText += " - " + t.genre
    }

    return friendlyText;
  }

  /**
   * Set the active crate.
   * @param id 
   */
  selectCrate(id: number) {
    this.selectedCrateId = id;
    this.searchControl.updateValueAndValidity({onlySelf: false, emitEvent: true});
    this.toggleCrateDropDown();
  }

  /**
   * Toggle the flag that determines if the
   * crate selector drop-down is showing.
   */
  toggleCrateDropDown() {
    this.showCrateDropDown = !this.showCrateDropDown;
  }

  /**
   * Add a song to the Auto DJ queue.
   * Set a delay on future requests 
   * using a calculation based on the song's duration.
   * @param id Track id
   * @param duration Track duration
   */
  requestSong(id: number, duration: number) {
    //Verify that requests aren't currently delayed
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
      this.playlistDataService.requestTrack(id).subscribe(data => {
        resultMsg = data;
        this.showReqToast = true;
        localStorage.setItem('lastRequest', id.toString());
        //this.setReqDelay(duration, now);
        this.playlistDataService.notifyOfRequest(duration, requestTotal, false);
        this.justRequested = id;
      });    
    }
  }

  /**
   * Calculate and set a delay 
   * @param duration 
   * @param now 
   */
  setReqDelay(duration: number, reqTotal: number, now: Date) {
    //Determine time since last request; if it's been a while, cut the "request total" down
    const ls_noRequestsUntil = localStorage.getItem('noRequestsUntil');
    if (ls_noRequestsUntil) {
      let nru: number = JSON.parse(ls_noRequestsUntil);
      let timeSince: number = now.getTime() - nru;
      //console.log("LIBRARY: It's been " + timeSince + " since a request was made and delayed");
      if (timeSince > 1800000) {  // 1,800,000 milliseconds = 30 minutes
        let discountFactor = 1 + (timeSince / 1800000); // At least 1; for every half hour, add another
        reqTotal = Math.round(reqTotal/discountFactor);
      }
    }
    //Calculate delay
    let newDelay = Math.round(duration) * ((1 + Math.round(reqTotal/3))*100);
    this.requestInterval = setInterval(() => this.reqTimeoutOver(), newDelay);
    let delayTime = now.getTime() + newDelay;
    //console.log("Setting noRequestsUntil to " + delayTime);
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
    //this.showReqToast = false
    clearInterval(this.requestInterval);
    this.buttonTooltip = "";
  }

  reqToast() {
    this.showReqToast = true;
    this.toastInterval = setInterval(() => {this.showReqToast = false; clearInterval(this.toastInterval)}, 2000);
  }

  /**
   * Triggers the page to scroll to the first table heading
   * that matches the chosen letter of the alphabet (or number).
   * @param index The index of the selected character in the "alphabet" array.
   * @returns 
   */
  alphaJump(index: number): void {
    if (this.headingListChanged) {
      this.headingList = this.getTableHeadings();
      this.headingListChanged = false;
    }
    //Iterate through alphabet array backwards starting at selected character
    for (let i=index; i>=0; i--) {
      let x=this.alphabet[i].toLowerCase();
      //Iterate through headings array until finding one that starts with current character
      for (let j=0; j<this.headingList.length; j++) {
        let a = this.headingList[j].toLowerCase();
        if (a.startsWith(x) && !a.startsWith("the ")) {
          window.location.hash = "#" + this.headingList[j];
          return
        }
      }
    }
    //If none found above...
    //Iterate through alphabet array forwards starting at selected character
    for (let i=index; i<=this.alphabet.length; i++) {
      let x=this.alphabet[i].toLowerCase();
      //Iterate through headings array until finding one that starts with current character
      for (let j=0; j<this.headingList.length; j++) {
        let a = this.headingList[j].toLowerCase();
        if (a.startsWith(x) && !a.startsWith("the ")) {
          window.location.hash = "#" + this.headingList[j];
          return
        }
      }
    }
    return;
  }

  /**
   * Returns the text of all table headings as a String array.
   * Used to get an up-to-date list of all artist groupings.
   * @returns String[] Inner text of all <TH> elements
   */
  getTableHeadings(): String[] {
    let heads = document.getElementsByTagName('th');
    let headingTexts: String[] = [];
    for (let i=0; i < heads.length; i++) {
      let temp;
      if (heads.item(i))  temp = heads.item(i)?.firstChild?.textContent;
      if (temp)           headingTexts.push(temp);
    }
    return headingTexts;
  }
}
