import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarTurnoComponent } from './solicitar-turno.component';

describe('SolicitarTurnoComponent', () => {
  let component: SolicitarTurnoComponent;
  let fixture: ComponentFixture<SolicitarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarTurnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
