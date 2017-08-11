import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Adal4Service } from 'adal-angular4';

const config: adal.Config = {
    tenant: 'xxx.onmicrosoft.com',
    clientId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
}

@Component({
  selector: 'fa4-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Welcome to digitalcyb.org';

  constructor(private service: Adal4Service) {
    this.service.init(config);
  }
}
