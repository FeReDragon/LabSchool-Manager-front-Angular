import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any>(`http://localhost:3000/users?username=${username}&password=${password}`)
      .pipe(map(user => {
        if (user && user.length) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return true;
        }
        return false;
      }));
  }

  register(username: string, phone: string, birthdate: Date, cpf: string, email: string, password: string): Observable<boolean> {
    const user = { username, phone, birthdate, cpf, email, password };
    return this.http.post<any>(`http://localhost:3000/users`, user)
      .pipe(map(response => {
        if (response) {
          return true;
        }
        return false;
      }));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
  
  
}
