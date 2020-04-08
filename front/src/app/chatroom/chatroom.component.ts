import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { FormGroup, FormGroupDirective } from '@angular/forms';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  // scroll down when new message comes
  container: HTMLElement;

  socketAddress = socketIo('http://localhost:3000');

  serverInfoMessages = [];
  UserMessages = [];

  clearInputField: string = '';

  constructor() { }

  ngOnInit(): void {
    this.socketCall();
    console.log(this.UserMessages);
  }


  /**Input form
   * 
   * @param message message that user typed and sent 
   */
  sendMessage(message: any) {
    // Send message to server.
    this.socketAddress.emit('chatMessageSend', message.value.input);
    this.clearInputField = '';
    // this.scrollToBottom();
  }


  socketCall() {

    // get message from server 
    this.socketAddress.on('message', message => {
      this.UserMessages.push(message);
    })

    this.socketAddress.on('ServerMessage', message => {
      this.serverInfoMessages.push(message);
    })



    // Send message to server
    // this.socketAddress.emit('chatMessage', this.userTypedMessage);



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



  scrollToBottom(): void {
    try {
      this.container = document.getElementById("messages");
      this.container.scrollTop = this.container.scrollHeight - this.container.clientHeight;
    } catch (err) { console.log(err) }
  }





}
