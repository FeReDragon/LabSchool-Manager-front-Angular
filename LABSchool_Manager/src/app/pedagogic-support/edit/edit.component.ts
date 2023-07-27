import { Component, OnInit } from '@angular/core';
import { PedagogicSupportService } from '../../services/pedagogic-support.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  acompanhamento: any = {};
  alunos: any[] = [];
  pedagogos: any[] = [];
  formInvalid: boolean = false;

  constructor(
    private pedagogicSupportService: PedagogicSupportService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const acompanhamentoId = +this.route.snapshot.params['id'];
    this.getAcompanhamento(acompanhamentoId);
    this.getAlunos();
    this.getPedagogos();
  }

  getAcompanhamento(id: number): void {
    this.pedagogicSupportService.getAcompanhamentos().subscribe(
      (acompanhamentos: any[]) => {
        const acompanhamento = acompanhamentos.find(item => item.id === id);
        if (acompanhamento) {
          this.acompanhamento = acompanhamento;
        } else {
          console.error('Acompanhamento não encontrado');
        }
      },
      (error: any) => {
        console.error('Erro ao obter os acompanhamentos', error);
      }
    );
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

  salvarAcompanhamento(): void {
    if (!this.acompanhamento.titulo || !this.acompanhamento.descricao) {
      this.formInvalid = true;
      return;
    }
  
    this.pedagogicSupportService.atualizarAcompanhamento(this.acompanhamento).subscribe(
      () => {
        console.log('Acompanhamento atualizado com sucesso');
        this.router.navigate(['/acompanhamentos']);
      },
      (error: any) => {
        console.error('Erro ao atualizar o acompanhamento', error);
      }
    );
  }  
}







