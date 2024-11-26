import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatabaseService } from '../../../service/database.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-iniciar-sesion-admin',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './iniciar-sesion-admin.component.html',
  styleUrls: ['./iniciar-sesion-admin.component.css']
})
export class IniciarSesionAdminComponent implements OnInit {
  loginForm: FormGroup;
  invalid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private databaseService: DatabaseService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.invalid = true;
      return;
    }

    try {
      const response = await this.databaseService.loginPersonal(this.loginForm.value);
      if (response) {
        this.invalid = false;
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.invalid = true;
        console.log('Usuario no encontrado');
      }
    } catch (error) {
      this.invalid = true;
      console.error('Error logging in', error);
    }
  }
}
