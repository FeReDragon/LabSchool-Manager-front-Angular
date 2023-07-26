import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../services/students.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  alunoForm: FormGroup;
  isLoading: boolean;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private studentService: StudentService, private router: Router) {
    this.alunoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\d\d{4}-\d{4}$/)]],
      dataNascimento: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      nota: ['', Validators.required]
    });

    this.isLoading = false;
    this.errorMessage = '';
  }

  ngOnInit(): void {
  }

  salvarAluno() {
    if (this.alunoForm.invalid) {
      this.errorMessage = 'Preencha todos os campos corretamente.';
      return;
    }

    this.isLoading = true;
    this.studentService.cadastrarAluno(this.alunoForm.value).subscribe(
      () => {
        this.isLoading = false;
        console.log('Aluno cadastrado com sucesso');
        this.router.navigate(['/alunos']);
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Erro ao cadastrar aluno', error);
        this.errorMessage = 'Falha ao cadastrar aluno.';
      }
    );
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.alunoForm.get(field);
    return (formControl?.invalid && (formControl?.dirty || formControl?.touched)) ?? false;
  }

  isFieldValid(field: string): boolean {
    const formControl = this.alunoForm.get(field);
    return (formControl?.valid && (formControl?.dirty || formControl?.touched)) ?? false;
  }
}
