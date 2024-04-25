import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, tap } from 'rxjs';

import { NavbarComponent } from '../components/navbar/navbar.component';
import { NavigationComponent } from '../components/navigation/navigation.component';

import { ApiService } from '../service/api.service';
import { DataService } from '../service/data.service';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-simpatizantes',
  standalone: true,
  imports: [CommonModule, NavbarComponent, NavigationComponent],
  templateUrl: './simpatizantes.component.html',
  styleUrl: './simpatizantes.component.css'
})
export class SimpatizantesComponent {

  userData: any;
  listaSimpatizantes: any = {};

  constructor(
    private apiService: ApiService,    
    private dataService: DataService,
    private sessionService: SessionService,
  ) { 
    this.userData = this.sessionService.getSessionData('userData')
  }

  ngOnInit() {
    this.apiService.postSimpatizantes('favoritos', this.userData.id)
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

  trackByFn(index: number, item: { cedula: number }) {
    return item.cedula; // Cambia 'cedula' por el identificador único de cada elemento
  }
}
