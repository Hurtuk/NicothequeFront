import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private static DEFAULT_VIEW = 2;
  private static VIEWS: any = { '/unset': 0, '/ignored': 1, '/tosee': 2, '/seen': 3 };

  public currentView = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Get the route and move to the desired panel
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.moveTo(val.url);
      }
    });
    // First shot
    this.moveTo(this.router.url);
  }

  // Move to the desired panel
  private moveTo(path: string | null | undefined) {
    this.currentView = path && typeof HomeComponent.VIEWS[path] != 'undefined' ? HomeComponent.VIEWS[path] : HomeComponent.DEFAULT_VIEW;
  }

}
