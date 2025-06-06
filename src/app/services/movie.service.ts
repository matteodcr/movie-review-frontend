import {Injectable} from '@angular/core';
import {BehaviorSubject, from, map, Observable, switchMap} from 'rxjs';
import {Movie} from '../models/movie';
import {PageResponse} from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://127.0.0.1:8080';
  private imagePrefix = 'https://image.tmdb.org/t/p/w342';

  private moviePageSubject = new BehaviorSubject<PageResponse<Movie> | null>(null);
  moviePage$ = this.moviePageSubject.asObservable();

  private isMovieLoadingSubject = new BehaviorSubject<boolean>(false);
  isMovieLoading$ = this.isMovieLoadingSubject.asObservable();

  private isSearchingSubject = new BehaviorSubject<boolean>(false);
  isSearching$ = this.isSearchingSubject.asObservable();

  private tmdbMovieSubject = new BehaviorSubject<Movie[]>([]);
  tmdbMovies$ = this.tmdbMovieSubject.asObservable();

  private isTmdbMovieLoadingSubject = new BehaviorSubject<boolean>(false);
  isTmdbMovieLoading$ = this.isTmdbMovieLoadingSubject.asObservable();

  constructor() {
  }

  private transform(movies: Movie[]): Movie[] {
    return movies.map(movie => this.transformSingle(movie));
  }

  private transformSingle(movie: Movie): Movie {
    return {
      ...movie,
      posterPath: this.imagePrefix + movie.posterPath,
      logoPath: this.imagePrefix + movie.logoPath,
      backdropPath: this.imagePrefix + movie.backdropPath,
    };
  }

  getMovie(id: string): Observable<Movie> {
    return from(fetch(`${this.apiUrl}/movie/${id}`)).pipe(
      switchMap(res => res.json()),
      map(data => this.transformSingle(data))
    );
  }

  getMovies(page: number = 0): void {
    this.isMovieLoadingSubject.next(true);
    this.isSearchingSubject.next(false);
    fetch(`${this.apiUrl}/movie?page=${page}&size=12`)
      .then(res => res.json())
      .then((data: PageResponse<Movie>) => {
        const transformed = this.transform(data.content);
        this.moviePageSubject.next({...data, content: transformed});
      });
    this.isMovieLoadingSubject.next(false);
  }

  searchMovies(query: string, page: number = 0): void {
    if (!query.trim()) return;

    this.isSearchingSubject.next(true);
    this.isMovieLoadingSubject.next(false);
    fetch(`${this.apiUrl}/movie/search?page=${page}&size=20`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title: query}),
    })
      .then(res => res.json())
      .then((data: PageResponse<Movie>) => {
        const transformed = this.transform(data.content);
        this.moviePageSubject.next({...data, content: transformed});
      });
    this.isMovieLoadingSubject.next(false);
  }

  clearTmdbMovies(): void {
    this.tmdbMovieSubject.next([]);
    this.isTmdbMovieLoadingSubject.next(false);
  }

  searchTmdbMovies(query: string): void {
    this.isTmdbMovieLoading$
    if (!query.trim()) return;

    this.isTmdbMovieLoadingSubject.next(true);
    fetch(`${this.apiUrl}/movie/search/tmdb`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title: query}),
    })
      .then(res => res.json())
      .then(data => this.tmdbMovieSubject.next(this.transform(data)));
    this.isTmdbMovieLoadingSubject.next(false);
  }
}
