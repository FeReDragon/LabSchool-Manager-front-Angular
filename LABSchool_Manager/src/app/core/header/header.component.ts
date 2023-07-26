import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: string | null = null;
  isLoading: boolean = false;
  previousUrl: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => this.currentUser = x);

    // Subscribe ao evento de navegação para ativar/desativar o loading
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (event instanceof NavigationEnd) {
        if (this.previousUrl === this.router.url) {
          this.isLoading = false;
        }
        this.previousUrl = this.router.url;
      }
    });
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Método para lidar com a navegação manual
  navigateTo(route: string) {
    // Verifique se a rota é a mesma que a atual antes de ativar o spinner
    if (this.router.url !== route) {
      this.isLoading = true;
    }

    // Usamos setTimeout para garantir que o spinner seja exibido
    // mesmo em navegações rápidas dentro da mesma página
    setTimeout(() => {
      this.router.navigate([route]);
    }, 0);
  }
}



