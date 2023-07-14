import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);  // supondo que sua rota de login seja '/login'
  }
}
