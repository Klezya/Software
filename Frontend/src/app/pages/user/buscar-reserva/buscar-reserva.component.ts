import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../components/footer/footer.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { DatabaseService } from '../../../service/database.service';
import { Reservation, Service } from '../../../interface/interfaces';
import { format, validate } from 'rut.js';
import { CustomValidators } from '../../../validators/validators';

@Component({
  selector: 'app-buscar-reserva',
  templateUrl: './buscar-reserva.component.html',
  styleUrls: ['./buscar-reserva.component.css'],
  standalone: true,
  imports: [FooterComponent, NavbarComponent, CommonModule, ReactiveFormsModule],
})
export class BuscarReservaComponent implements OnInit {

  reservas: (Reservation & { servicio: Service })[] = [];
  rutForm: FormGroup;
  isLoading: boolean = false;
  finded = true;

  constructor(
    private fb: FormBuilder,
    private databaseService: DatabaseService
  ) {
    this.rutForm = this.fb.group({
      rut: ['', [Validators.required, CustomValidators.rutValidator]]
    });
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    if (this.rutForm.invalid) {
      return;
    }
    this.finded = true;
    this.isLoading = true;
    try {
      const formattedRut = format(this.rutForm.value.rut);
      const response = await this.databaseService.getClienteRut(formattedRut);
      const idcliente = response.idcliente;
      const reservas = await this.databaseService.getReservasCliente(idcliente);

      this.reservas = await Promise.all(reservas.map(async (reserva: Reservation) => {
        const servicio = await this.databaseService.getServicio(reserva.idservicio);
        return { ...reserva, servicio };
      }));
    } catch (error) {
      this.finded = false;
      console.error('Error fetching reservations', error);
    } finally {
      this.isLoading = false;
    }

    console.log(this.reservas);
  }

  
}
