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
  selector: 'app-banqueteria',
  templateUrl: './banqueteria.component.html',
  styleUrls: ['./banqueteria.component.scss'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
})
export class BanqueteriaComponent {
  services: Service[] = [
    { id: 1, name: 'Catering Básico', description: 'Servicio básico de catering', price: 150, image: 'https://media.istockphoto.com/id/495329828/es/foto/tostado-casero-del-d%C3%ADa-de-acci%C3%B3n-de-gracias-de-turqu%C3%ADa.jpg?s=612x612&w=0&k=20&c=5JwMBcNXS4lIDWp5a5ojJDEf-f-xraaIIXLQl_Vu2to=', category: 'Buffet' },
    { id: 2, name: 'Catering Premium', description: 'Servicio premium con chef exclusivo', price: 300, image: 'https://img.freepik.com/foto-gratis/vista-superior-mesa-llena-comida_23-2149209253.jpg', category: 'Gourmet' },
    { id: 3, name: 'Catering Vegano', description: 'Opciones veganas para tus eventos', price: 200, image: 'https://cdn3.pixelcut.app/1/J_e5e994bbb6.webp', category: 'Vegano' },
  ];

  filters: string[] = ['Todos', 'Buffet', 'Gourmet', 'Vegano'];
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
