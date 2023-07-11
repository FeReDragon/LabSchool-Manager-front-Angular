import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.isLoading = true;
    this.authService.login(this.email, this.password).subscribe(
      () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Invalid email or password';
      }
    );
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
