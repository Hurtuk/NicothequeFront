import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Types } from 'src/model/types.enum';
import { MovieService } from '../shared/services/movie.service';
import { Movie } from 'src/model/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public Types = Types;

  private static DEFAULT_VIEW = 2;
  private static VIEWS: any = { '/unset': 0, '/ignored': 1, '/tosee': 2, '/seen': 3 };

  public currentView = 0;

  public movies = new Map<Types, Movie[]>();

  constructor(
    private router: Router,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    // Load movies
    this.reload(Types.UNSET);
    this.reload(Types.IGNORED);
    this.reload(Types.TOSEE);
    this.reload(Types.SEEN);

    // Get the route and move to the desired panel
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.moveTo(val.url);
      }
    });
    // First shot
    this.moveTo(this.router.url);
  }

  public moveMovieTo(event: { idMovie: number, newType: Types }) {
    this.movieService.moveMovieTo(event.idMovie, event.newType).subscribe(() => {
      this.reload(event.newType);
    });
  }

  private reload(type: Types) {
    this.movieService.getMovies(type).subscribe((m: Movie[]) => this.movies.set(type, m));
  }

  // Move to the desired panel
  private moveTo(path: string | null | undefined) {
    this.currentView = path && typeof HomeComponent.VIEWS[path] != 'undefined' ? HomeComponent.VIEWS[path] : HomeComponent.DEFAULT_VIEW;
  }

}
