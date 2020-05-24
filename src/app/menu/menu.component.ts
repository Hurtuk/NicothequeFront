import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/services/movie.service';
import { Types } from 'src/model/types.enum';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public ignoredCount: number;
  public unsetCount: number;
  public toseeCount: number;
  public seenCount: number;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.counts?.get(Types.IGNORED)?.subscribe(v => this.ignoredCount = v);
    this.movieService.counts?.get(Types.UNSET)?.subscribe(v => this.unsetCount = v);
    this.movieService.counts?.get(Types.TOSEE)?.subscribe(v => this.toseeCount = v);
    this.movieService.counts?.get(Types.SEEN)?.subscribe(v => this.seenCount = v);
  }

}
