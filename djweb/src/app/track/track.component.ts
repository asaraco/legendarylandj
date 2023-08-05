import { Component, Input, OnInit } from '@angular/core';
import { PlaylistDataService } from '../service/data/playlist-data.service';

export class Track {
  artist: string = "";
  title: string = "";
  album: string = "";
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
  @Input() track: any;
  //track!: Track;
  constructor(private playlistDataService: PlaylistDataService){}
  ngOnInit(): void {
    if (this.track==null) {
      this.track = new Track();
      this.track.artist = "------";
      this.track.title = "------";
      this.track.album = "------";
    }
  }
}
