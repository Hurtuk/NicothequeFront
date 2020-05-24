import { Injectable } from '@angular/core';
import { Types } from 'src/model/types.enum';
import { Movie } from 'src/model/movie';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  public counts = new Map<Types, BehaviorSubject<number>>();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  }

  constructor(
    private http: HttpClient
  ) {
    this.counts.set(Types.IGNORED, new BehaviorSubject<number>(0));
    this.counts.set(Types.UNSET, new BehaviorSubject<number>(0));
    this.counts.set(Types.TOSEE, new BehaviorSubject<number>(0));
    this.counts.set(Types.SEEN, new BehaviorSubject<number>(0));
  }

  public getMovies(type: Types): Observable<Movie[]> {
    return this.http.get<Movie[]>('http://louiecinephile.fr/tempSeenMovies/api/getMovies.php?user=1&state=' + Types[type])
            .pipe(
              tap(movies => {
                this.counts.get(type)?.next(movies.length)
              })
            );
  }

  public moveMovieTo(idMovie: number, idUser: number, type: Types): Observable<Object> {
    return this.http.post('http://louiecinephile.fr/tempSeenMovies/api/moveMovie.php',
            {
              movie: idMovie,
              user: idUser,
              state: Types[type]
            }, this.httpOptions);
  }
}
