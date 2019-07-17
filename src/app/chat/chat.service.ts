import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export interface Item{
  name: string;
  description: string;
  url: string;
  html: string;
  markdown: string;
}

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private dataURL: string = "ws://localhost:3000";
  private connection: WebSocket;
  constructor() { 
    this.connection = new WebSocket(this.dataURL);

    this.connection.onopen = this.onopen;
    this.connection.onerror = this.onerror;

    this.connection.onmessage = this.onmessage;
  }

  private onopen(): void {
    console.log('Connected successfully!');
  }

  private onerror(): void {
    console.log('Connection failed.');
  }

  private onmessage(message:MessageEvent) {
    try {
      var json = JSON.parse(message.data);
      console.log('JSON received: ');
      console.log(json);
    } catch (e) {
      console.log('Invalid JSON: ', message.data);
      return;
    }
  }

  sendMessage(message:string): void{
    // sends message
  }
}
