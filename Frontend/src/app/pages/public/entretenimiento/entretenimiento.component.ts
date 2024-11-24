import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { DatabaseService } from '../../../service/database.service';
import { Service } from '../../../interface/interfaces';
import { CarritoService } from '../../../service/carrito.service';

@Component({
  selector: 'app-entretenimiento',
  templateUrl: './entretenimiento.component.html',
  styleUrls: ['./entretenimiento.component.scss'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
})
export class EntretenimientoComponent {
  eventos: Service[] = [];
  eventos_filtrados: Service[] = [];
  filtros: string[] = ['Todos','Musica', 'Show'];
  filtro_seleccionado: string = 'Todos';
  seleccion: Service | null = null;

  constructor(
    private databaseService: DatabaseService,
    private carritoService: CarritoService
  ) { }

  async ngOnInit() {
    this.eventos = await this.databaseService.getEventos();
    this.eventos_filtrados = this.eventos;
  }

  applyFilter(especialidad: string) {
    this.filtro_seleccionado = especialidad;
    if (especialidad === 'Todos') {
      this.eventos_filtrados = this.eventos;
    } else {
      this.eventos_filtrados = this.eventos.filter(evento => evento.especialidad === especialidad);
    }
  }

  openModal(service: Service) {
    this.seleccion = service;
  }

  closeModal() {
    this.seleccion = null;
  }

  addToCart(service: Service) {
    this.carritoService.agregarAlCarrito(service, 0);
    alert('Añadido al carrito: ' + service.titulo); // Mostrar alerta
    this.closeModal();
    console.log('Añadido al carrito:', service);
  }
}
