import { Component, Input } from '@angular/core';
import { Track } from '../track/track.component';
import { PlaylistDataService } from '../service/data/playlist-data.service';
import { CRATES_ALBUMVIEW } from '../app.constants';

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
  CRATES_ALBUMVIEW: number[] = CRATES_ALBUMVIEW;
  //playlistTrack!: PlaylistTrack;
  constructor(private playlistDataService: PlaylistDataService){}
  ngOnInit(): void {
    if (this.playlistTrack.track==null) {
      this.playlistTrack.track = new Track();
      this.playlistTrack.track.artist = "------";
      this.playlistTrack.track.title = "------";
      this.playlistTrack.track.album = "------";
    }
  }

  /**
   * Determine if a Track is associated with a Crate
   * where the "Album" info is considered more important than the "Artist" info.
   * @param t 
   * @returns 
   */
  isAlbumView(t: Track): boolean {
    var albumView = false;
    CRATES_ALBUMVIEW.forEach(x => {
      if(t.crateIds.includes(x)) {
        albumView = true;
      }
    });
    return albumView;
  }
}
