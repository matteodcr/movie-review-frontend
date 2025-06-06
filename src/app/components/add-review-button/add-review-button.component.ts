import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-review-button',
  templateUrl: './add-review-button.component.html',
  styleUrls: ['./add-review-button.component.scss']
})
export class AddReviewButtonComponent {
  @Output() addReview = new EventEmitter<void>();

  onClick() {
    this.addReview.emit();
  }
}
