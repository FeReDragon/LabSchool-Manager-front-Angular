import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading: boolean;
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\d\d{4}-\d{4}$/)]],
      dataNascimento: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.isLoading = false;
    this.errorMessage = '';
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Preencha todos os campos corretamente.';
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    this.isLoading = true;
    this.authService.register(
      this.registerForm.value.username,
      this.registerForm.value.telefone,
      this.registerForm.value.dataNascimento,
      this.registerForm.value.cpf,
      this.registerForm.value.email,
      this.registerForm.value.password
    ).subscribe(
      success => {
        if (success) {
          this.isLoading = false;
          this.router.navigate(['/login']);
        } else {
          this.isLoading = false;
          this.errorMessage = 'Falha no registro';
        }
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Falha no registro';
      }
    );
  }
}

