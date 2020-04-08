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
