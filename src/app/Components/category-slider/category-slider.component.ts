import { Component, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-category-slider',
  imports: [FormsModule, CommonModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.css'
})
export class CategorySliderComponent {
  @Output() categorySelected = new EventEmitter<string[]>();
  @ViewChild('slider') slider!: ElementRef<HTMLElement>;
  activeCategory: string | null = null;

  scrollLeft() {
    this.slider.nativeElement.scrollBy({
      left: -300, // Adjust this value based on your slide width
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.slider.nativeElement.scrollBy({
      left: 300, // Adjust this value based on your slide width
      behavior: 'smooth'
    });
  }
  // Different images than navbar - these should be more prominent
  sliderCategories = [
    { name: 'Eyes', types: ['mascara', 'eyeshadow', 'eyeliner', 'eyebrow'], image: 'Images/eyes.jpg' },
    { name: 'Face', types: ['foundation', 'bronzer'], image: 'Images/face.jpg' },
    { name: 'Cheeks', types: ['blush'], image: 'Images/cheek.jpg' },
    { name: 'Lips', types: ['lip_liner', 'lipstick'], image: 'Images/lips.avif' },
    { name: 'Nails', types: ['nail_polish'], image: 'Images/nails.jpg' }
  ];

  selectCategory(types: string[], categoryName: string) {
    this.activeCategory = this.activeCategory === categoryName ? null : categoryName;
    this.categorySelected.emit(this.activeCategory ? types : []);
  }


}
