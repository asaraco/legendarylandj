import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/app.constants';
import { Crate } from 'src/app/crate/crate.component';

@Injectable({
  providedIn: 'root'
})
export class CrateDataService {

  constructor(
    private http: HttpClient
  ) { }

  retrieveCrateTracks(id: number): Observable<Crate> {
    return this.http.get<Crate>(`${API_URL}/crates/${id}?projection=crateSimple`)
  }
}
