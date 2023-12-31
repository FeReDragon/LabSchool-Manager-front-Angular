import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
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
    return user ? JSON.parse(user).username : null; // Usando username para o currentUser
  }

  initCurrentUser() {
    const user = this.getLocalUser();
    this.currentUserSubject.next(user);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .get<any>(`http://localhost:3000/users?email=${email}&password=${password}`)
      .pipe(
        map((users) => {
          const user = users?.[0];
          if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user.username); // Atualizando o currentUser com o username do usuário
            return true;
          }
          return false;
        })
      );
  }

  register(username: string, telefone: string, dataNascimento: Date, cpf: string, email: string, password: string): Observable<boolean> {
    const user = { username, telefone, dataNascimento, cpf, email, password };
    return this.http.post<any>('http://localhost:3000/users', user).pipe(
      map((response) => {
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response.username); // Continua atualizando o currentUser com o username
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


