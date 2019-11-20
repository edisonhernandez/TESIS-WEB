import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPerfilComponent } from './actualizar-perfil.component';

describe('ActualizarPerfilComponent', () => {
  let component: ActualizarPerfilComponent;
  let fixture: ComponentFixture<ActualizarPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
