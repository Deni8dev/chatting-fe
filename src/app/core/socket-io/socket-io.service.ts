import { Injectable } from '@angular/core';
import * as socketIO from 'socket.io-client';
import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  private _socket: any;

  constructor() { }

  public setupSocketIO() {
    this.socket = socketIO(environment.SOCKET_ENDPOINT);
  }

  set socket(socket: any) {
    this._socket = socket;
  }

  get socket(): any {
    return this._socket;
  }
}
