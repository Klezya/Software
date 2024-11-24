import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { DatabaseService } from '../../../service/database.service';
import { Service } from '../../../interface/interfaces';

@Component({
  selector: 'app-banqueteria',
  templateUrl: './banqueteria.component.html',
  styleUrls: ['./banqueteria.component.scss'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
})
export class BanqueteriaComponent {
  banquetes: Service[] = [];
  banquetes_filtrados: Service[] = [];
  filtros: string[] = ['Todos','Buffet','Gourmet', 'Vegano'];
  filtro_seleccionado: string = 'Todos';

  constructor(
    private databaseService: DatabaseService
  ) { }

  async ngOnInit() {
    this.banquetes = await this.databaseService.getBanquetes();
    this.banquetes_filtrados = this.banquetes;
    console.log(this.banquetes);
  }

  applyFilter(especialidad: string) {
    this.filtro_seleccionado = especialidad;
    if (especialidad === 'Todos') {
      this.banquetes_filtrados = this.banquetes;
    } else {
      this.banquetes_filtrados = this.banquetes.filter(banquete => banquete.especialidad === especialidad);
    }
  }

  /* Dejo la pantilla del modal para implementar luego
  openModal(service: Service) {
    this.selectedService = service;
  }

  closeModal(event: Event) {
    this.selectedService = null;
  }*/

  addToCart(service: Service) {
    console.log('Añadido al carrito:', service);
  }
}
