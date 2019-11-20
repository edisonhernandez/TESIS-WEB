import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisemergenciasComponent } from './misemergencias.component';

describe('MisemergenciasComponent', () => {
  let component: MisemergenciasComponent;
  let fixture: ComponentFixture<MisemergenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisemergenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisemergenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
