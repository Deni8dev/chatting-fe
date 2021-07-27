import { Injectable } from '@angular/core'
import socketIO from 'socket.io-client'
import { environment } from '@env/environment'


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  private _socket: any

  constructor() { }

  public setupSocketIO(): void {
    this.socket = socketIO(environment.socket_endpoint)
  }

  set socket(socket: any) {
    this._socket = socket
  }

  get socket(): any {
    return this._socket
  }
}
