import { Injectable } from '@angular/core';
import { Service } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: Service[] = [];
  private readonly STORAGE_KEY = 'carrito';

  constructor() {
    this.cargarCarrito();
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

  agregarAlCarrito(servicio: Service): void {
    this.carrito.push(servicio);
    this.guardarCarrito();
  }

  eliminarDelCarrito(servicio: Service): void {
    const index = this.carrito.indexOf(servicio);
    if (index > -1) {
      this.carrito.splice(index, 1);
      this.guardarCarrito();
    }
  }

  obtenerCarrito(): Service[] {
    return this.carrito;
  }

  calcularTotal(): number {

    let total: number = 0;
    for (let servicio of this.carrito) {
      total += Number(servicio.precio);
    }
    return total
  }
}
