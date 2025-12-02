import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTurnosComponent } from './admin-turnos.component';

describe('AdminTurnosComponent', () => {
  let component: AdminTurnosComponent;
  let fixture: ComponentFixture<AdminTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTurnosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
