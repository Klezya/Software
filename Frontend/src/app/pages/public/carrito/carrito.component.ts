import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-carrito',
  standalone: true,
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  imports: [CommonModule, NavbarComponent, FooterComponent],
})
export class CarritoComponent implements OnInit {
  carrito: Producto[] = [];

  constructor() {}

  ngOnInit() {
  }

  eliminarDelCarrito(producto: Producto) {
  }

  calcularTotal(): number {
    return 1;
  }
}
