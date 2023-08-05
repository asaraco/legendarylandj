import { Component, Input } from '@angular/core';
import { Track } from '../track/track.component';
import { PlaylistDataService } from '../service/data/playlist-data.service';

export class PlaylistTrack {
  position: number = 0;
  track: Track = new Track();
  constructor(public id: number){}
}

@Component({
  selector: 'app-playlist-track',
  templateUrl: './playlist-track.component.html',
  styleUrls: ['./playlist-track.component.scss']
})
export class PlaylistTrackComponent {
  id: number = 0;
  @Input() playlistTrack: any;
  //playlistTrack!: PlaylistTrack;
  constructor(private playlistDataService: PlaylistDataService){}
}
