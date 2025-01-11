import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiMovieResponse, MovieResult } from './interfaces';
import { API_CONFIG } from 'api.config';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getTopRatedMovies(page = 1): Observable<ApiMovieResponse> {
    return this.http
      .get<ApiMovieResponse>(
        `${API_CONFIG.BASE_URL}/movie/popular?page=${page}&api_key=${API_CONFIG.API_KEY}`
      )
      .pipe(delay(500));
  }

  getMovieDetails(id: string): Observable<MovieResult> {
    return this.http.get<MovieResult>(
      `${API_CONFIG.BASE_URL}/movie/${id}?api_key=${API_CONFIG.API_KEY}`
    );
  }
  searchMovies(query: string, page = 1) {
    return this.http.get<any>(
      `${API_CONFIG.BASE_URL}/search/movie?api_key=${
        API_CONFIG.API_KEY
      }&query=${encodeURIComponent(query)}&page=${page}`
    );
  }
}
