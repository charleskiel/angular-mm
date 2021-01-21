import {EventEmitter} from 'events';


export class Stock {
	type: string
	key: string
	price: number
	bid: number
	ask: number
	
	event: EventEmitter

	constructor(type: string, key: string, price: number, bid: number, ask: number) {
		this.type = type
		this.key = key
		this.price = price
		this.bid = bid
		this.ask = ask
	}


}