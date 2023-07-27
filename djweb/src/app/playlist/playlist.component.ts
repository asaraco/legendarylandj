import { Component, OnInit } from '@angular/core';
import { PlaylistDataService } from '../service/data/playlist-data.service';
import { Track } from '../track/track.component';
import { ActivatedRoute, Router } from '@angular/router';


export class Playlist {
  name!: string;
  tracks!: Track[];
  constructor(
    public id: number,
  ) {}
}

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  id!: number;
  playlist!: Playlist;

  constructor(
    private playlistDataService: PlaylistDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe( (data) => {
      this.id = data['id'];
      this.playlist = new Playlist(this.id);
      this.playlistDataService.retrievePlaylist(this.id).subscribe(data => this.playlist = data);
    })
  }
}
