import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { FormGroup, FormGroupDirective } from '@angular/forms';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  socketAddress = socketIo('http://localhost:3000');

  // user input field value here
  userTypedMessage = 'user typed something';
  messages = [{ message: 'Katsoin taivaalle', user: 'Chris' },{ message: 'Katsoin taivaalle', user: 'Chris' },{ message: 'Katsoin taivaalle', user: 'Chris' },];

  clearInputField: string = '';

  constructor() { }

  ngOnInit(): void {
    this.socketCall();
    console.log(this.messages);
  }

  /**Input form
   * 
   * @param message message that user typed and sent 
   */
  sendMessage(message: any) {

    // Send message to server.
    console.log('console logaus frontissa:', message.value.input);
    this.socketAddress.emit('chatMessage', message.value.input);
    this.clearInputField = '';
  

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
