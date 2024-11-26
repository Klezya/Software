import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarritoService } from '../../../service/carrito.service';
import { Router } from '@angular/router';
import { Client } from '../../../interface/interfaces';
import { DatabaseService } from '../../../service/database.service';
import { CustomValidators } from '../../../validators/validators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-iniciar-sesion-usuario',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './iniciar-sesion-usuario.component.html',
  styleUrls: ['./iniciar-sesion-usuario.component.css']
})
export class IniciarSesionUsuarioComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private carrito: CarritoService,
    private router: Router,
    private database: DatabaseService
  ) {
    this.loginForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: ['', [Validators.required, CustomValidators.rutValidator]],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const cliente: Client = {
      nombre: this.loginForm.value.nombre,
      apellido: this.loginForm.value.apellido,
      rut: this.loginForm.value.rut,
      correo: this.loginForm.value.correo
    };

    try {
      const response = await this.database.getClienteRut(cliente.rut);
      this.carrito.setIdCliente(response.idcliente);
      this.router.navigate(['/pago']);
    } catch (error: any) {
      if (error?.response?.data?.detail === 'No Cliente matches the given query.') {
        const idcliente = await this.database.postCliente(cliente);
        this.carrito.setIdCliente(idcliente);
        this.router.navigate(['/pago']);
      } else {
        console.error('Error:', error);
      }
    }
  }
}
