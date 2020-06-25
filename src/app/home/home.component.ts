import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Types } from 'src/model/types.enum';
import { MovieService } from '../shared/services/movie.service';
import { Movie } from 'src/model/movie';
import { UserService } from '../shared/services/user.service';
import { User } from 'src/model/user';

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

  public users: User[];
  public currentUser: User | null;

  public movies = new Map<Types, Movie[]>();

  constructor(
    private router: Router,
    private movieService: MovieService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(u => {
      this.currentUser = u;
      if (this.currentUser) {
        this.loadCurrentUser();
      }
    });
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      if (this.users.length === 1) {
        this.userService.currentUser.next(this.users[0]);
      }
    });
  }

  private loadCurrentUser() {
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

  public moveMovieTo(event: { idMovie: number, newType: Types }, oldType: Types) {
    if (this.currentUser) {
      this.movieService.moveMovieTo(event.idMovie, this.currentUser.id, event.newType).subscribe(() => { // TODO variable userId
        this.reload(event.newType);

        let lastValue = this.movieService.counts.get(oldType)?.value;
        this.movieService.counts.get(oldType)?.next(lastValue ? lastValue - 1 : 0);
        lastValue = this.movieService.counts.get(event.newType)?.value;
        this.movieService.counts.get(event.newType)?.next(lastValue ? lastValue + 1 : 0);
      });
    }
  }

  private reload(type: Types) {
    if (this.currentUser) {
      this.movieService.getMovies(type, this.currentUser).subscribe((m: Movie[]) => this.movies.set(type, m));
    }
  }

  // Move to the desired panel
  private moveTo(path: string | null | undefined) {
    this.currentView = path && typeof HomeComponent.VIEWS[path] != 'undefined' ? HomeComponent.VIEWS[path] : HomeComponent.DEFAULT_VIEW;
  }

}
