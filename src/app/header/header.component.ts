import { Component, OnInit } from '@angular/core';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/model/user';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logoffIcon = faPowerOff;
  public currentUser: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(u => this.currentUser = u);
  }

  public toggleAdmin() {
    this.userService.adminLogged.next(!this.userService.adminLogged.value);
  }

}
