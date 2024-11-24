import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { Service } from '../../../interface/interfaces';
import { DatabaseService } from '../../../service/database.service';
import { CarritoService } from '../../../service/carrito.service';

@Component({
  selector: 'app-salones',
  templateUrl: './salones.component.html',
  styleUrls: ['./salones.component.scss'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
})
export class SalonesComponent implements OnInit {
  salones: Service[] = [];
  salones_filtrados: Service[] = [];
  filtros: string[] = ['Todos', 'Grande', 'Mediano', 'Mediano Junior'];
  filtro_seleccionado: string = 'Todos';
  seleccion: Service | null = null;

  constructor(
    private databaseService: DatabaseService,
    private carritoService: CarritoService
  ) { }

  async ngOnInit() {
    this.salones = await this.databaseService.getSalones();
    this.salones_filtrados = this.salones;
  }

  applyFilter(especialidad: string) {
    this.filtro_seleccionado = especialidad;
    if (especialidad === 'Todos') {
      this.salones_filtrados = this.salones;
    } else {
      this.salones_filtrados = this.salones.filter(salon => salon.especialidad === especialidad);
    }
  }

  openModal(service: Service) {
    this.seleccion = service;
  }

  closeModal() {
    this.seleccion = null;
  }

  addToCart(service: Service) {
    this.carritoService.agregarAlCarrito(service);
    alert('Añadido al carrito: ' + service.titulo); // Mostrar alerta
    this.closeModal();
    console.log('Añadido al carrito:', service);
  }
}


