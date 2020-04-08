import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  rooms = [
    {value: 'room-1', viewValue: 'Room 1'},
    {value: 'room-2', viewValue: 'Room 2'},
    {value: 'room-3', viewValue: 'Room 3'}
  ];

  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit(): void {
  }


/**
 * 
 * @param f Form = {username: user input, room: room}
 */
  joinRoom(f) {
    console.log(f.value);
    this.chatService.joingRoom(f.value);

    this.router.navigate(['/chat']);
  }

}
