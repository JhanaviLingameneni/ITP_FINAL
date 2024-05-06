import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pacts',
  templateUrl: './pacts.component.html',
  styleUrl: './pacts.component.css'
})
export class PactsComponent implements OnInit{
  public jsonData: any;

  constructor(private router: Router) {

    this.jsonData = {
      "consumer": {
        "name": "auth-oidc"
      },
      "interactions": [
        {
          "description": "a request for new org",
          "request": {
            "admins": ["test@lenovo.com"],
            "country": "Romania",
            "customerNumber": "LenovoCustomerID",
            "description": "The description of the org",
            "name": "Test Post Org",
            "status": "pending",
            "type": "default"
          },
          "headers": {
            "Content-Type": "application/json",
            "x-username": "userid"
          },
          "method": "POST",
          "path": "/api/private_v1/organizations-management/organizations"
        }
      ],
      "metadata": {
        "pact-js": "12.4.0",
        "pactRust": "0.4.16",
        "models": "1.1.19",
        "pactSpecification": "2.0.0"
      },
      "provider": {
        "name": "organizations"
      }
    };
  }
  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  ngOnInit(): void {}
}


