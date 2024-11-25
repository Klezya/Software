import { Injectable } from '@angular/core';
import axios from 'axios';
import { Personal, Reservation, Service } from '../interface/interfaces';
import { format } from 'rut.js';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() {}

  BASE_URL = 'http://127.0.0.1:8000';

  async getSalones(): Promise<Service[]> {
    try {
      const response = await axios.get(`${this.BASE_URL}/api/servicios`);
      const salones = response.data;
      return salones.filter((servicio: Service) => servicio.tipo_servicio === 'Salon');
    } catch (error) {
      console.error('Error fetching data', error);
      throw error;
    }
  }

  async getBanquetes(): Promise<any> {
    try {
      const response = await axios.get(`${this.BASE_URL}/api/servicios`);
      const banquetes = response.data;
      return banquetes.filter((servicio: Service) => servicio.tipo_servicio === 'Banquete');
    } catch (error) {
      console.error('Error fetching data', error);
      throw error;
    }
  }

  async getEventos(): Promise<Service[]> {
    try {
      const response = await axios.get(`${this.BASE_URL}/api/servicios`);
      const eventos = response.data;
      return eventos.filter((servicio: Service) => servicio.tipo_servicio === 'Evento');
    } catch (error) {
      console.error('Error fetching data', error);
      throw error;
    }
  }

  async postCliente(cliente: any): Promise<number> {
    try {
      const response = await axios.post(`${this.BASE_URL}/api/clientes/`, cliente);
      return response.data.id;
    } catch (error) {
      console.error('Error fetching data', error);
      throw error;
    }
  }

  async getCliente(rut: string): Promise<any> {
    try {
      rut = format(rut);
      const response = await axios.get(`${this.BASE_URL}/api/clientes/buscar/${rut}/`);
      return response.data;
    } catch (error) {
      //console.error('Error fetching data', error);
      throw error;
    }
  }

  async getServicio(idservicio: number): Promise<Service> {
    try {
      const response = await axios.get(`${this.BASE_URL}/api/servicios/${idservicio}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data', error);
      throw error;
    }
  }

  async getReservas(idcliente: number): Promise<any> {
    try {
      const response = await axios.get(`${this.BASE_URL}/api/reservas/cliente/${idcliente}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data', error);
      throw error;
    }
  }

  async postReserva(reserva: Reservation): Promise<any> {
    try {
      const response = await axios.post(`${this.BASE_URL}/api/reservas/`, reserva);
      return response.data;
    } catch (error) {
      console.error('Error fetching data', error);
      throw error;
    }
  }

  async loginPersonal(credenciales: {usuario: string, password: string}): Promise<any> {
    try {
      const response = await axios.get(`${this.BASE_URL}/api/personal/`);
      response.data.forEach((personal: Personal) => {
        if (personal.usuario === credenciales.usuario && personal.password === credenciales.password) {
          console.log('Usuario encontrado');
          console.log(personal);
        }
      });
    } catch (error) {
      console.error('Error fetching data', error);
      throw error;
    }
  }
}
