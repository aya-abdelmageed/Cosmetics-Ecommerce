import { CommonModule } from '@angular/common';
import { Component,EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reviews',
  imports: [FormsModule,CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  stars = [1, 2, 3, 4, 5];
  selectedRating = 0;
  comment = '';

  @Output() ratingSubmitted = new EventEmitter<{rating: number, comment: string}>();

  selectStar(rating: number): void {
    this.selectedRating = rating;
  }

  submitRating(): void {
    if (this.selectedRating > 0) {
      this.ratingSubmitted.emit({
        rating: this.selectedRating,
        comment: this.comment
      });
      // Reset after submission
      this.selectedRating = 0;
      this.comment = '';
    }
  }
}