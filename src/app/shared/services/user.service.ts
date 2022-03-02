import {Injectable} from '@angular/core';
import {User} from "../models";
import {allUsers} from "../../data/users";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users = allUsers;

  private user: User | undefined;

  getUser() {
    return this.user;
  }

  setUser(userId: number): Observable<User | undefined> {
    this.user = this.users.find(user => user.id === userId);
    return of(this.user);
  }

  removeUser() {
    this.user = undefined;
  }

  getAllUsers(): User[] {
    return allUsers;
  }

}
