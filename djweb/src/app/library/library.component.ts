import { Component, OnInit } from '@angular/core';
import { Track } from '../track/track.component';
import { ActivatedRoute } from '@angular/router';
import { LibraryDataService } from '../service/data/library-data.service';
import { CRATES_HIDDEN } from '../app.constants';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
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
  startsWith: string = "";
  searchTerm: string = "";
  searchControl: FormControl = new FormControl();

  constructor(
    private libraryDataService: LibraryDataService,
    private playlistDataService: PlaylistDataService,
    private route: ActivatedRoute
  ){}

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
    const filterValue = value.toLowerCase();
    //return this.tracks.filter(track => track.friendlyString().toLowerCase().includes(filterValue));
    return this.tracks.filter(track => this.friendlyTrackString(track).toLowerCase().includes(filterValue));
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

  requestSong(id: number) {
    console.log("Request song #" + id);
    this.playlistDataService.requestTrack(id);
  }
}
