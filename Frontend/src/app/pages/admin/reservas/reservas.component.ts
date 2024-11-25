import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../components/footer/footer.component';
import { Client, Reservation, Service } from '../../../interface/interfaces';
import { DatabaseService } from '../../../service/database.service';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FooterComponent],
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  reservas: {detalle_reserva: Reservation, cliente: Client, servicio: Service}[] = [];

  constructor(
    private databaseService: DatabaseService,
  ) { }

  async ngOnInit(): Promise<void> {
    const reservas = await this.databaseService.getReservas();

    this.reservas = await Promise.all(reservas.map(async (reserva: Reservation) => {
      const servicio = await this.databaseService.getServicio(reserva.idservicio);
      const cliente = await this.databaseService.getClienteId(reserva.idcliente);
      return { detalle_reserva: reserva, servicio, cliente };
    }));

    console.log(this.reservas);
  }
}
