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
  username: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.isLoading = true;
    const emailOrUsername = this.email.includes('@') ? this.email : this.username;
    this.authService.login(emailOrUsername, this.password).subscribe(
      success => {
        if (success) {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        } else {
          this.isLoading = false;
          this.errorMessage = 'E-mail or username and password combination is invalid';
        }
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'E-mail or username and password combination is invalid';
      }
    );
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
