import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// App Componenets
import { AppComponent } from './app.component';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
// Services
import { LoginService } from './login/login.service';
import { WikipediaService } from './wikipedia.service';
import { GiphyService } from './giphy.service';
import { HistoryService } from './history.service';
// Firebase
import { firebaseConfig } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
// Routing modules
import { AppRoutingModule } from './app-routing.module';
import {AuthGuard} from './login/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    SearchHistoryComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    FormsModule
  ],
  providers: [LoginService, AuthGuard, WikipediaService,
              GiphyService, HistoryService],
  bootstrap: [AppComponent]
})

export class AppModule {}
