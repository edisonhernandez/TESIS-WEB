import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MismascotasComponent } from './mismascotas.component';

describe('MismascotasComponent', () => {
  let component: MismascotasComponent;
  let fixture: ComponentFixture<MismascotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MismascotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MismascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
