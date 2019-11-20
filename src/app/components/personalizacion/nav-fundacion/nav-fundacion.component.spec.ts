import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavFundacionComponent } from './nav-fundacion.component';

describe('NavFundacionComponent', () => {
  let component: NavFundacionComponent;
  let fixture: ComponentFixture<NavFundacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavFundacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavFundacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
