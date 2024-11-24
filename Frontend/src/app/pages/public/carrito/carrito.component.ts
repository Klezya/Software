import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { Service } from '../../../interface/interfaces';
import { CarritoService } from '../../../service/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  imports: [CommonModule, NavbarComponent, FooterComponent],
})
export class CarritoComponent implements OnInit {
  carrito: {servicio: Service, cantidad_personas: number}[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.carrito = this.carritoService.obtenerCarrito();
    console.log(this.carrito);
  }

  eliminarDelCarrito(servicio: Service) {
    this.carritoService.eliminarDelCarrito(servicio);
    this.carrito = this.carritoService.obtenerCarrito();
  }

  calcularTotal(): number {
    return this.carritoService.calcularTotal();
  }

  pagar() {
    alert('Pago realizado con éxito!');
  }
}
