import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  InfiniteScrollCustomEvent,
  IonList,
  IonItem,
  IonSkeletonText,
  IonAvatar,
  IonAlert,
  IonLabel,
  IonBadge,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { MovieService } from '../service/movie.service';
import { catchError, finalize } from 'rxjs';
import { MovieResult } from '../service/interfaces';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    DatePipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonSkeletonText,
    IonAvatar,
    IonLabel,
    RouterModule,
    IonBadge,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
})
export class HomePage implements OnInit {
  public currentPage: number = 1;
  public error = null;
  public isMovieLoading: boolean = false;
  public movies: MovieResult[] = [];
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public mockDummyData = new Array(10);

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }
  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.error = null;
    if (!event) {
      this.isMovieLoading = true;
    }
    this.movieService
      .getTopRatedMovies(this.currentPage)
      .pipe(
        finalize(() => {
          this.isMovieLoading = false;
          if (event) {
            event.target.complete();
          }
        }),
        catchError((error: any) => {
          console.log(error);
          this.error = error.error.status_message;
          return [];
        })
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.movies.push(...data.results);
          if (event) {
            event.target.disabled = data.total_pages === this.currentPage;
          }
        },
      });
  }
  loadMoreMovies(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }
}
