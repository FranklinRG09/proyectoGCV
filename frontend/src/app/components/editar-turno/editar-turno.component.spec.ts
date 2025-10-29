import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTurnoComponent } from './editar-turno.component';

describe('EditarTurnoComponent', () => {
  let component: EditarTurnoComponent;
  let fixture: ComponentFixture<EditarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTurnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
