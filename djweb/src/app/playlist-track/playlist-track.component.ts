import { Component } from '@angular/core';
import { Track } from '../track/track.component';

export class PlaylistTrack {
  position: number = 0;
  track!: Track;
  constructor(public id: number){}
}

@Component({
  selector: 'app-playlist-track',
  templateUrl: './playlist-track.component.html',
  styleUrls: ['./playlist-track.component.scss']
})
export class PlaylistTrackComponent {
  id: number = 0;
  playlistTrack!: PlaylistTrack;
  constructor(){}
}
