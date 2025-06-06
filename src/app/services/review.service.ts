import { Injectable } from '@angular/core';
import {CreateReview, Review} from '../models/review';
import {from, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://127.0.0.1:8080';


  constructor() {}

  createReview(review: CreateReview): Observable<void> {
    const createReviewPromise = fetch(`${this.apiUrl}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    }).then(() => {});
    return from(createReviewPromise);
  }
}
