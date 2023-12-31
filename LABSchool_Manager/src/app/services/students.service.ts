import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/alunos`);
  }

  getStudent(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/alunos/${id}`);
  }

  cadastrarAluno(aluno: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/alunos`, aluno);
  }
}
