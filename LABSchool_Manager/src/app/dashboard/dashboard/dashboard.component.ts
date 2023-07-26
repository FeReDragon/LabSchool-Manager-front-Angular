import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  totalAlunos: number = 0;
  totalPedagogos: number = 0;
  totalAtendimentos: number = 0;
  totalAtendimentosAbertos: number = 0;
  percentualAtendimentosConcluidos: number = 0;
  atendimentosPorDia: { data: string, quantidade: number }[] = [];

  @ViewChild('barChart') barChart: ElementRef | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
  }

  ngAfterViewInit(): void {
    this.createBarChart();
  }

  createBarChart(): void {
    if (this.atendimentosPorDia && this.atendimentosPorDia.length > 0 && this.barChart) {
      const data = this.atendimentosPorDia.map(a => a.data);
      const quantidade = this.atendimentosPorDia.map(a => a.quantidade);

      new Chart(this.barChart.nativeElement, {
        type: 'bar',
        data: {
          labels: data,
          datasets: [{
            label: 'Atendimentos por Dia',
            data: quantidade,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
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
        const dataFormatada = this.formatarData(data);
        if (!atendimentosPorDia[dataFormatada]) {
          atendimentosPorDia[dataFormatada] = 0;
        }
        atendimentosPorDia[dataFormatada]++;
      }
      this.atendimentosPorDia = Object.entries(atendimentosPorDia).map(([data, quantidade]) => ({ data, quantidade: Number(quantidade) }));
      this.createBarChart();
    });
  }

  formatarData(data: string): string {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }
}


