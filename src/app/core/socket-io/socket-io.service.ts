import { Injectable } from '@angular/core';
import * as socketIO from 'socket.io-client';
import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  private _socket: any;

  constructor() { }

  setupSocketConnection() {
    this._socket = socketIO(environment.SOCKET_ENDPOINT);
    setInterval(() =>
        this._socket.emit('messageFromFrontend', '[From: Frontend] - Hello, This message appear instantly.'),
      2000
    );
  }

  get socket(): any {
    return this._socket;
  }
}
