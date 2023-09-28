import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Track } from '../track/track.component';
import { ActivatedRoute } from '@angular/router';
import { LibraryDataService } from '../service/data/library-data.service';
import { CRATES_HIDDEN, CRATE_ACAPELLAS, CRATE_MEMES } from '../app.constants';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { PlaylistDataService } from '../service/data/playlist-data.service';

/** Main component code */

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit, OnChanges {
  tracks!: Track[];
  filteredTracks!: Observable<Track[]>;
  @Input() filterCrate: number = 0;
  startsWith: string = "";
  searchTerm: string = "";
  searchControl: FormControl = new FormControl();
  justRequested: number = -1;
  requestInterval: any;

  constructor(
    private libraryDataService: LibraryDataService,
    private playlistDataService: PlaylistDataService,
    private route: ActivatedRoute
  ){}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(`crate: ${this.filterCrate}`);
    this.searchControl.updateValueAndValidity({onlySelf: false, emitEvent: true});
  }

  ngOnInit(): void {
    var tempName: string = "";

    this.route.params.subscribe( (data) => {
      if (data['ch']) {
        this.startsWith = data['ch'];
        this.libraryDataService.retrieveTracksByArtistStartingWith(this.startsWith).subscribe(
           data => { 
                    this.tracks = data._embedded.tracks;
                    this.filteredTracks = this.searchControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
                   }
          );
      } else {
        this.libraryDataService.retrieveAllTracks().subscribe(
          data => { 
                    this.tracks = data._embedded.tracks;
                    this.filteredTracks = this.searchControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
                    console.log("Results: " + this.tracks.length);
                  }
        );
      }
    });    
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
    if (this.filterCrate > 0) {
      console.log(`filterCrate>0 (${this.filterCrate})`);
      return this.tracks.filter(track => this.friendlyTrackString(track).toLowerCase().includes(filterValue) && track.crateIds.includes(this.filterCrate));
    } else {
      console.log(`filterCrate=${this.filterCrate}`);
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
