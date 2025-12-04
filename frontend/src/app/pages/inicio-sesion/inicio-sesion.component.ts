import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Esperar a que Auth0 termine de inicializar (isLoading === false)
    // y luego actuar según isAuthenticated.
    combineLatest([this.authService.isLoading$, this.authService.isAuthenticated$])
      .pipe(
        // esperar a que la inicialización termine
        filter(([isLoading, _]) => isLoading === false),
        takeUntil(this.destroy$)
      )
      .subscribe(([_, isAuthenticated]) => {
        if (isAuthenticated) {
          this.router.navigate(['/turnos']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Llama a Auth0 para iniciar sesión
  login(): void {
    this.authService.loginWithRedirect();
  }
}