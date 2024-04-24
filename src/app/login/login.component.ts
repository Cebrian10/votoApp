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
  contrasena: string = "";

  constructor(
    private apiService: ApiService,     
    private router: Router, 
    private dataService: DataService,
    private sessionService: SessionService
  ) { }

  onSubmit() {

    // Verificacion de campos vacios
    if (this.cedula != "" && this.contrasena != "") {

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
        cedula: this.cedula,
        contrasena: this.contrasena
      };

      // Peticion al api
      this.apiService.postLogin('Login', formData)
        .pipe(
          tap(response => {

            // Peticion exitosa!
            if (response.codigo == 200) {    
              Swal.close();        
              
              this.sessionService.setSessionData('userData', response.info);
              this.dataService.setLoginInfo(response.info);
              this.router.navigate(['/home']);
            }

            // Petición fallida por password
            else if (response.codigo == 203) {
              Swal.fire({
                position: 'center',
                icon: "error",
                title: "Contraseña incorrecta!",
                showConfirmButton: false,
                timer: 2000,
                allowOutsideClick: false,
              });
            }

            // Petición fallida por cedula
            else if (response.codigo == 204) {
              Swal.fire({
                position: 'center',
                icon: "error",
                title: "Usuario no existe!",
                showConfirmButton: false,
                timer: 2000,
                allowOutsideClick: false,
              });
            } else {
              console.error('Respuesta del servidor inesperada:', response);
            }

          }),
          catchError(error => {
            console.error('Error al enviar los datos:', error);
            throw error;
          })
        )
        .subscribe();

      // Mensaje de validacion para campos vacios
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