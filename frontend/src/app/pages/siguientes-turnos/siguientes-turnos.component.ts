import { Component } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-siguientes-turnos',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIcon],
  templateUrl: './siguientes-turnos.component.html',
  styleUrl: './siguientes-turnos.component.scss'
})
export class SiguientesTurnosComponent {

}
