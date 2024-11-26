import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../components/footer/footer.component';
import { Reporte, Reservation, Service } from '../../../interface/interfaces';
import { DatabaseService } from '../../../service/database.service';
import * as XLSX from 'xlsx';

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

  volver() {
    window.history.back();  // Vuelve a la página anterior
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

  descargarReporte(reporte: Reporte): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([
      { A: 'Reporte del ' + reporte.mes_ano },
      { A: 'Total Recaudado', B: reporte.total_recaudado },
      { A: 'Cantidad de Salones', B: reporte.cantidad_salones },
      { A: 'Cantidad de Banquetes', B: reporte.cantidad_banquetes },
      { A: 'Cantidad de Eventos', B: reporte.cantidad_eventos },
      { A: 'Cantidad de Reservas', B: reporte.cantidad_reservas },
      {},
      { A: 'Servicios' },
      { A: 'Titulo', B: 'Tipo de Servicio', C: 'Precio' },
      ...reporte.servicios.map(servicio => ({
        A: servicio.titulo,
        B: servicio.tipo_servicio,
        C: servicio.precio
      }))
    ]);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte');

    XLSX.writeFile(wb, `Reporte_${reporte.mes_ano}.xlsx`);
  }
}
