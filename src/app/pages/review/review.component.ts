import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MovieService} from '../../services/movie.service';
import {Movie} from '../../models/movie';
import {ShortNumberPipe} from '../../pipes/short-number.pipe';
import {BackButtonComponent} from '../../components/back-button/back-button.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    CommonModule,
    ShortNumberPipe,
    BackButtonComponent,
  ],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  movie: Movie | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovie(id).subscribe(movie => {
        this.movie = movie;
      });
    }
  }


}
