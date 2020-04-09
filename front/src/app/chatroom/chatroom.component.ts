import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../chat.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, OnDestroy {

  messageSub: Subscription;
  whichRoomUserIsInSub: Subscription;
  // People who are in a particular room
  usersInRoomSub: Subscription;
  // scroll down when new message comes
  container: HTMLElement;

  messages = [];
  // in which room user is in
  whichRoom: string;
  // Users in given room. (back end sends array)
  usersInRoom: any;
  // ngModel in input field
  clearInputField: string = '';

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.getMessages();
    this.getRoomOfanUser();
    this.getUsersInRoom();
  }

  sendMessage(message) {
    this.chatService.sendMessageToServer(message.value.input);

    this.clearInputField = '';
    // this.scrollToBottom();
  }

  // Get messages that gets send
  getMessages() {
    this.messageSub = this.chatService.fetchUserMessages()
      .subscribe(data => {
        console.log(data);
        this.messages.push(data);
      })
  }


  /** Get the room where user is in
   * 
   */
  getRoomOfanUser() {
    this.whichRoomUserIsInSub = this.chatService.getUserRoom().subscribe(room => {
      // room has value room which is the name of the room
      console.log('logataa chat componentis huone missä hän on: ', room['room'])
      this.whichRoom = room['room'];
    })
  }

  /**
   * back end sends array that we loop through in the template
   */
  getUsersInRoom() {
    this.usersInRoomSub = this.chatService.getUsersInRoom().subscribe(users => {
      console.log('täs käyttäjät täs huonees: ', users);
      this.usersInRoom = users;
      console.log('täs logataan se lopullinen array: ', this.usersInRoom);
    })
  }


  scrollToBottom(): void {
    try {
      this.container = document.getElementById("messages");
      this.container.scrollTop = this.container.scrollHeight - this.container.clientHeight;
    } catch (err) { console.log(err) }
  }


  ngOnDestroy() {
    this.messageSub.unsubscribe();
    this.whichRoomUserIsInSub.unsubscribe();
    this.usersInRoomSub.unsubscribe();
  }


}
