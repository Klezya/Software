import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarSesionUsuarioComponent } from './iniciar-sesion-usuario.component';

describe('IniciarSesionUsuarioComponent', () => {
  let component: IniciarSesionUsuarioComponent;
  let fixture: ComponentFixture<IniciarSesionUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciarSesionUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniciarSesionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
