import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MovieCardComponent} from '../movie-card/movie-card.component';
import {Movie} from '../../models/movie';
import {MovieService} from '../../services/movie.service';
import {Router, ActivatedRoute} from '@angular/router';
import {PageResponse} from '../../models/page';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {
  moviePage: PageResponse<Movie> | null = null;
  isLoading: boolean = false;
  isSearching: boolean = false;
  private currentPage: number = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.movieService.moviePage$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(m => {
      this.moviePage = m || null;
      if (m) {
        this.currentPage = m.number;
      }
    });
    this.movieService.isMovieLoading$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(loading => {
      this.isLoading = loading;
    });
    this.movieService.isSearching$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(loading => {
      this.isSearching = loading;
    });

  }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      const page = params['page'] ? parseInt(params['page'], 10) - 1 : 0;
      this.currentPage = Math.max(0, page);
      this.movieService.getMovies(this.currentPage);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      const newPage = this.currentPage - 1;
      this.navigateToPage(newPage);
    }
  }

  goToNextPage(): void {
    if (this.moviePage && this.currentPage < this.moviePage.totalPages - 1) {
      const newPage = this.currentPage + 1;
      this.navigateToPage(newPage);
    }
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 0 && this.moviePage && pageNumber < this.moviePage.totalPages) {
      this.navigateToPage(pageNumber);
    }
  }

  private navigateToPage(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {page: page + 1},
      queryParamsHandling: 'merge'
    });
  }

  get hasPrevious(): boolean {
    return this.moviePage ? this.moviePage.number > 0 : false;
  }

  get hasNext(): boolean {
    return this.moviePage ? this.moviePage.number < this.moviePage.totalPages - 1 : false;
  }

  get currentDisplayPage(): number {
    return this.currentPage + 1; // Pour l'affichage (commence à 1)
  }
}
