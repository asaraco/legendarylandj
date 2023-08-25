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
  startsWith: string = "";

  constructor(
    private libraryDataService: LibraryDataService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    var tempName: string = "";

    this.route.params.subscribe( (data) => {
      if (data['ch']) {
        this.startsWith = data['ch'];
        this.libraryDataService.retrieveTracksByArtistStartingWith(this.startsWith).subscribe(data => this.tracks = data._embedded.tracks);
      } else {
        this.libraryDataService.retrieveAllTracks().subscribe(data => this.tracks = data._embedded.tracks);
      }
      
    });
    
  }
}
