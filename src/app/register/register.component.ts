import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { tap, catchError } from 'rxjs';

import { ApiService } from '../service/api.service';
import { DataService } from '../service/data.service';
import { SessionService } from '../service/session.service';

import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLock, faIdCard, faUser, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  faLock = faLock;
  faIdCard = faIdCard;
  faUser = faUser;
  faPhone = faPhone;
  faEmail = faEnvelope;

  nombre: string = "";
  cedula: string = "";
  email: string = "";
  telefono: string = "";
  contrasena: string = "";
  role: number = 1;
  candidato_id: number = 0;
  
  constructor(
    private apiService: ApiService,     
    private router: Router, 
    private dataService: DataService,
    private sessionService: SessionService
  ) { }

  onSubmit() {

    if (this.isFormValid()) {

      const formData = {
        name: this.nombre,
        cedula: this.cedula,
        email: this.email,
        phone: this.telefono,
        password: this.contrasena,
        role: this.role,
        cadidato_id: this.candidato_id
      };

      Swal.fire({
        position: 'center',
        icon: "info",
        title: "Registrando",
        showConfirmButton: false,
        timer: 100000,
        allowOutsideClick: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      this.apiService.postRegister('registro', formData)
      .subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: response.mensajes.title,
            text: response.mensajes.mensaje,
          }).then(() => {
            this.router.navigate(['/login']);
          });
        },
        error: (error) => {
          //console.error('Error al enviar los datos:', error);
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
    else {
      this.handleError('Campos Vacios', 'Por favor, rellene todos los campos');
    }
  }

  private isFormValid(): boolean {
    return this.nombre != "" && this.cedula != "" && this.email != "" && this.telefono != "" && this.contrasena!= "";
  }

  private handleError(title: string, message: string): void {
    Swal.close();
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: title,
      text: message,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    setTimeout(() => {
      Swal.close();
    }, 2000); 
  }
}
