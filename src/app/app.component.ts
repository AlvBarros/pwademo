import { Component } from '@angular/core';
import { Item, ChatService } from './chat/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public name:string;
  public nameSet:number;
  public texto:string;
  public messages:any[];
  public dataURL: string = "ws://alvbarroscloud.mybluemix.net";
  public connection: WebSocket;
  constructor() { 
    this.connection = new WebSocket(this.dataURL);
    this.connection.onopen = () => { this.onopen() };
    this.connection.onerror = () => { this.onerror() };
    this.connection.onmessage = (message) => { this.onmessage(message); };
  }

  public onopen(): void {
    console.log('Connected successfully!');
  }

  public onerror(): void {
    console.log('Connection failed.');
  }

  public onmessage(message:MessageEvent) {
    var json;
    try {
      json = JSON.parse(message.data);
    } catch (e) {
      console.log('Invalid JSON: ', message.data);
      return;
    }

    if(json && json.type == 'msg'){
      if (!this.messages) this.messages = [];
      this.messages.push({
        autor: json.autor,
        texto: json.texto
      });
    }
  }

  public entrar(){
    this.nameSet = 1;
  }

  public enterChat(){
    
  }

  public sendMessage(){
    this.connection.send(JSON.stringify({
      autor: this.name,
      type: "msg",
      texto: this.texto
    }));
    this.texto = '';
  }

  public receiveMessage(autor:string, mensagem:string){
    console.log('message received');
  }

  ngOnInit(){
    this.name = "João";
    this.nameSet = 0;
  }

}
