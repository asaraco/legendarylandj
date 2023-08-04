import { Component } from '@angular/core';

export class Track {
  artist: string = "";
  title: string = "";
  album: string = "";
  constructor(
    public id: number
  ) {}
}

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent {
  id: number = 0;
  track!: Track;
  constructor(){}
}
