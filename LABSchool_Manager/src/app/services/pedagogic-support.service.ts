import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedagogicSupportService {
  private API_URL = 'http://localhost:3000/acompanhamentos';

  constructor(private http: HttpClient) {}

  getAcompanhamentos(): Observable<any> {
    return this.http.get(this.API_URL);
  }
}
