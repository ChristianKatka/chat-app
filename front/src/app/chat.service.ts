import { Injectable } from '@angular/core';

import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {


  socketAddress = socketIo('http://localhost:3000');


  constructor() { }






  /**
   * 
   * @param data Form = {username: user input, room: room}
   */
  joinRoom(data) {
    this.socketAddress.emit('joinRoom', data)
  }


  /**
    * 
    * @param message message that user typed and sent 
    */
  sendMessageToServer(message: any) {
    // Send message to server.
    this.socketAddress.emit('chatMessageSend', message);

  }



  observer
  fetchUserMessages(): Observable<any> {
    this.socketAddress.on('message', (res) => {
      this.observer.next(res);
    });
    return this.getSocketDataObservable();
  }
  getSocketDataObservable(): Observable<any> {
    return new Observable(observer => {
      this.observer = observer;
    });
  }

  /** Get the room where current user is in
   * 
   */
  getUserRoom() {
    let observable = new Observable(observer => {
      this.socketAddress.on('roomOfUser', (data) => {
        observer.next(data);
      });
      return () => {
        this.socketAddress.disconnect();
      };
    })
    return observable;
  }

  /** Get users in given room
   * 
   */
  getUsersInRoom() {
    let observable = new Observable(observer => {
      this.socketAddress.on('usersInRoom', (data) => {
        observer.next(data);
      });
      return () => {
        this.socketAddress.disconnect();
      };
    })
    return observable;
  }


  socketCall() {

    // get message from server 
    // this.socketAddress.on('message', message => {
    //   this.UserMessages.push(message);
    // })

    // this.socketAddress.on('ServerMessage', message => {
    //   this.serverInfoMessages.push(message);
    // })



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


}
