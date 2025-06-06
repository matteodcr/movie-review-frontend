import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmdbSearchBarComponent } from './tmdb-search-bar.component';

describe('TmdbSearchBarComponent', () => {
  let component: TmdbSearchBarComponent;
  let fixture: ComponentFixture<TmdbSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TmdbSearchBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TmdbSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
