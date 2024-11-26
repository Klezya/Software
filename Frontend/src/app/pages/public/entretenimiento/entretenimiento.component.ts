import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { DatabaseService } from '../../../service/database.service';
import { Service } from '../../../interface/interfaces';
import { CarritoService } from '../../../service/carrito.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CustomValidators } from '../../../validators/validators';

@Component({
  selector: 'app-entretenimiento',
  templateUrl: './entretenimiento.component.html',
  styleUrls: ['./entretenimiento.component.scss'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FormsModule, ReactiveFormsModule],
})
export class EntretenimientoComponent implements OnInit {
  eventos: Service[] = [];
  eventos_filtrados: Service[] = [];
  filtros: string[] = ['Todos', 'Musica', 'Show'];
  filtro_seleccionado: string = 'Todos';
  seleccion: Service | null = null;
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
    if (this.reservaForm.invalid) {
      return;
    }
    service.fecha = this.reservaForm.value.fecha_reserva;
    this.carritoService.agregarAlCarrito(service, 0);
    alert('Añadido al carrito: ' + service.titulo); // Mostrar alerta
    this.closeModal();
    this.reservaForm.reset();
    console.log('Añadido al carrito:', service);
  }

}
