import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarAdopcionComponent } from './aprobar-adopcion.component';

describe('AprobarAdopcionComponent', () => {
  let component: AprobarAdopcionComponent;
  let fixture: ComponentFixture<AprobarAdopcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobarAdopcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobarAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
