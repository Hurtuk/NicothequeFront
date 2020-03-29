import { Component, OnInit, Input } from '@angular/core';
import { faQuestion, faTrashAlt, faHistory, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss',
              './movies.alt.component.scss',
              './movies.medium.component.scss']
})
export class MoviesComponent implements OnInit {

  @Input() public titleLabel: string;
  @Input() public minimal: boolean;

  // Icons
  unsetIcon = faQuestion;
  ignoredIcon = faTrashAlt;
  toseeIcon = faHistory;
  seenIcon = faCheck;

  public selectedId: number;

  constructor() { }

  ngOnInit(): void {
    this.selectedId = 12;
  }

}
