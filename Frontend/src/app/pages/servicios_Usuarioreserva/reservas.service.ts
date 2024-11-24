import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Asegúrate de que este servicio esté disponible globalmente
})
export class ReservasService {
  private apiUrl = 'http://api.misitio.com/reservas'; // Cambia por tu endpoint real

  constructor(private http: HttpClient) {}

  obtenerReservas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
