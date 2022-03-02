import {Component} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {take} from "rxjs";
import {allUsers} from "../../data/users";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  allUsers = allUsers;
  userControl = new FormControl(null, [Validators.required]);

  constructor(private userService: UserService, private router: Router) {
  }

  enter() {
    this.userService.setUser(this.userControl.value)
      .pipe(take(1))
      .subscribe((user: User | undefined) => {
        this.router.navigate(['/system', 'comments']);
      })
  }

}



