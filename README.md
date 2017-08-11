# DigitalcybOrg Website Application
___

This Angular 4 application is the client component for access to digitalcyb.org services.

API URI's
Dev  : https://api.dev.digitalcyb.org/
Test : https://api.test.digitalcyb.org/
Prod : https://api.digitalcyb.org/


Run Gulp to build and publish the module

```bash

gulp publish

```

___

## Change Log

### 1.0

- Updated all packages to newest versions
- Updated HTTP to user Interceptor for Angular 4.3.0+

___

## How to Re-Create Project

```bash

# Install the Latest Version of Angular CLI
npm uninstall -g @angular/cli
npm cache clean
npm install -g @angular/cli@latest

# Create default Angular project using the CLI
ng new fa4-digitalcyb-org --routing --prefix fa4

# install material & cdk
cd fa4-digitalcyb-org
npm install --save @angular/material @angular/cdk

# verify create
ng serve -o

```

### Create Components

```bash
ng g component Home
ng g component NotFound
ng g component Content

```

### Configure Routing in app-routing.module.ts

```javascript

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';// <-- ADD
import { NotFoundComponent } from './not-found/not-found.component';    // <-- ADD
import { ContentComponent } from './content/content.component';    // <-- ADD

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent },
  { path: '/content', component: ContentComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

### Add Services to app.module.ts

```javascript

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './content/content.component';

import { Adal4Service, Adal4HTTPService } from 'adal-angular4';         // <-- ADD

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
//    Adal4Service,                                                       // <-- ADD
//    {                                                                   // <-- ADD
//      provide: Adal4HTTPService,                                        // <-- ADD
//     useFactory: Adal4HTTPService.factory,                             // <-- ADD
//     deps: [Http, Adal4Service]                                        // <-- ADD
    }                                                                   // <-- ADD
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }

```

### Intialize Services in app.component.ts

```javascript

import { Component } from '@angular/core';

import { Adal4Service } from 'adal-angular4';

const config: adal.Config = {                           // <-- ADD
    tenant: 'xxx.onmicrosoft.com',                      // <-- ADD
    clientId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'    // <-- ADD
}                                                       // <-- ADD

@Component({
  selector: 'fa4-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Welcome to digitalcyb.org';

  constructor(private service: Adal4Service) {      // <-- ADD
    this.service.init(config);                      // <-- ADD
  }                                                 // <-- ADD
}

```

### Implement Authentication Logic in home.component.ts

```javascript
import { Component, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';

// import { Adal4Service, Adal4HTTPService } from 'adal-angular4';

@Component({
  selector: 'fa4-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  // Inject the ADAL Services
//  constructor(private service: Adal4Service, private http: Adal4HTTPService) { }

  // Check authentication on component load
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

```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
