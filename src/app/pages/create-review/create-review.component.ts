import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ReviewService} from '../../services/review.service';
import {MovieSelectionComponent} from '../../components/movie-selection/movie-selection.component';
import {Movie} from '../../models/movie';
import {NgClass, NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {BackButtonComponent} from '../../components/back-button/back-button.component';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  imports: [
    ReactiveFormsModule,
    MovieSelectionComponent,
    NgForOf,
    NgClass,
    BackButtonComponent
  ],
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit {
  reviewForm!: FormGroup;
  stars = [1, 2, 3, 4, 5];
  hoveredStar = 0;

  constructor(private fb: FormBuilder, private reviewService: ReviewService, private router: Router) {
  }


  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      tmdbId: ['', Validators.required],
      note: [null, [Validators.required, Validators.min(0), Validators.max(5)]],
      comment: ['']
    });
  }

  onMovieSelected(movie: Movie) {
    this.reviewForm.patchValue({tmdbId: movie.id});
  }

  setRating(rating: number): void {
    this.reviewForm.get('note')?.setValue(rating);
  }


  onSubmit() {
    if (this.reviewForm.valid) {
      this.reviewService.createReview(this.reviewForm.value).subscribe({
          next: () => this.router.navigateByUrl('/'),
          error: err => alert('Error sending review: ' + err.message)
        }
      )
    }
  }
}
