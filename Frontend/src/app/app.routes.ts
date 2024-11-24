import { Routes } from '@angular/router';

// Importa los componentes de las páginas
import { HomeComponent } from './pages/home/home.component';
import { SalonesComponent } from './pages/public/salones/salones.component';
import { BanqueteriaComponent } from './pages/public/banqueteria/banqueteria.component';
import { EntretenimientoComponent } from './pages/public/entretenimiento/entretenimiento.component';
import { BuscarReservaComponent } from './pages/user/buscar-reserva/buscar-reserva.component';
import { ContactoComponent } from './pages/public/contacto/contacto.component';
import { CarritoComponent } from './pages/public/carrito/carrito.component';
import { IniciarSesionAdminComponent } from './pages/admin/iniciar-sesion/iniciar-sesion.component';
import { IniciarSesionUsuarioComponent } from './pages/user/iniciar-sesion-usuario/iniciar-sesion-usuario.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },  // Ruta para Home
  { path: 'salones', component: SalonesComponent },
  { path: 'banqueteria', component: BanqueteriaComponent },
  { path: 'entretenimiento', component: EntretenimientoComponent },
  { path: 'buscar-reserva', component: BuscarReservaComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'iniciar-sesion-admin', component: IniciarSesionAdminComponent },
  { path: 'iniciar-sesion-usuario', component: IniciarSesionUsuarioComponent },
  { path: '**', redirectTo: '' }  // Redirigir a Home si la ruta no existe
];
