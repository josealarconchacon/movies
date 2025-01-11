import { Component, OnInit, ViewChild } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  InfiniteScrollCustomEvent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonIcon,
  IonChip,
  IonButton,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { MovieService } from '../service/movie.service';
import {
  catchError,
  finalize,
  Subject,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { MovieResult } from '../service/interfaces';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    IonContent,
    RouterModule,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonIcon,
    IonChip,
    IonButton,
    IonSearchbar,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  public currentPage: number = 1;
  public error = null;
  public isMovieLoading: boolean = false;
  public movies: MovieResult[] = [];
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public mockDummyData = new Array(10);
  public searchTerm: string = '';
  private searchSubject = new Subject<string>();

  swiperModules = ['navigation', 'pagination'];
  swiperConfig = {
    slidesPerView: 'auto',
    spaceBetween: 20,
    freeMode: true,
    navigation: true,
  };

  constructor(private movieService: MovieService) {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.performSearch(searchTerm);
      });
  }

  ngOnInit() {
    this.loadMovies();
  }

  searchMovies() {
    this.searchSubject.next(this.searchTerm);
  }

  performSearch(searchTerm: string) {
    if (!searchTerm.trim()) {
      this.loadMovies();
      return;
    }

    this.isMovieLoading = true;
    this.movies = [];
    this.currentPage = 1;

    this.movieService
      .searchMovies(searchTerm, this.currentPage)
      .pipe(
        finalize(() => {
          this.isMovieLoading = false;
        }),
        catchError((error: any) => {
          this.error = error.error.status_message;
          return [];
        })
      )
      .subscribe({
        next: (data) => {
          this.movies = data.results;
        },
      });
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
    if (this.searchTerm.trim()) {
      this.performSearch(this.searchTerm);
    } else {
      this.loadMovies(event);
    }
  }
}
