import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from "./Components/register/register.component";
import { SigninComponent } from "./Components/signin/signin.component";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';  // تأكد من استيراد هذا
// import { AppComponent } from './app.component';

@Component({
  selector: 'app-root',
  imports: [RegisterComponent, SigninComponent] ,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';
}
