import { Component, OnInit, Input } from '@angular/core';
import { faQuestion, faTrashAlt, faHistory, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss',
              './movies.medium.component.scss']
})
export class MoviesComponent implements OnInit {

  @Input() public titleLabel: string;

  // Icons
  unsetIcon = faQuestion;
  ignoredIcon = faTrashAlt;
  toseeIcon = faHistory;
  seenIcon = faCheck;

  constructor() { }

  ngOnInit(): void {
  }

}
