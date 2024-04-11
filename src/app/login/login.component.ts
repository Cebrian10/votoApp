import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  weatherForecasts$: Observable<any[]> = new Observable<any[]>();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.weatherForecasts$ = this.apiService.getDataFromUrl('WeatherForecast');

    this.weatherForecasts$.subscribe(data => {
      console.log(data);
    });
  }

  /* 
  Registrarse(): void {    
    console.log('Iniciando sesión...');
  }
  */
}