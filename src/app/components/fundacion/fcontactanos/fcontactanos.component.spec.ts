import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcontactanosComponent } from './fcontactanos.component';

describe('FcontactanosComponent', () => {
  let component: FcontactanosComponent;
  let fixture: ComponentFixture<FcontactanosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcontactanosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcontactanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
