import { Component, inject } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError, tap } from 'rxjs';

import { ApiService } from '../service/api.service';
import { DataService } from '../service/data.service';
import { SessionService } from '../service/session.service';

import { NavbarComponent } from '../components/navbar/navbar.component';
import { NavigationComponent } from '../components/navigation/navigation.component';

import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, NavbarComponent, NavigationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  faSearch = faSearch;
  faList = faList;

  private readonly dataService = inject(DataService);
  private readonly sessionService = inject(SessionService);
  private readonly router = inject(Router);
  public readonly apiService = inject(ApiService);

  userData: any;
  listaSimpatizantes: any = {};
  cedula: string = "";

  constructor() {
    this.userData = this.sessionService.getSessionData('userData');
  }

  buscarPersona() {
    if (this.cedula.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Error de Validación',
        text: 'Por favor ingrese la cédula.',
      });
      return;
    }

    Swal.fire({
      position: 'center',
      icon: "info",
      title: "Buscando Usuario",
      showConfirmButton: false,
      timer: 100000,
      allowOutsideClick: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });


    this.apiService.getPersonaByCedula('consulta', this.cedula)
    .subscribe({
      next: (response) => {
        //console.log(response);
        
        this.dataService.setPersonaData(response);
        Swal.fire({
          icon: 'success',
          title: response.mensajes.title,
        }).then(() => {
          this.router.navigate([`/persona/${this.cedula}`]);
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: error.error.mensajes.title,
          text: error.error.mensajes.mensaje,
        });
      },
      complete: () => {
        console.log('La operación ha finalizado');
      }
    });
  }

  cerrarSession() {
    this.sessionService.clearSession();
    this.router.navigate(['/login']);
  }

}