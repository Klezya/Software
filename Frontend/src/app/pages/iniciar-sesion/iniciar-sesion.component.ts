import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
  standalone: true,
  imports: [NavbarComponent, CommonModule, NgClass, FormsModule]
})
export class IniciarSesionComponent {
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
