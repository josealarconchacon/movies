import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiMovieResponse, MovieResult } from './interfaces';
import { delay, Observable } from 'rxjs';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getTopRatedMovies(page = 1): Observable<ApiMovieResponse> {
    return this.http
      .get<ApiMovieResponse>(
        `${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`
      )
      .pipe(delay(1000));
  }

  getMovieDetails(id: string): Observable<MovieResult> {
    return this.http.get<MovieResult>(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    );
  }
}
