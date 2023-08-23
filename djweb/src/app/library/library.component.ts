import { Component, OnInit } from '@angular/core';
import { Track } from '../track/track.component';
import { ActivatedRoute } from '@angular/router';
import { LibraryDataService } from '../service/data/library-data.service';

/** Classes used to organize retrieved data */

export class TrackGroup {
  groupName!: string;
  tracks!: Track[];

  constructor(name: string) {
    this.groupName = name;
  }
}

/** Main component code */

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  tracks!: Track[];
  startsWith: string = "";
  trackGroups!: TrackGroup[];

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
    })
  }
}
