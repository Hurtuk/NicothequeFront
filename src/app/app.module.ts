import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MoviesComponent } from './movies/movies.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LengthPipe } from './shared/pipes/length.pipe';
import { OverviewPipe } from './shared/pipes/overview.pipe';
import { NbspPipe } from './shared/pipes/nbsp.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    MoviesComponent,
    LoginComponent,
    HomeComponent,
    LengthPipe,
    OverviewPipe,
    NbspPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
