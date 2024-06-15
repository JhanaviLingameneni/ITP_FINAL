import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-service-interactions',
  templateUrl: './service-interactions.component.html',
  styleUrl: './service-interactions.component.css'
})
export class ServiceInteractionsComponent {
  constructor(private router: Router,
    private httpClient: HttpClient,
  ) { }
  logOut() :void{
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
