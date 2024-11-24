import { Injectable } from '@angular/core';
import { Service } from '../interface/interfaces';
import { Client } from '../interface/interfaces';
import { Reservation } from '../interface/interfaces';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: { servicio: Service, cantidad_personas: number }[] = [];
  private readonly STORAGE_KEY = 'carrito';
  private cliente: Client | null = null;
  private readonly STORAGE_KEY_CLIENT = 'cliente';

  constructor() {
    this.cargarCarrito();
    for (let item of this.carrito) {
      item.servicio.precio = Number(item.servicio.precio);
      item.cantidad_personas = Number(item.cantidad_personas);
    }
    this.cargarCliente();
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

  private guardarCliente(): void {
    if (this.cliente) {
      localStorage.setItem(this.STORAGE_KEY_CLIENT, JSON.stringify(this.cliente));
    }
  }

  private cargarCliente(): void {
    const clienteGuardado = localStorage.getItem(this.STORAGE_KEY_CLIENT);
    if (clienteGuardado) {
      this.cliente = JSON.parse(clienteGuardado);
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

  vaciarCarrito(): void {
    this.carrito = [];
    this.guardarCarrito();
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
  
  getCliente(): Client | null {
    return this.cliente;
  }

  setCliente(cliente: Client): void {
    this.cliente = cliente;
    this.guardarCliente();
  }

  clearCliente(): void {
    this.cliente = null;
    localStorage.removeItem(this.STORAGE_KEY_CLIENT);
  }

  async registrarReserva(): Promise<void> {
    const reserva: Reservation = {
      id: 12,
      pago_total: 1000,
      fecha: "2024-12-12",
      estado_pago: "Abonado",
      metodo_de_pago: "Efectivo",
      idcliente: 2,
      cantidad_personas: 10,
      idservicio: 8,
    }
    try {
      const response = await axios.post('http://localhost:8000/api/reservas/', reserva);
      console.log(response.data);
      this.vaciarCarrito();
      this.clearCliente();
    } catch (error) {
      console.error(error);
    }  
  }
}
