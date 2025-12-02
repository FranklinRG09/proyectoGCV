import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-sesion',
  imports: [CommonModule, RouterModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.scss'
})
export class InicioSesionComponent implements OnInit {

   private authService = inject(AuthService);
   private router = inject(Router);

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/turnos']);
      }
    })
  }

  // Llama a Auth0 para iniciar sesión
  login(): void {
    this.authService.loginWithRedirect();
  }
}
