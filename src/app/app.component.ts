import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {MovieService} from './services/movie.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Cinémathèque Moderne';

  constructor(private router: Router) {
  }

  goHome() {
    this.router.navigate(['/']);
  }

  onConnect() {
    console.log('Bouton Connecter cliqué');
    // ici tu peux ajouter ta logique de connexion
  }
}
