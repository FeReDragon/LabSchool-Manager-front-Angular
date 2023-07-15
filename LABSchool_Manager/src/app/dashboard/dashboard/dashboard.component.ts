import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalAlunos: number = 0;
  totalPedagogos: number = 0;
  totalAtendimentos: number = 0;
  totalAtendimentosAbertos: number = 0;
  percentualAtendimentosConcluidos: number = 0;
  atendimentosPorDia: { data: string, quantidade: number }[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.http.get<any[]>('http://localhost:3000/alunos').subscribe((alunos: any[]) => {
      this.totalAlunos = alunos.length;
    });

    this.http.get<any[]>('http://localhost:3000/users').subscribe((pedagogos: any[]) => {
      this.totalPedagogos = pedagogos.length;
    });

    this.http.get<any[]>('http://localhost:3000/acompanhamentos').subscribe((acompanhamentos: any[]) => {
      this.totalAtendimentos = acompanhamentos.length;
      this.totalAtendimentosAbertos = acompanhamentos.filter(a => !a.finalizado).length;

      const atendimentosConcluidos = acompanhamentos.filter(a => a.finalizado).length;
      this.percentualAtendimentosConcluidos = parseFloat((atendimentosConcluidos / this.totalAtendimentos * 100).toFixed(2));

      const atendimentosPorDia: any = {};
      for (const atendimento of acompanhamentos) {
        const data = atendimento.data.split('T')[0];
        if (!atendimentosPorDia[data]) {
          atendimentosPorDia[data] = 0;
        }
        atendimentosPorDia[data]++;
      }
      this.atendimentosPorDia = Object.entries(atendimentosPorDia).map(([data, quantidade]) => ({ data, quantidade: Number(quantidade) }));
    });
  }
}
