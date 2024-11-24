import { Injectable } from '@angular/core';
import { Service } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: { servicio: Service, cantidad_personas: number }[] = [];
  private readonly STORAGE_KEY = 'carrito';

  constructor() {
    this.cargarCarrito();
    for (let item of this.carrito) {
      item.servicio.precio = Number(item.servicio.precio);
    }
  }

  private guardarCarrito(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.carrito));
  }

  private cargarCarrito(): void {
    const carritoGuardado = localStorage.getItem(this.STORAGE_KEY);
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
    }
  }

  agregarAlCarrito(servicio: Service, cantidad_personas: number): void {
    this.carrito.push({ servicio, cantidad_personas });
    this.guardarCarrito();
  }

  eliminarDelCarrito(servicio: Service): void {
    const index = this.carrito.findIndex(item => item.servicio === servicio);
    if (index > -1) {
      this.carrito.splice(index, 1);
      this.guardarCarrito();
    }
  }

  obtenerCarrito(): { servicio: Service, cantidad_personas: number }[] {
    return this.carrito;
  }

  calcularTotal(): number {
    let total = 0;
    for (let item of this.carrito) {
      if (item.servicio.tipo_servicio === 'Banquete') {
        total += item.servicio.precio + item.servicio.precio*0.005*item.cantidad_personas;
      } else {
        total += item.servicio.precio
      }
    }
    return total;
  }
}
