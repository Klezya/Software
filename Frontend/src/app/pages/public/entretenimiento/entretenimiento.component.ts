import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

@Component({
  selector: 'app-entretenimiento',
  templateUrl: './entretenimiento.component.html',
  styleUrls: ['./entretenimiento.component.scss'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
})
export class EntretenimientoComponent {
  services: Service[] = [
    { id: 1, name: 'DJ en Vivo', description: 'NaN', price: 150, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB2NvDSyTM0Ucye_IDbjb8K8y8YmNDS6yUjA&s', category: 'Música' },
    { id: 2, name: 'Show de Standup', description: 'NaN', price: 300, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4ZCeu_Jm5tc9Fq29QLVmaAPUntugX7lDaXQ&s', category: 'Shows' },
    { id: 3, name: 'Banda en Vivo', description: 'NaN', price: 200, image: 'https://img.freepik.com/fotos-premium/conciertos-virtuales-experiencias-musica-vivo-actuaciones-digitales-fondo-color-solido_964851-1881.jpg', category: 'Música' },
  ];

  filters: string[] = ['Todos', 'Música', 'Shows'];
  activeFilter: string = 'Todos';
  filteredServices: Service[] = [...this.services];
  selectedService: Service | null = null;

  applyFilter(filter: string) {
    this.activeFilter = filter;
    this.filteredServices = filter === 'Todos' ? this.services : this.services.filter(service => service.category === filter);
  }

  openModal(service: Service) {
    this.selectedService = service;
  }

  closeModal(event: Event) {
    this.selectedService = null;
  }

  addToCart(service: Service) {
    console.log('Añadido al carrito:', service);
  }
}
