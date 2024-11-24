import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarSesionAdminComponent } from './iniciar-sesion-admin.component';

describe('IniciarSesionAdminComponent', () => {
  let component: IniciarSesionAdminComponent;
  let fixture: ComponentFixture<IniciarSesionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciarSesionAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniciarSesionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
