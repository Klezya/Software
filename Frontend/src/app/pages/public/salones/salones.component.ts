import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { Service } from '../../../interface/interfaces';
import { DatabaseService } from '../../../service/database.service';
import { CarritoService } from '../../../service/carrito.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CustomValidators } from '../../../validators/validators';

@Component({
  selector: 'app-salones',
  templateUrl: './salones.component.html',
  styleUrls: ['./salones.component.scss'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FormsModule, ReactiveFormsModule],
})
export class SalonesComponent implements OnInit {
  salones: Service[] = [];
  salones_filtrados: Service[] = [];
  filtros: string[] = ['Todos', 'Grande', 'Mediano', 'Mediano Junior'];
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
    this.salones = await this.databaseService.getSalones();
    this.salones_filtrados = this.salones;
    console.log(this.salones);
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


