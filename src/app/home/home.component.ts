import { Component, inject } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError, tap } from 'rxjs';

import { ApiService } from '../service/api.service';
import { DataService } from '../service/data.service';
import { SessionService } from '../service/session.service';

import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
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

    this.apiService.getExistePersonaByCedula('ExistePersona', this.cedula)
    .subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: response.titulo,
        }).then(() => {
          this.router.navigate([`/persona/${this.cedula}`]);
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: error.error.titulo,
          text: error.error.mensaje,
        });
      },
      complete: () => {
        console.log('La operación ha finalizado');
      }
    });
  }

  obtenerSimpatizantes() {
    this.apiService.postSimpatizantes('Simpatizantes', this.userData.id)
      .pipe(
        tap(response => {                    
          if (response.codigo == 200) {
            this.listaSimpatizantes = response.simpatizantes;            
          }

          else if (response.codigo == 201) {

          }
        }),
        catchError(error => {
          console.error('Error al enviar los datos:', error);
          throw error;
        })
      )
      .subscribe();
  }

  cerrarSession() {
    this.sessionService.clearSession();
    this.router.navigate(['/login']);
  }

}