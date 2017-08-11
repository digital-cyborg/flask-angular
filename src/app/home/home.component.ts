import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fa4-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    // Inject authentication Services
  constructor(private service: Adal4Service, private http: Adal4HTTPService) { }

  // constructor() { }

  ngOnInit() {
  
    // Handle callback if this is a redirect from Azure
    this.service.handleWindowCallback();

    // Check if the user is authenticated. If not, call the login() method
    if (!this.service.userInfo.authenticated) {
      this.service.login();
    }

    // Log the user information to the console
    console.log('username ' + this.service.userInfo.username);

    console.log('authenticated: ' + this.service.userInfo.authenticated);

    console.log('name: ' + this.service.userInfo.profile.name);

    console.log('token: ' + this.service.userInfo.token);

    console.log(this.service.userInfo.profile);
  }

  // Logout Method
  public logout() {
    this.service.logOut();
  }


}
