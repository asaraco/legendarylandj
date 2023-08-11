import { Component, Input, OnInit } from '@angular/core';

export class Track {
  artist: string = "";
  title: string = "";
  album: string = "";
  duration: number = 0;
  constructor() {}
  sanitizeArtist() {
    if (!this.artist) return "------";
    else return this.artist;
  }
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
