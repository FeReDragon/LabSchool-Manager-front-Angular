import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedagogicSupportService {
  private API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAlunos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/alunos`);
  }

  getPedagogos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/users`);
  }

  getStudentName(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/alunos/${id}`).pipe(
      map((response: any) => {
        console.log('Student Response:', response);
        return response?.nome;
      })
    );
  }
  
  getUserName(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/users/${id}`).pipe(
      map((response: any) => {
        console.log('User Response:', response);
        return response?.username;
      })
    );
  }
  

  getAcompanhamentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/acompanhamentos`).pipe(
      concatMap((acompanhamentos: any[]) => {
        const studentRequests = acompanhamentos.map((acompanhamento: any) =>
          this.getStudentName(acompanhamento.alunoId)
        );

        const userRequests = acompanhamentos.map((acompanhamento: any) =>
          this.getUserName(acompanhamento.usuarioId)
        );

        return forkJoin([...studentRequests, ...userRequests]).pipe(
          map((results: any[]) => {
            const updatedAcompanhamentos = acompanhamentos.map((acompanhamento, index) => ({
              ...acompanhamento,
              alunoNome: results[index],
              usuarioNome: results[index + acompanhamentos.length]
            }));

            return updatedAcompanhamentos;
          })
        );
      })
    );
  }

  salvarAcompanhamento(acompanhamento: any): Observable<any> {
    return this.http.post(`${this.API_URL}/acompanhamentos`, acompanhamento);
  }

  atualizarAcompanhamento(acompanhamento: any): Observable<any> {
    const id = acompanhamento.id;
    return this.http.put(`${this.API_URL}/acompanhamentos/${id}`, acompanhamento);
  }
}

