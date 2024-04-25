import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { tap, catchError } from 'rxjs';

import { ApiService } from '../service/api.service';
import { DataService } from '../service/data.service';
import { SessionService } from '../service/session.service';

import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLock, faIdCard } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  faLock = faLock;
  faIdCard = faIdCard;

  cedula: string = "";
  password: string = "";

  constructor(
    private apiService: ApiService,     
    private router: Router, 
    private dataService: DataService,
    private sessionService: SessionService
  ) { }

  onSubmit() {

    // Verificacion de campos vacios
    if (this.cedula != "" && this.password != "") {

      Swal.fire({
        position: 'center',
        icon: "info",
        title: "Iniciando Sesión...",
        showConfirmButton: false,
        timer: 100000,
        allowOutsideClick: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      // Creacion de objeto con los datos del usuario 
      const formData = {
        email: this.cedula,
        password: this.password
      };


      this.apiService.postLogin('login', formData)
      .subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: "Verificado",
            text: "Bienvenido nuevamente a VotoAPP",
          }).then(() => {
            //console.log(response);
            
            this.sessionService.setSessionData('userData', response);
            this.dataService.setLoginInfo(response);
            this.router.navigate(['/home']);
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: "Error",
            text: error.error.mensaje,
          });
        },
        complete: () => {
          console.log('La operación ha finalizado');
        }
      });

    } else {
      Swal.fire({
        position: 'center',
        icon: "info",
        title: "¡Hay campos vacíos!",
        showConfirmButton: false,
        timer: 2000,
        allowOutsideClick: false,
      });
    }
  }
}