import { Component } from '@angular/core';
import { StudentService } from '../../services/students.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  alunos = {
    nome: '',
    telefone: '',
    dataNascimento: '',
    cpf: '',
    nota: 0
  };

  constructor(private studentService: StudentService, private router: Router) {}

  salvarAluno() {
    this.studentService.cadastrarAluno(this.alunos).subscribe(
      () => {
        console.log('Aluno cadastrado com sucesso');
        this.router.navigate(['/students']);
      },
      (error: any) => {
        console.error('Erro ao cadastrar aluno', error);
      }
    );
  }
}

