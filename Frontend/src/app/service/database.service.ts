import { Injectable } from '@angular/core';
import axios from 'axios';
import { Service } from '../interface/interfaces';

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

}
