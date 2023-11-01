import { Injectable } from '@angular/core';

import {io, Socket} from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket | any;
  isSocketConnect = false;

  constructor() { }

  startWebSocket(url: string, config: {}) {
    if (this.isSocketConnect) {
      return;
    }

    this.socket = io(url);

    this.socket.on('connect', () => {
      this.isSocketConnect = true;
      console.log('socket connected');
    });

    this.socket.on( 'disconnect', () => {
      // this.endWebSocket();
      // window.setTimeout(this.startWebSocket, 5000);
    });
  }

  endWebSocket() {
    this.socket?.disconnect();
    this.isSocketConnect = false;
  }

  authenticateSocket() {
    const token = localStorage.getItem('token')

    if (this.isSocketConnect) {
      if (token) {
        this.socket.emit('authenticate', token);
      }
    } else {
      this.socket.on('connect', () => {
        this.socket.emit('authenticate',  token);
      });
    }
  }

  join(room: string) {
    this.emit('join', {room: room});
  }

  leave(room: string) {
    this.emit('leave', {room: room});
  }

  listen(key: string, callback: any) {
    this.socket.on(key, callback);
  }

  emit(key: string, data: any) {
    this.socket.emit(key, data);
  }

  removeAllListeners(key: string) {
    this.socket.removeAllListeners(key);
  }
}
