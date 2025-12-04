import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTurnosComponent } from './registro-turnos.component';

describe('RegistroTurnosComponent', () => {
  let component: RegistroTurnosComponent;
  let fixture: ComponentFixture<RegistroTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroTurnosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
