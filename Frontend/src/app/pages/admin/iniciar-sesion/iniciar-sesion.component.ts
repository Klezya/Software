import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion-admin',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule]
})
export class IniciarSesionAdminComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    // Validación básica de credenciales
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/dashboard']); // Redirige al Dashboard
    } else {
      alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  }
}
