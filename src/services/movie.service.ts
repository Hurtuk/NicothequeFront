import { Injectable } from '@angular/core';
import { Types } from 'src/model/types.enum';
import { Movie } from 'src/model/movie';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient
  ) { }

  public getMovies(type: Types): Observable<Movie[]> {
    return this.http.get<Movie[]>('http://louiecinephile.fr/moviesServer/api/getTempMovieList.php');
  }
}
