import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API_URL, CRATES_HIDDEN } from 'src/app/app.constants';
import { Track } from 'src/app/track/track.component';

@Injectable({
  providedIn: 'root'
})
export class LibraryDataService {
  private currentUpload = new Subject<boolean>();

  notifyOfUpload() {
    this.currentUpload.next(true);
  }

  watchForUpload(): Observable<boolean> {
    return this.currentUpload.asObservable();
  }

  constructor(
    private http: HttpClient
  ) { }

  /* AMS - I don't like using "any" as the type instead of "Track[]", but due to using JPA/HAL
  the JSON response has an "_embedded" wrapper for the tracks array */

  retrieveAllTracks(): Observable<any> {
    return this.http.get<Track[]>(`${API_URL}/tracks/search/findByCratesIdNotInOrderBySortArtistAscAlbumAsc?crateids=${CRATES_HIDDEN}`)
  }
  
  retrieveNewTracks(): Observable<any> {
    return this.http.get<Track[]>(`${API_URL}/tracks/search/findAllByCratesIsNull`)
  }
}
