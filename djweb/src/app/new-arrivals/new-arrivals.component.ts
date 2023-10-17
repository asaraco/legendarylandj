import { Component, OnInit } from '@angular/core';
import { Track } from '../track/track.component';
import { LibraryDataService } from '../service/data/library-data.service';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss']
})
export class NewArrivalsComponent implements OnInit {
  tracks!: Track[];
  
  constructor(
    private libraryDataService: LibraryDataService
  ){}

  ngOnInit(): void {
    //Get tracks
    this.libraryDataService.retrieveNewTracks().subscribe(
      data => {
        this.tracks = data._embedded.tracks;
      }
    )
  }
}
