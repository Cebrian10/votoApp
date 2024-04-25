import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { tap, catchError } from 'rxjs';

import { ApiService } from '../service/api.service';
import { DataService } from '../service/data.service';
import { SessionService } from '../service/session.service';

import { NavbarComponent } from '../components/navbar/navbar.component';
import { NavigationComponent } from '../components/navigation/navigation.component';

import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLock, faIdCard, faUser, faPhone, faEnvelope, faSearch, faList } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-persona',
    standalone: true,
    imports: [CommonModule, RouterLink, FontAwesomeModule, FormsModule, NavbarComponent, NavigationComponent],
    templateUrl: './persona.component.html',
    styleUrl: './persona.component.css'
  })
  export class PersonaComponent {
  
    faLock = faLock;
    faIdCard = faIdCard;
    faUser = faUser;
    faPhone = faPhone;
    faEmail = faEnvelope;
    faSearch = faSearch;
    faList = faList;

    userData: any;
    cedula: string = "";
    persona: any;
    profilePhoto: string = "";

    constructor(
      private apiService: ApiService,     
      private route: ActivatedRoute,
      private router: Router, 
      private dataService: DataService,
      private sessionService: SessionService,
    ) { 
      this.userData = this.sessionService.getSessionData('userData');
    }
 
    ngOnInit() {
      const personaData = this.dataService.getPersonaData();
      if (personaData) {
          this.persona = personaData;
          this.profilePhoto = `https://picsptyzam.blob.core.windows.net/ptypics/fotospg/Imagep${personaData.cedula}.png`;
      }
      else {
        this.route.params.subscribe(params => {
          const cedula = params['cedula'];
          this.apiService.getPersonaByCedula('consulta', cedula)
              .subscribe({
                  next: (response) => {
                      this.persona = response.persona;
                      this.profilePhoto = `https://picsptyzam.blob.core.windows.net/ptypics/fotospg/Imagep${response.cedula}.png`;
                  },
                  error: (error) => {
                      //console.error('Error al obtener los datos de la persona:', error);
                      Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'Ha ocurrido un error al obtener los datos de la persona.'
                      });
                  }
              });
      });
      }
    }  
  }
  

