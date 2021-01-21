import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Socket} from './socket'

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.scss']
})
export class SocketComponent implements OnInit {
  //@Input() socket: socket
	socket;
	@Output() event = new EventEmitter<string>();
	@Output() status = new EventEmitter<string>();
	rid = 0
	requestid = () => { this.rid += 1; return this.rid; }

	constructor( ) { }

	ngOnInit(): void {
		this.socket = new WebSocket("ws://192.168.1.102:7999");
		this.socket.onopen = (event) => {
			console.log("Connected to Server");
			//this.functions.getWatchLists();
			let login = JSON.stringify({
				service: "ADMIN",
				command: "LOGIN",
				requestid: this.requestid(),
				username: "demo",
				password: "password",
			});
			this.event.emit("test")
			this.socket.send(login);
			//this.functions.subscribe("STATS")
			this.socket.onmessage = (event) => {this.msgRec(JSON.parse(event.data))};
			this.socket.onclose = (event) => {setTimeout(this.connect, 2000);console.log("Disconnected ", event)};
		}
	}

	connect(): void {
	}

	msgRec(msg): void {
		this.event.emit("test")
	}
}
