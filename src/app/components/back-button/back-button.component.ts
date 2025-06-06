import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieService} from '../../services/movie.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-back-button',
  imports: [],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss'
})
export class BackButtonComponent {

  @Input() name: string = 'Accueil';
  @Input() link: string = '/';

  constructor(
    private router: Router,
  ) {
  }

  goBack(): void {
    this.router.navigate([this.link]);
  }
}
