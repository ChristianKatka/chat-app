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
    {value: 'Room-1'},
    {value: 'Room-2'},
    {value: 'Room-3'}
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
    this.chatService.joinRoom(f.value);

    this.router.navigate(['/chat']);
  }

}
