import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<string | null>;
  public currentUser: Observable<string | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string | null>(this.getLocalUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getLocalUser(): string | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user).username : null;
  }

  initCurrentUser() {
    const user = this.getLocalUser();
    this.currentUserSubject.next(user);
  }

  login(emailOrUsername: string, password: string): Observable<boolean> {
    const emailLogin$ = this.http
      .get<any>(`http://localhost:3000/users?email=${emailOrUsername}&password=${password}`)
      .pipe(
        map((users) => users?.[0])
      );

    const usernameLogin$ = this.http
      .get<any>(`http://localhost:3000/users?username=${emailOrUsername}&password=${password}`)
      .pipe(
        map((users) => users?.[0])
      );

    return merge(emailLogin$, usernameLogin$).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user.username);
          return true;
        }
        return false;
      })
    );
  }

  register(username: string, phone: string, birthdate: Date, cpf: string, email: string, password: string): Observable<boolean> {
    const user = { username, phone, birthdate, cpf, email, password };
    return this.http.post<any>('http://localhost:3000/users', user).pipe(
      map((response) => {
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response.username);
          return true;
        }
        return false;
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUserValue(): string | null {
    return this.currentUserSubject.value;
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/users/${id}`);
  }
}


