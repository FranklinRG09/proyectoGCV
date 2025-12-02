import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionTurnoComponent } from './confirmacion-turno.component';

describe('ConfirmacionTurnoComponent', () => {
  let component: ConfirmacionTurnoComponent;
  let fixture: ComponentFixture<ConfirmacionTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmacionTurnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacionTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
