import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from "./Components/footer/footer.component";
import { CategorySliderComponent } from "./Components/category-slider/category-slider.component";
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterModule, HeaderComponent, FooterComponent,CategorySliderComponent] ,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';
  
}
