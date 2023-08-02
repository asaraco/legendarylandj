import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from 'src/app/playlist/playlist.component';
import { Track } from 'src/app/track/track.component';

@Injectable({
  providedIn: 'root'
})
export class PlaylistDataService {

  constructor( 
    private http: HttpClient 
    ) { }

  retrievePlaylist(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${API_URL}/playlists/${id}?projection=playlistSimple`);
  }
}
