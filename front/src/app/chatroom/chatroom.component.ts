import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  sub: Subscription;

  // scroll down when new message comes
  container: HTMLElement;

  messages = [];

  // ngModel in input field
  clearInputField: string = '';

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    console.log(this.messages);
    this.getMessages();
  }

  sendMessage(message) {
    this.chatService.sendMessageToServer(message.value.input);

    this.clearInputField = '';
    // this.scrollToBottom();
  }

  // Get messages that gets send
  getMessages() {
    this.sub = this.chatService.fetchUserMessages()
      .subscribe(data => {
        console.log(data);
        this.messages.push(data);
    })
  }







  scrollToBottom(): void {
    try {
      this.container = document.getElementById("messages");
      this.container.scrollTop = this.container.scrollHeight - this.container.clientHeight;
    } catch (err) { console.log(err) }
  }





}
