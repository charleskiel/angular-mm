import {EventEmitter2} from "eventemitter2"

export class Socket{
	ws : WebSocket;
	event =  new EventEmitter2()
	tickcount = 0;
	tickbuffer = {};
	ticktimestamp = Date.now();
	activesBuffer = {};
	msgRxBuffer = [];
	sessionid	
	rid = 0;
	status = SocketStatus.Closed

	requestid = () => { this.rid += 1; return this.rid; }
	
	connect = () => {
		this.ws = new WebSocket("ws://192.168.1.102:7999");
		this.ws.onopen = (event) => {
			console.log("Connected to Server");
			//this.functions.getWatchLists();
			let login = JSON.stringify({
				service: "ADMIN",
				command: "LOGIN",
				requestid: this.requestid(),
				username: "demo",
				password: "password",
			});

			this.status = SocketStatus.Connected;

			this.event.emit("test")
			this.ws.send(login);
			//this.functions.subscribe("STATS")
			this.ws.onmessage = (event) => {this.msgRec(JSON.parse(event.data))};
			this.ws.onclose = (event) => {setTimeout(this.connect, 2000);console.log("Disconnected ", event)};
		}
		this.ws.onerror = (event) => { console.log("Error ", event); setTimeout(this.connect, 2000) };
		this.ws.close = (event) => { console.log("Error ", event); this.status = SocketStatus.Reconnecting; setTimeout(this.connect, 2000) };

		setInterval(this.sendMsgBuffer, 200);
		setInterval(this.updateRxBuffer, 200);
		setInterval(this.getStatus, 2000);

	}
	getStatus = () => {
		
	}
	msgRec = (msg) => {
		this.event.emit("data",msg)
		//console.log(msg)

		if (msg.notify) {
			//this.setState({ heartbeat: msg.notify[0].heartbeat });
		}

		if (msg.content) {
			//console.log(m);
			switch (msg.service) {
				case "CHART_EQUITY":
					msg.content.forEach((eq) => {
						if (this.ticktimestamp >= Date.now() - 1000) {
							//this.setState({ pps: (this.tickcount / (Date.now() - this.ticktimestamp)) * 1000 });
							this.ticktimestamp = Date.now();
							this.tickcount = 0;
						}
						//if (this.tickbuffer[eq.key]) this.tickbuffer[eq.key] = { ...this.tickbuffer[eq.key], spark: [...this.state[eq.key].spark, eq] };
						this.tickcount += 1;
					});
					break;
				case "QUOTE":
					//console.log(m)
					msg.content.forEach((eq) => {
						this.tickbuffer[eq.key] = { ...this.tickbuffer[eq.key], ...eq };
						this.tickcount += 1;
					});

					break;
				case "TIMESALE_FUTURES":
					break;
				case "ACTIVES_NASDAQ":
				case "ACTIVES_NYSE":
				case "ACTIVES_OPTIONS":
				case "ACTIVES_OTCBB":
					msg.content.forEach((eq) => {this.activesBuffer[eq.key] = { ...this.activesBuffer[eq.key]}});
					break;
				case "ADMIN":
					switch(msg.type){}
					break;
				default:
					break;
				//console.log(m);
			}
		}

		if (msg.response) {
			msg.response.forEach((m) => {
				console.log(m)
				switch (m.service) {
					case "ADMIN":
						switch (m.command){
							case "SETTING":
								//this.setState((prevState) => {return {settings : {...prevState.settings, ...m.setting} }})				
								break;
							case "LOGIN":
								if (m.content === "OK") { console.log(`Login Sucuess!`, m.sessionid); this.sessionid = m.sessionid;}
								else { console.log(`LOGIN FAILED!!`, msg.content.code, msg.content.msg); }
								break;
							default:
								break;
						}
						break;
					case "SERVICE":
						console.log(msg);
						switch (m.command){
							case "SETTING":
								//this.setState((prevState) => {return {settings : {...prevState.settings, ...m.setting} }})				
								break;
							case "SUB":
								break;
							default:
								break;
						}
						break;
					default:
						console.log(`Default Message`, msg);
						break;
				}
			});
		}
	};

	msgTxBuffer = []
	sendMsg = (c) => {
		this.msgTxBuffer.push(c)
	};
	
	sendMsgBuffer = () => {
		// console.log(this.msgTxBuffer)
		// console.log(this.ws.readyState === 1)
		if (this.ws.readyState === 1 && this.msgTxBuffer.length > 0 && this.sessionid > 0) {
			this.ws.send(JSON.stringify(this.msgTxBuffer.shift()));
		}
	}


	// toHHMMSS = (time) => {
	// 	var sec_num = parseInt(time, 10); // don't forget the second param
	// 	var hours = Math.floor(sec_num / 3600);
	// 	var minutes = Math.floor((sec_num - hours * 3600) / 60);
	// 	var seconds = sec_num - hours * 3600 - minutes * 60;
	// 	if (hours < 10) {hours = "0" + hours;}
	// 	if (minutes < 10) {minutes = "0" + minutes;}
	// 	if (seconds < 10) {seconds = "0" + seconds;}
	// 	return hours + ":" + minutes + ":" + seconds;
	// };


	updateRxBuffer = () => {
		let excTime = Date.now();
		let buffer = {subStocks: this.tickbuffer,actives : this.activesBuffer}
		this.tickbuffer = {};
		this.activesBuffer = {}

		//this.setState((prevState) => {return { ...prevState, ...buffer }});
		//this.setState((prevState) => {return { ...prevState, ...this.tickbuffer }});
		//console.log(Date.now() - excTime,"ms");
	};



}

enum SocketStatus  {
	Closed,
	Connected,
	Disconnected,
	Reconnecting
}
