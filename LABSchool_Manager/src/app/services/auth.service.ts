import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // A lista de usuários. Na realidade, você faria uma chamada HTTP ao seu backend aqui.
  private users = [
    { email: 'test@example.com', password: 'password' }
  ];

  constructor() { }

  login(email: string, password: string): Observable<boolean> {
    return of(this.users).pipe(
      delay(1000), // Simula uma chamada HTTP
      map(users => users.some(user => email === user.email && password === user.password))
    );
  }

  register(fullname: string, phone: string, birthdate: Date, cpf: string, email: string, password: string): Observable<boolean> {
    return of(this.users).pipe(
      delay(1000), // Simula uma chamada HTTP
      map(users => {
        if (users.some(user => email === user.email)) {
          // Se o e-mail já estiver registrado, retorna false
          return false;
        }
        // Se não, registra o novo usuário e retorna true
        this.users.push({ email, password });
        return true;
      })
    );
  }
}


