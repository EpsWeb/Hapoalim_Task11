import {Pipe, PipeTransform} from '@angular/core';
import {UserService} from "../../../../shared/services/user.service";

@Pipe({
  name: 'userNameById'
})
export class UserNameByIdPipe implements PipeTransform {

  constructor(private userService: UserService) {
  }

  transform(userId: number): string | null | undefined {
    return this.userService.getAllUsers().find(user => user.id === userId)?.displayName;
  }

}
