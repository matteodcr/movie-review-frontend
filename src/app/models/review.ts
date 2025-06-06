export interface Review {
  id: string,
  comment: string,
  note: number,
}

export interface CreateReview {
  tmdbId: string,
  comment: string,
  note: number,
}
