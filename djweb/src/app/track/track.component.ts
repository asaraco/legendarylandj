import { Component, OnInit } from '@angular/core';

export class Track {
  id!: number;
  artist: string = "";
  title: string = "";
  album: string = "";
  albumArtist: string = "";
  sortArtist: string = "";
  duration: number = 0;
  year: number = 0;
  genre: string = "";
  crateIds!: number[];
  constructor() {}
}

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  id: number = 0;
  track!: Track;
  constructor(){}
  ngOnInit(): void {
  }
}
