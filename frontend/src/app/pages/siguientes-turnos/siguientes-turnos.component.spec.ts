import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiguientesTurnosComponent } from './siguientes-turnos.component';

describe('SiguientesTurnosComponent', () => {
  let component: SiguientesTurnosComponent;
  let fixture: ComponentFixture<SiguientesTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiguientesTurnosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiguientesTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
