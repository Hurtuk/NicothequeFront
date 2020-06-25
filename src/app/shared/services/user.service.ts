import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public adminLogged = new BehaviorSubject<boolean>(false);
  public currentUser = new ReplaySubject<User | null>(1);

  constructor(
    private http: HttpClient
  ) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://louiecinephile.fr/tempSeenMovies/api/getUsers.php');
  }
}
