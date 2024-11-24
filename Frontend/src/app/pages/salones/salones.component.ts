import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Service } from '../../interface/interfaces';
import { DatabaseService } from '../../service/database.service';

@Component({
  selector: 'app-salones',
  templateUrl: './salones.component.html',
  styleUrls: ['./salones.component.scss'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
})
export class SalonesComponent implements OnInit {
  salones: Service[] = [];
  salones_filtrados: Service[] = [];
  filtros: string[] = ['Todos','Grande', 'Mediano', 'Mediano Junior'];
  capacidades: Map<string, number> = new Map();

  constructor(
    private databaseService: DatabaseService
  ) { }

  async ngOnInit(): Promise<void> {
    this.inicializarCapacidades();
    this.salones = await this.databaseService.getSalones();
  }

  applyFilter(capacidad: string) {
    if (capacidad === 'Todos') {
      this.salones_filtrados = this.salones;
    } else {
      this.salones_filtrados = this.salones.filter(salon => salon.capacidad === this.capacidades.get(capacidad));
    }
  }

  inicializarCapacidades() {
    this.capacidades.set('Grande', 1000);
    this.capacidades.set('Mediano', 500);
    this.capacidades.set('Mediano Junior', 400);
  }

}


