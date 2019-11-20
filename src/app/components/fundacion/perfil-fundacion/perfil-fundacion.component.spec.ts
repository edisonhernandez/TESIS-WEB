import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilFundacionComponent } from './perfil-fundacion.component';

describe('PerfilFundacionComponent', () => {
  let component: PerfilFundacionComponent;
  let fixture: ComponentFixture<PerfilFundacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilFundacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilFundacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
