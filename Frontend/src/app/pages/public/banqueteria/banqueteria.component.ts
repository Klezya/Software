import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { DatabaseService } from '../../../service/database.service';
import { Service } from '../../../interface/interfaces';
import { CarritoService } from '../../../service/carrito.service';
import { CustomValidators } from '../../../validators/validators';

@Component({
  selector: 'app-banqueteria',
  templateUrl: './banqueteria.component.html',
  styleUrls: ['./banqueteria.component.scss'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FormsModule, ReactiveFormsModule],
})
export class BanqueteriaComponent implements OnInit {
  banquetes: Service[] = [];
  banquetes_filtrados: Service[] = [];
  filtros: string[] = ['Todos', 'Buffet', 'Gourmet', 'Vegano'];
  filtro_seleccionado: string = 'Todos';
  seleccion: Service | null = null;
  cantidad_personas: number = 0;
  reservaForm: FormGroup;

  constructor(
    private databaseService: DatabaseService,
    private carritoService: CarritoService,
    private fb: FormBuilder
  ) {
    this.reservaForm = this.fb.group({
      fecha_reserva: ['', [Validators.required, CustomValidators.fechaValidator]]
    });
  }

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
  }

  addToCart(service: Service) {
    if (this.reservaForm.invalid) {
      return;
    }
    service.fecha = this.reservaForm.value.fecha_reserva;
    this.carritoService.agregarAlCarrito(service, this.cantidad_personas);
    alert('Añadido al carrito: ' + service.titulo); // Mostrar alerta
    this.closeModal();
    this.reservaForm.reset();
    console.log('Añadido al carrito:', service);
  }

  asegurarValorAbsoluto() {
    if (this.cantidad_personas < 0) {
      this.cantidad_personas = Math.abs(this.cantidad_personas);
    }
  }

}
