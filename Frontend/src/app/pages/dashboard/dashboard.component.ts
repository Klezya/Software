import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [NavbarComponent, CommonModule]
})
export class DashboardComponent {
  ventas = [
    { id: 1, producto: 'Producto A', cantidad: 5, total: 100, fecha: '2024-11-23' },
    { id: 2, producto: 'Producto B', cantidad: 3, total: 75, fecha: '2024-11-22' },
    { id: 3, producto: 'Producto C', cantidad: 10, total: 200, fecha: '2024-11-21' }
  ];

  descargarReporte() {
    const csvContent = [
      ['ID', 'Producto', 'Cantidad', 'Total', 'Fecha'],
      ...this.ventas.map(venta => [venta.id, venta.producto, venta.cantidad, venta.total, venta.fecha])
    ]
      .map(e => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'reporte_ventas.csv');
    a.click();
  }
}
