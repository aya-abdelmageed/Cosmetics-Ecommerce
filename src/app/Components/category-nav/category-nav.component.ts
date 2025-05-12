import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorynav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-nav.component.html',
  styleUrls: ['./category-nav.component.css']
})
export class CategoryNavComponent {  // Fixed to PascalCase
  @Output() categorySelected = new EventEmitter<string[]>();
  @Input() initialCategories: string[] = [];
activeCategory: string | null = null; // Track active category
  categories = [
    { name: 'All', types: [], image: 'Images/All.webp' },
    { name: 'Eyes', types: ['mascara', 'eyeshadow', 'eyeliner', 'eyebrow'], image: 'Images/eyes.jpg'  },
    { name: 'Face', types: ['foundation', 'bronzer'], image: 'Images/face.jpg' },
    { name: 'Cheeks', types: ['blush'], image: 'Images/cheek.jpg' },
    { name: 'Lips', types: ['lip_liner', 'lipstick'], image: 'Images/lips.avif'  },
    { name: 'Nails', types: ['nail_polish'], image: 'Images/nails.jpg'  }
  ];
  ngOnInit() {
    if (this.initialCategories.length > 0) {
      const matchingCategory = this.categories.find(cat => 
        cat.types.join() === this.initialCategories.join()
      );
      if (matchingCategory) {
        this.activeCategory = matchingCategory.name;
        console.log(this.activeCategory)
      }
    }
  }
  navigateToCategory(categoryTypes: string[], categoryName: string) {
    this.activeCategory = this.activeCategory === categoryName ? null : categoryName;
    this.categorySelected.emit(this.activeCategory ? categoryTypes : []);
    console.log(this.activeCategory)
  }
}
