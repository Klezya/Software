import { Component, OnInit } from '@angular/core';
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
export class IniciarSesionAdminComponent implements OnInit {
  personal: {usuario: string, password:string} = {
    usuario: '',
    password: ''
  }

  constructor(
    private databaseService: DatabaseService
  ) {}

  ngOnInit(): void {
  }

  async onSubmit(){
    try {
      await this.databaseService.loginPersonal(this.personal);
    } catch (error) {
      console.error('Error logging in', error);
    }
  }
}
