import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  
  faSearch = faSearch;
  faList = faList;

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  isCedulaActive(): boolean {
    return this.router.url.includes('/persona/');
  }
}
