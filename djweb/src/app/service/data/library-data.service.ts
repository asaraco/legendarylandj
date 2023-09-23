import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, CRATES_HIDDEN } from 'src/app/app.constants';
import { Track } from 'src/app/track/track.component';

@Injectable({
  providedIn: 'root'
})
export class LibraryDataService {

  constructor(
    private http: HttpClient
  ) { }

  /* AMS - I don't like using "any" as the type instead of "Track[]", but due to using JPA/HAL
  the JSON response has an "_embedded" wrapper for the tracks array */
  retrieveTracksByArtistStartingWith(ch: string): Observable<any> {
    return this.http.get<Track[]>(`${API_URL}/tracks/search/findByArtistStartingWith?ch=${ch}`)
  }
  retrieveAllTracks(): Observable<any> {
    //return this.http.get<Track[]>(`${API_URL}/tracks/search/findAllByOrderByArtistAsc`)
    return this.http.get<Track[]>(`${API_URL}/tracks/search/findByCratesIdNotInOrderBySortArtistAscAlbumAsc?crateids=${CRATES_HIDDEN}`)
    //return this.http.get<Track[]>(`${API_URL}/tracks/search/findByCratesIdNotInOrderByAlbumArtistAscArtistAscAlbumAsc?crateids=${CRATES_HIDDEN}`)
  }
}
