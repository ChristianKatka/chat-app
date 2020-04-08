import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  socketAddress = socketIo('http://localhost:3000');


  // user input field value here
  userTypedMessage = 'user typed something';
  messages = [{ message: 'Katsoin taivaalle', user: 'Chris' }];


  constructor() { }

  ngOnInit(): void {
    this.socketCall();
    console.log(this.messages);
  }

  /**Input form
   * 
   * @param message message that user typed and sent 
   */
  sendMessage(message) {
    // Send message to server.
    this.socketAddress.emit('chatMessage', message.value.input);

  }


  socketCall() {

    // get message from server 
    this.socketAddress.on('message', message => {
      this.messages.push(message);
    })

    // Send message to server
    this.socketAddress.emit('chatMessage', this.userTypedMessage);















    // this.socketAddress.on('hello', (data) => console.log(data));

    // this.socketAddress.on('connections', function (data) {
    //   console.log(data);
    // });
    // this.socketAddress.on('users', function (data) {

    // });
    // this.socketAddress.on('update', function (data) {

    // });
    // this.socketAddress.on('win', function (data) {

    // });


  }

}
