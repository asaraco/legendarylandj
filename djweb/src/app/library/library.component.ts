import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Track } from '../track/track.component';
import { ActivatedRoute } from '@angular/router';
import { LibraryDataService } from '../service/data/library-data.service';
import { UI_SEARCH_TEXT, UI_CATS_TEXT, CrateMeta, CRATES_SELECTABLE, CRATES_SIMPLEVIEW, CRATE_ALL } from '../app.constants';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, map, startWith } from 'rxjs';
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
  /* imported constants */
  UI_SEARCH_TEXT: string = UI_SEARCH_TEXT;
  UI_CATS_TEXT: string = UI_CATS_TEXT;
  CRATES_SELECTABLE: CrateMeta[] = CRATES_SELECTABLE;
  CRATES_SIMPLEVIEW: number[] = CRATES_SIMPLEVIEW;

  constructor(
    private libraryDataService: LibraryDataService,
    private playlistDataService: PlaylistDataService,
    private route: ActivatedRoute
  ){}
  /*
  ngOnChanges(changes: SimpleChanges): void {
    console.log(`crate: ${this.filterCrate}`);
    this.searchControl.updateValueAndValidity({onlySelf: false, emitEvent: true});
  }
  */
  ngOnInit(): void {
    /*
    this.route.params.subscribe( (data) => {
      if (data['ch']) {
        this.startsWith = data['ch'];
        this.libraryDataService.retrieveTracksByArtistStartingWith(this.startsWith).subscribe(
           data => { 
                    this.tracks = data._embedded.tracks;
                    this.filteredTracks = this.searchControl.valueChanges.pipe(debounceTime(500), startWith(''), map(value => this._filter(value)));
                   }
          );
      } else {
        this.libraryDataService.retrieveAllTracks().subscribe(
          data => { 
                    this.tracks = data._embedded.tracks;
                    this.filteredTracks = this.searchControl.valueChanges.pipe(debounceTime(500), startWith(''), map(value => this._filter(value)));
                    console.log("Results: " + this.tracks.length);
                  }
        );
      }
    });*/

    this.libraryDataService.retrieveAllTracks().subscribe(
      data => { 
                this.tracks = data._embedded.tracks;
                this.filteredTracks = this.searchControl.valueChanges.pipe(debounceTime(500), startWith(''), map(value => this._filter(value)));
                console.log("Results: " + this.tracks.length);
              }
    );
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
      return this.tracks.filter(track => this.friendlyTrackString(track).toLowerCase().includes(filterValue) && track.crateIds.includes(this.selectedCrateId));
    } else {                      // "All tracks"
      // In order to avoid changing category view TOO fast, defer directive-modifying variable change to here
      //this.filterCrate = this.selectedCrateId;
      CRATES_SELECTABLE.forEach(c => {        if (c.id===this.selectedCrateId) this.filterCrate = c;      });
      return this.tracks.filter(track => this.friendlyTrackString(track).toLowerCase().includes(filterValue));
    }
  }

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

  /*
  matchCrates(trackCrates: number[]): boolean {
    let matches = trackCrates.filter(cid => this.filterByCrates.includes(cid));
    return !(matches.length==0);
  }
  */

  selectCrate(id: number) {
    this.selectedCrateId = id;
    this.searchControl.updateValueAndValidity({onlySelf: false, emitEvent: true});
    this.toggleCrateDropDown();
  }

  toggleCrateDropDown() {
    this.showCrateDropDown = !this.showCrateDropDown;
  }

  requestSong(id: number, duration: number) {
    //console.log("Request song #" + id);
    var resultMsg: string;
    this.playlistDataService.requestTrack(id).subscribe(data => {
      resultMsg = data;
      //console.log(resultMsg);
      this.justRequested = id;
      this.requestInterval = setInterval(() => this.reqTimeout(), duration * 100);
    });
  }

  reqTimeout() {
    this.justRequested = -1;
    clearInterval(this.requestInterval);
  }  
}
