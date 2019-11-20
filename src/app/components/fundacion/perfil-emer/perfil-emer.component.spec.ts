import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEmerComponent } from './perfil-emer.component';

describe('PerfilEmerComponent', () => {
  let component: PerfilEmerComponent;
  let fixture: ComponentFixture<PerfilEmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilEmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilEmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
