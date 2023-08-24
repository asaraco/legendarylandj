import { Component, OnInit } from '@angular/core';
import { Track } from '../track/track.component';
import { ActivatedRoute } from '@angular/router';
import { LibraryDataService } from '../service/data/library-data.service';
import { CRATES_HIDDEN } from '../app.constants';

/** Main component code */

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  tracks!: Track[];
  filteredTracks!: Track[];
  startsWith: string = "";

  constructor(
    private libraryDataService: LibraryDataService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    var tempName: string = "";

    this.route.params.subscribe( (data) => {
      this.startsWith = data['ch'];
      this.libraryDataService.retrieveTracksByArtistStartingWith(this.startsWith).subscribe(data => this.tracks = data._embedded.tracks);
      /*
      this.tracks.forEach(function(track) {
        if (track.artist != tempName) {
          this.trackGroups.add(new TrackGroup(tempName));
        }
      })
      */
     if(this.tracks) {
        this.tracks.forEach(t => {
          CRATES_HIDDEN.forEach(x => {
            if(!t.crateIds.includes(x)) {
              this.filteredTracks.push(t);
            }
          })
        });
     }
    });
    
  }
}
