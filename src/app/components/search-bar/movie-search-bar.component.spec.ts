import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSearchBarComponent } from './movie-search-bar.component';

describe('SearchBarComponent', () => {
  let component: MovieSearchBarComponent;
  let fixture: ComponentFixture<MovieSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieSearchBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
