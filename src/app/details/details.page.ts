import {
  Component,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonText,
  IonCardContent,
  IonLabel,
  IonIcon,
  IonItem,
} from '@ionic/angular/standalone';
import { MovieService } from '../service/movie.service';
import { MovieResult } from '../service/interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonCardContent,
    IonText,
    IonCard,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonBackButton,
    IonCardSubtitle,
    IonCardContent,
  ],
})
export class DetailsPage implements OnInit {
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public movie: WritableSignal<MovieResult | null> = signal(null);

  @Input()
  set id(movieID: string) {
    this.movieService.getMovieDetails(movieID).subscribe((movie) => {
      console.log(movie);
      this.movie.set(movie);
    });
  }

  constructor(private movieService: MovieService) {}

  ngOnInit() {}
}
