import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarTurnoComponent } from './buscar-turno.component';

describe('BuscarTurnoComponent', () => {
  let component: BuscarTurnoComponent;
  let fixture: ComponentFixture<BuscarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarTurnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
