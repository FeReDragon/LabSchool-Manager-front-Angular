import { Component, OnInit } from '@angular/core';
import { PedagogicSupportService } from '../../services/pedagogic-support.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  alunos: any[] = [];
  pedagogos: any[] = [];

  selectedAluno: number = 0;
  selectedPedagogo: number = 0;
  dataAcompanhamento: string = '';
  tituloAcompanhamento: string = '';
  descricaoAcompanhamento: string = '';
  finalizado: boolean = false;

  constructor(private pedagogicSupportService: PedagogicSupportService) { }

  ngOnInit(): void {
    this.getAlunos();
    this.getPedagogos();
  }

  getAlunos(): void {
    this.pedagogicSupportService.getAlunos().subscribe(
      (alunos: any[]) => {
        this.alunos = alunos;
      },
      (error: any) => {
        console.error('Erro ao obter a lista de alunos', error);
      }
    );
  }

  getPedagogos(): void {
    this.pedagogicSupportService.getPedagogos().subscribe(
      (pedagogos: any[]) => {
        this.pedagogos = pedagogos;
      },
      (error: any) => {
        console.error('Erro ao obter a lista de pedagogos', error);
      }
    );
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  }

  salvarAcompanhamento(): void {
    const acompanhamento = {
      alunoId: this.selectedAluno,
      usuarioId: this.selectedPedagogo,
      data: this.dataAcompanhamento,
      titulo: this.tituloAcompanhamento,
      descricao: this.descricaoAcompanhamento,
      finalizado: this.finalizado
    };

    this.pedagogicSupportService.salvarAcompanhamento(acompanhamento).subscribe(
      () => {
        console.log('Acompanhamento salvo com sucesso');
        // Realizar qualquer ação necessária após o salvamento, como redirecionar para outra página
      },
      (error: any) => {
        console.error('Erro ao salvar o acompanhamento', error);
      }
    );
  }
}
