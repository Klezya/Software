import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { Client, Service } from '../../../interface/interfaces';
import { CarritoService } from '../../../service/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent implements OnInit {
  carrito: {servicio: Service, cantidad_personas: number}[] = [];
  cliente: Client | null = null;

  constructor(private carritoService: CarritoService, private router: Router) { }

  ngOnInit() {
    this.carrito = this.carritoService.obtenerCarrito();
    console.log(this.carrito);
    this.cliente = this.carritoService.getCliente();
    console.log(this.cliente);
  }

  calcularTotal(): number {
    return this.carritoService.calcularTotal();
  }

  pagar() {
    alert('Pago realizado con éxito');
    this.router.navigate(['/']);
    this.carritoService.vaciarCarrito();
    this.carritoService.clearCliente();
    console.log(this.carrito);
    console.log(this.cliente)
  }

}
