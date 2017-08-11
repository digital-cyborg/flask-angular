import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContentComponent } from './content/content.component';

import { Adal4Service, Adal4HTTPService } from 'adal-angular4';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
       Adal4Service,                                                       // <-- ADD
   {                                                                   // <-- ADD
     provide: Adal4HTTPService,                                        // <-- ADD
    useFactory: Adal4HTTPService.factory,                             // <-- ADD
    deps: [Http, Adal4Service]                                        // <-- ADD
   }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
