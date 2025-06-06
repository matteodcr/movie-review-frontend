import {Review} from './review';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  releaseDate: Date,
  runtime: number;
  revenue: number;
  budget: number;
  genre: string[];
  director: string;
  actors: string[];
  posterPath: string;
  logoPath: string;
  backdropPath: string;
  reviews: Review[];
}
