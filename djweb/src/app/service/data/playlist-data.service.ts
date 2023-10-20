import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Playlist } from 'src/app/playlist/playlist.component';
import { Track } from 'src/app/track/track.component';

@Injectable({
  providedIn: 'root'
})
export class PlaylistDataService {
  private requestDuration = new Subject<number>();

  notifyOfRequest(duration: number) {
    this.requestDuration.next(duration);
  }

  watchForNotification(): Observable<number> {
    return this.requestDuration.asObservable();
  }

  constructor( 
    private http: HttpClient 
    ) { }

  /* AMS - I don't like using "any" as the type instead of "Playlist", but due to using JPA/HAL
  the JSON response is not just a Playlist, it also has an "_embedded" wrapper
  for the playlistTracks array, and other generated stuff. So a bit more manual handling is needed. */
  retrievePlaylist(id: number): Observable<any> {
    return this.http.get<Playlist>(`${API_URL}/playlists/${id}`);
  }

  retrieveMostRecentPlaylist(): Observable<any> {
    return this.http.get<Playlist>(`${API_URL}/playlists/search/findTopByOrderByIdDesc`);
  }

  retrieveHighestPlaylistTrack(id: number): Observable<Track> {
    return this.http.get<Track>(`${API_URL}playlistTracks/search/findFirstByPlaylistIdOrderByPositionDesc?playlistId=${id}`);
  }

  requestTrack(id: number): Observable<string> {
    var responseMsg: string;
    return this.http.post<string>(`${API_URL}/requestSong?id=${id}`, null);
  }

  requestTrackCrate(songid: number, crateid: number): Observable<string> {
    var responseMsg: string;
    return this.http.post<string>(`${API_URL}/requestSongCrate?songid=${songid}&crateid=${crateid}`, null);
  }
}
