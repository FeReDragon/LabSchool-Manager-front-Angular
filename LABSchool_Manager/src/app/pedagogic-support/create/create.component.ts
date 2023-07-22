import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedagogicSupportService } from '../../services/pedagogic-support.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  acompanhamentoForm: FormGroup;
  alunos: any[] = [];
  pedagogos: any[] = [];

  constructor(private formBuilder: FormBuilder, private pedagogicSupportService: PedagogicSupportService, private router: Router) {
    this.acompanhamentoForm = this.formBuilder.group({
      aluno: [null, Validators.required],
      pedagogo: [null, Validators.required],
      dataAcompanhamento: [this.getCurrentDate(), Validators.required],
      tituloAcompanhamento: ['', Validators.required],
      descricaoAcompanhamento: ['', Validators.required],
      finalizado: [false]
    });
  }

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
    if (this.acompanhamentoForm.invalid) {
      return;
    }

    const acompanhamento = {
      alunoId: this.acompanhamentoForm.get('aluno')?.value,
      usuarioId: this.acompanhamentoForm.get('pedagogo')?.value,
      data: this.acompanhamentoForm.get('dataAcompanhamento')?.value,
      titulo: this.acompanhamentoForm.get('tituloAcompanhamento')?.value,
      descricao: this.acompanhamentoForm.get('descricaoAcompanhamento')?.value,
      finalizado: this.acompanhamentoForm.get('finalizado')?.value
    };

    this.pedagogicSupportService.salvarAcompanhamento(acompanhamento).subscribe(
      () => {
        console.log('Acompanhamento salvo com sucesso');
        this.router.navigate(['/pedagogic-support']);
      },
      (error: any) => {
        console.error('Erro ao salvar o acompanhamento', error);
        // You can handle the error case here, if needed.
        // For example, you can show an error message to the user.
      }
    );
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.acompanhamentoForm.get(field);
    return formControl ? formControl.invalid && (formControl.dirty || formControl.touched) : false;
  }

  // Implementação da função para verificar se um campo está válido
  isFieldValid(field: string): boolean {
    const formControl = this.acompanhamentoForm.get(field);
    return formControl ? formControl.valid && (formControl.dirty || formControl.touched) : false;
  }
}



