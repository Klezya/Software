import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { Personal } from '../../../interface/interfaces';
import { DatabaseService } from '../../../service/database.service';

@Component({
  selector: 'app-iniciar-sesion-admin',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FormsModule],
  templateUrl: './iniciar-sesion-admin.component.html',
  styleUrl: './iniciar-sesion-admin.component.css'
})
export class IniciarSesionAdminComponent {
  personal: Personal = {
    usuario: '',
    password: ''
  }

  constructor(
    private databaseService: DatabaseService
  ) {}

  async onSubmit(){
    const response = await this.databaseService.loginPersonal(this.personal)
    console.log(response)
  }
}
