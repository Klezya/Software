import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { Client, Reservation, Service } from '../../../interface/interfaces';
import { CarritoService } from '../../../service/carrito.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent implements OnInit {
  carrito: {servicio: Service, cantidad_personas: number}[] = [];
  idcliente: number = 0;
  metodos_de_pago: string[] = ['Credito', 'Debito', 'Transferencia', 'Efectivo'];
  metodo_seleccionado: string = 'Debito';
  reserva: Reservation | null = null;
  
  constructor(private carritoService: CarritoService, private router: Router) { }

  ngOnInit() {
    this.carrito = this.carritoService.obtenerCarrito();
    console.log(this.carrito);
    this.idcliente = this.carritoService.getIdCliente();
  }

  calcularTotal(): number {
    return this.carritoService.calcularTotal();
  }

  async pagar() {
    alert('Pago realizado con éxito');
    await this.carritoService.registrarReserva(this.carrito, this.metodo_seleccionado);
    this.router.navigate(['/']);
  }

}
