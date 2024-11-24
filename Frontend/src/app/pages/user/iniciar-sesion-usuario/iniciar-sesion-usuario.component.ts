import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../../service/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion-usuario',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FormsModule],
  templateUrl: './iniciar-sesion-usuario.component.html',
  styleUrls: ['./iniciar-sesion-usuario.component.css']
})
export class IniciarSesionUsuarioComponent {
  nombre: string = '';
  apellido: string = '';
  rut: string = '';
  correo: string = '';

  constructor(private carrito: CarritoService, private router: Router) { }


  onSubmit() {
    const cliente = {
      nombre: this.nombre,
      apellido: this.apellido,
      rut: this.rut,
      correo: this.correo
    }
    this.carrito.setCliente(cliente);
    console.log('Cliente:', cliente);
    this.router.navigate(['/pago']);

  }
}
