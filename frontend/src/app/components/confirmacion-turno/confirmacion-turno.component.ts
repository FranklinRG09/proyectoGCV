import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmacion-turno-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './confirmacion-turno.component.html',
  styleUrls: ['./confirmacion-turno.component.scss']
})
export class ConfirmacionTurnoComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmacionTurnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cerrarDialogo(): void {
    this.dialogRef.close();
  }
}
