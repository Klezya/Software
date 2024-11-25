import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../../service/carrito.service';
import { Router } from '@angular/router';
import { validate, format, clean} from 'rut.js';
import { Client } from '../../../interface/interfaces';
import { DatabaseService } from '../../../service/database.service';

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

  constructor(private carrito: CarritoService,
    private router: Router, 
    private database: DatabaseService
  ) { }


  // Función para validar el rut falta si, jaja ayuda
  async onSubmit() {
    const cliente: Client = {
      nombre: this.nombre,
      apellido: this.apellido,
      rut: format(this.rut),
      correo: this.correo
    }
    try {
      await this.database.getCliente(cliente.rut).then((response) => {
        console.log(response.idcliente)
        this.carrito.setIdCliente(response.idcliente);
      })
    } catch (error: any) {
      console.log(error)
      if (error?.response?.data?.detail == 'No Cliente matches the given query.') {
          const idcliente = await this.database.postCliente(cliente);
          this.carrito.setIdCliente(idcliente);
          console.log('Cliente:', cliente);
          this.router.navigate(['/pago']);
        return;
      }
    }
  }
}
