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
  private idcliente: number = 0;
  private readonly STORAGE_KEY_CLIENT = 'cliente';

  constructor() {
    this.cargarCarrito();
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
    if (this.idcliente) {
      localStorage.setItem(this.STORAGE_KEY_CLIENT, JSON.stringify(this.idcliente));
    }
  }

  private cargarCliente(): void {
    const clienteGuardado = localStorage.getItem(this.STORAGE_KEY_CLIENT);
    if (clienteGuardado) {
      this.idcliente = JSON.parse(clienteGuardado);
    }
    for (let item of this.carrito) {
      item.servicio.precio = Number(item.servicio.precio);
      item.cantidad_personas = Number(item.cantidad_personas);
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
  
  getIdCliente(): number {
    return this.idcliente;
  }

  setIdCliente(idcliente: number): void {
    this.idcliente = idcliente;
    this.guardarCliente();
  }

  clearCliente(): void {
    this.idcliente = 0;
    localStorage.removeItem(this.STORAGE_KEY_CLIENT);
  }

  async postReserva(reserva: Reservation): Promise<void> {
    try {
      const response = await axios.post('http://localhost:8000/api/reservas/', reserva);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async registrarReserva(carrito: { servicio: Service, cantidad_personas: number }[], metodo_de_pago_seleccionado: string): Promise<void> {
    for (let item of carrito) {
      let reserva = this.crearReserva(item, metodo_de_pago_seleccionado);
      console.log(reserva);
      await this.postReserva(reserva);
    }
    this.clearCliente();
    this.vaciarCarrito();
  }

  crearReserva(item: {servicio: Service, cantidad_personas: number}, metodo_de_pago_seleccionado: string): Reservation {
    item.servicio.precio = Number(item.servicio.precio);
    item.cantidad_personas = Number(item.cantidad_personas);
    let reserva: Reservation = {
      pago_total: item.servicio.precio,
      fecha: item.servicio.fecha,
      estado_pago: 'Abonado',
      metodo_de_pago: metodo_de_pago_seleccionado,
      idcliente: this.getIdCliente(),
      cantidad_personas: item.cantidad_personas,
      idservicio: item.servicio.idservicio,
    }
    return reserva
  }
}
