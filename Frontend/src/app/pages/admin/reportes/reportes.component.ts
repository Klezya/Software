import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../components/footer/footer.component';
import { Reporte, Reservation, Service } from '../../../interface/interfaces';
import { DatabaseService } from '../../../service/database.service';


@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FooterComponent],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  reportes: Reporte[] = [];
  mostrarServicios: { [key: string]: boolean } = {};

  constructor(private databaseService: DatabaseService) { }

  async ngOnInit(): Promise<void> {
    const reservas = await this.databaseService.getReservas();
    const servicios = await Promise.all(reservas.map(reserva => this.databaseService.getServicio(reserva.idservicio)));
    this.reportes = this.generarReportesMensuales(reservas, servicios);
    console.log(this.reportes);
  }

  generarReportesMensuales(reservas: Reservation[], servicios: Service[]): Reporte[] {
    const reportes: Reporte[] = [];
    const reservasPorMes: { [key: string]: Reservation[] } = {};

    reservas.forEach(reserva => {
      const mesAno = new Date(reserva.fecha).toISOString().slice(0, 7); // Formato YYYY-MM
      if (!reservasPorMes[mesAno]) {
        reservasPorMes[mesAno] = [];
      }
      reservasPorMes[mesAno].push(reserva);
    });

    for (const mesAno in reservasPorMes) {
      const reservasDelMes = reservasPorMes[mesAno];
      const reporte: Reporte = {
        mes_ano: mesAno,
        total_recaudado: 0,
        cantidad_salones: 0,
        cantidad_banquetes: 0,
        cantidad_eventos: 0,
        cantidad_reservas: reservasDelMes.length,
        servicios: []
      };

      reservasDelMes.forEach(reserva => {
        const servicio = servicios.find(s => s.idservicio === reserva.idservicio);
        if (servicio) {
          reporte.total_recaudado += reserva.pago_total;
          reporte.servicios.push(servicio);

          if (servicio.tipo_servicio === 'Salon') {
            reporte.cantidad_salones++;
          } else if (servicio.tipo_servicio === 'Banquete') {
            reporte.cantidad_banquetes++;
          } else if (servicio.tipo_servicio === 'Evento') {
            reporte.cantidad_eventos++;
          }
        }
      });

      reportes.push(reporte);
    }

    return reportes;
  }

  toggleServicios(mesAno: string): void {
    this.mostrarServicios[mesAno] = !this.mostrarServicios[mesAno];
  }
}
