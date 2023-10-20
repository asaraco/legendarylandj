import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Track } from '../track/track.component';
import { ActivatedRoute } from '@angular/router';
import { LibraryDataService } from '../service/data/library-data.service';
import { UI_SEARCH_TEXT, UI_CATS_TEXT, CrateMeta, CRATES_SELECTABLE, CRATES_SIMPLEVIEW, CRATE_ALL } from '../app.constants';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, debounceTime, map, startWith } from 'rxjs';
import { PlaylistDataService } from '../service/data/playlist-data.service';

/** Main component code */

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  tracks!: Track[];
  filteredTracks!: Observable<Track[]>;
  artistList: String[] = [];
  artistListChanged: boolean = true;
  //@Input() filterCrate: number = 0;
  selectedCrateId: number = 0;
  filterCrate: CrateMeta = CRATE_ALL;
  startsWith: string = "";
  searchTerm: string = "";
  searchControl: FormControl = new FormControl();
  justRequested: number = -1;
  requestInterval: any;
  alphabet: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  showCrateDropDown: boolean = false;
  requestSubscription: Subscription;
  /* imported constants */
  UI_SEARCH_TEXT: string = UI_SEARCH_TEXT;
  UI_CATS_TEXT: string = UI_CATS_TEXT;
  CRATES_SELECTABLE: CrateMeta[] = CRATES_SELECTABLE;
  CRATES_SIMPLEVIEW: number[] = CRATES_SIMPLEVIEW;

  constructor(
    private libraryDataService: LibraryDataService,
    private playlistDataService: PlaylistDataService,
    private route: ActivatedRoute
  ){
    this.requestSubscription = this.playlistDataService.watchForNotification().subscribe((data)=>{
      this.justRequested = 999999999999999;
      this.setReqDelay(data, new Date());
      this.libraryDataService.retrieveAllTracks().subscribe(
        data => { 
                  this.tracks = data._embedded.tracks;
                  this.filteredTracks = this.searchControl.valueChanges.pipe(debounceTime(500), startWith(''), map(value => this._filter(value)));
                }
      );
    })
  }
  /*
  ngOnChanges(changes: SimpleChanges): void {
    console.log(`crate: ${this.filterCrate}`);
    this.searchControl.updateValueAndValidity({onlySelf: false, emitEvent: true});
  }
  */
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
      this.artistListChanged = true;
      return this.tracks.filter(track => this.friendlyTrackString(track).toLowerCase().includes(filterValue) && track.crateIds.includes(this.selectedCrateId));
    } else {                      // "All tracks"
      // In order to avoid changing category view TOO fast, defer directive-modifying variable change to here
      //this.filterCrate = this.selectedCrateId;
      CRATES_SELECTABLE.forEach(c => {        if (c.id===this.selectedCrateId) this.filterCrate = c;      });
      this.artistListChanged = true;
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
    let userId = localStorage.getItem('userNumber');
    const now = new Date();
    const nru = localStorage.getItem('noRequestsUntil');
    if ((nru) && (now.getTime() < JSON.parse(nru))) { 
      console.log("Sorry, no requests until " + nru);
    } else {
      //console.log("Request song #" + id);
      var resultMsg: string;
      this.playlistDataService.requestTrack(id).subscribe(data => {
        resultMsg = data;
        this.justRequested = id;
        this.setReqDelay(duration, now);
        localStorage.setItem('lastRequest', id.toString());
        this.playlistDataService.notifyOfRequest(duration);
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
    console.log(now.getTime());
    console.log(duration * 1000);
    console.log(delayTime);
    localStorage.setItem('noRequestsUntil', JSON.stringify(delayTime));
  }

  /**
   * Reset request timeout variables when time's up
   */
  reqTimeoutOver() {
    this.justRequested = -1;
    clearInterval(this.requestInterval);
  }

  /**
   * Triggers the page to scroll to the first table heading
   * that matches the chosen letter of the alphabet (or number).
   * @param index The index of the selected character in the "alphabet" array.
   * @returns 
   */
  alphaJump(index: number): void {
    if (this.artistListChanged) {
      this.artistList = this.getTableHeadings();
      this.artistListChanged = false;
    }
    
    let matchFound: boolean = false;
    let destination: string = "";

    for (let i=index; i>=0; i--) {
      let x=this.alphabet[i].toLowerCase();
      for (let j=0; j<this.artistList.length; j++) {
        let a = this.artistList[j].toLowerCase();
        if (a.startsWith(x) && !a.startsWith("the ")) {
          window.location.hash = "#" + this.artistList[j];
          return
          //matchFound = true;
          //destination = "#" + this.artistList[j];
        }
      }
    }
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
