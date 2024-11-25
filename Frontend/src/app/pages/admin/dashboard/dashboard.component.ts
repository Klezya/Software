import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../components/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [NavbarComponent, CommonModule, FooterComponent]
})
export class DashboardComponent {

  constructor(
    private router: Router
  ) { }

  goToReservas(){
    this.router.navigate(['admin/reservas']);
  }

  goToReportes(){
    this.router.navigate(['admin/reportes']);
  }
  
}
