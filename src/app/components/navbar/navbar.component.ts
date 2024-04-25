import { Component, inject } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { ApiService } from '../../service/api.service';
import { DataService } from '../../service/data.service';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private readonly dataService = inject(DataService);
  private readonly sessionService = inject(SessionService);
  private readonly router = inject(Router);

  userData: any;

  constructor() {
    this.userData = this.sessionService.getSessionData('userData');
  }

  cerrarSession() {
    this.sessionService.clearSession();
    this.router.navigate(['/login']);
  }
}
