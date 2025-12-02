import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRippleModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MenuComponent } from "./components/menu/menu.component";
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatRippleModule, MatSidenavModule, MenuComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isSidenavOpen = true;
  esRutaSolicitarTurno = false;
  esRutaInicioSesion = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        //ocultar toolbar y sidenav
        this.esRutaInicioSesion = event.urlAfterRedirects === '/inicio-sesion';
      });
  }
  
    toggleMenu() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}