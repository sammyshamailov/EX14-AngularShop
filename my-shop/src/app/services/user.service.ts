import { Injectable } from '@angular/core';
import Users from '../../assets/static/user.json';

interface User{
  Username: string;
  Password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = Users;

  constructor() { }
}
