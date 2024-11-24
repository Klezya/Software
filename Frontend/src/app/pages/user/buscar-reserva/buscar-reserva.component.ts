import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../components/footer/footer.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

@Component({
  selector: 'app-buscar-reserva',
  templateUrl: './buscar-reserva.component.html',
  styleUrls: ['./buscar-reserva.component.css'],
  standalone: true,
  imports: [FooterComponent, NavbarComponent, CommonModule, HttpClientModule], // Agrega HttpClientModule aquí
})
export class BuscarReservaComponent implements OnInit {
  reservas: any[] = [];

  constructor() {}

  ngOnInit(): void {
  }
}
