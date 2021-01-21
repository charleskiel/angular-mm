import { EventEmitter,Component, OnInit, Output} from '@angular/core';
import { io } from 'socket.io-client';
import {SocketioService} from './socketio.service';
import {Stock} from './stock/stock'
//import {SocketComponent} from './socket/socket.component'
import {Socket} from './socket/socket'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements  OnInit{
  stockList = [];
  title = 'Market Manager';
  name = '';
  page = 0;
  socket = new Socket;

  constructor(private socketService: SocketioService) {}
  
  ngOnInit() {
    //this.socketService.setupSocketConnection();
    console.log("Connecting")
    this.socket.connect()
    this.socket.event.on("test",() => {console.log("test Sucsess")})
    this.socket.event.on("data",data => this.onData(data))
  }

  onStockAdded(stock:Stock ) {
    this.stockList[stock.key] = stock;
  }

  onData(data : object) {
    console.log(data)
  }

  showPage(page: number) {
    this.page = page;
  }

  //setSelectedWatchlist : (list) => { console.log(`Setting Watchlist to ${list}`); this.setState({ selectedWatchlist: list }); console.log(this.state)},
  //setSelectedStock: (stock) => { console.log(`Setting Chart to ${stock}`); this.setState({ selectedStock: stock }) },
  //subscribe: (command, keys = [], dataTypes = []) => { this.sendMsg({"service": "SUB", "command" : command, "keys" :keys, "dataTypes": dataTypes })}, 
  //getWatchLists : () => { this.setState({ watchlists: Data.getWatchLists() })},
  //switchView : (page) => {this.setState({ showpage: page })},
  //setCommandkey : (key) => {
  //console.log(key);
  //this.setState((prevState) => { return {settings : {...prevState.settings,...{commandKey: key} }}})
  //this.ws.send(JSON.stringify({requests: [{service: "ADMIN",command: "SETCOMMANDKEY",commandKey: key,requestid: this.requestid()}]}))


}
