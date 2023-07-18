import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string;
  phone: string;
  birthdate: Date;
  cpf: string;
  email: string;
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { 
    this.username = '';
    this.phone = '';
    this.birthdate = new Date();
    this.cpf = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.isLoading = false;
    this.errorMessage = '';
  }

  register(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.authService.register(this.username, this.phone, this.birthdate, this.cpf, this.email, this.password).subscribe(
      success => {
        if (success) {
          this.isLoading = false;
          this.router.navigate(['/login']);
        } else {
          this.isLoading = false;
          this.errorMessage = 'Registration failed';
        }
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Registration failed';
      }
    );
  }
}


