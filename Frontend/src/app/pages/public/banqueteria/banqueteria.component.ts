import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { DatabaseService } from '../../../service/database.service';
import { Service } from '../../../interface/interfaces';
import { CarritoService } from '../../../service/carrito.service';

@Component({
  selector: 'app-banqueteria',
  templateUrl: './banqueteria.component.html',
  styleUrls: ['./banqueteria.component.scss'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FormsModule],
})
export class BanqueteriaComponent {
  banquetes: Service[] = [];
  banquetes_filtrados: Service[] = [];
  filtros: string[] = ['Todos','Buffet','Gourmet', 'Vegano'];
  filtro_seleccionado: string = 'Todos';
  seleccion: Service | null = null;
  valor_adicional: number = 0;

  constructor(
    private databaseService: DatabaseService,
    private carritoService: CarritoService
  ) { }

  async ngOnInit() {
    this.banquetes = await this.databaseService.getBanquetes();
    this.banquetes_filtrados = this.banquetes;
    for (let banquete of this.banquetes) {
      banquete.precio = Number(banquete.precio);
    }
  }

  applyFilter(especialidad: string) {
    this.filtro_seleccionado = especialidad;
    if (especialidad === 'Todos') {
      this.banquetes_filtrados = this.banquetes;
    } else {
      this.banquetes_filtrados = this.banquetes.filter(banquete => banquete.especialidad === especialidad);
    }
  }

  openModal(service: Service) {
    this.seleccion = service;
  }

  closeModal() {
    this.seleccion = null;
    console.log(this.valor_adicional);
  }

  addToCart(service: Service) {
    this.carritoService.agregarAlCarrito(service);
    alert('Añadido al carrito: ' + service.titulo); // Mostrar alerta
    this.closeModal();
    console.log('Añadido al carrito:', service);
  }

  asegurarValorAbsoluto() {
    // Convierte el valor a su valor absoluto
    this.valor_adicional = Math.abs(this.valor_adicional);
  }

  
}
