import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { DatabaseService } from '../../../service/database.service';
import { Service } from '../../../interface/interfaces';

@Component({
  selector: 'app-entretenimiento',
  templateUrl: './entretenimiento.component.html',
  styleUrls: ['./entretenimiento.component.scss'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
})
export class EntretenimientoComponent {
  eventos: Service[] = [];
  eventos_filtrados: Service[] = [];
  filtros: string[] = ['Todos','Musica', 'Show'];
  filtro_seleccionado: string = 'Todos';

  constructor(
    private databaseService: DatabaseService
  ) { }

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
}
