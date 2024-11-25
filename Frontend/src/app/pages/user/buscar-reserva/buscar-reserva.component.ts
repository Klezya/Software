import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../components/footer/footer.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../../../service/database.service';
import { Reservation, Service } from '../../../interface/interfaces';
import { format } from 'rut.js';

@Component({
  selector: 'app-buscar-reserva',
  templateUrl: './buscar-reserva.component.html',
  styleUrls: ['./buscar-reserva.component.css'],
  standalone: true,
  imports: [FooterComponent, NavbarComponent, CommonModule, FormsModule],
})
export class BuscarReservaComponent implements OnInit {

  reservas: (Reservation & { servicio: Service })[] = [];
  rut: string = '';
  isLoading: boolean = false;

  constructor(
    private databaseService: DatabaseService
  ) {}

  ngOnInit(): void {
  }

  async onSubmit() {
    this.isLoading = true;
    try {
      const response = await this.databaseService.getCliente(format(this.rut));
      const idcliente = response.idcliente;
      const reservas = await this.databaseService.getReservas(idcliente);

      this.reservas = await Promise.all(reservas.map(async (reserva: Reservation) => {
        const servicio = await this.databaseService.getServicio(reserva.idservicio);
        return { ...reserva, servicio };
      }));
    } catch (error) {
      console.error('Error fetching reservations', error);
    } finally {
      this.isLoading = false;
    }

    console.log(this.reservas);
  }
}
