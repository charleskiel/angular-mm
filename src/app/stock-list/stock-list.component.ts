import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Stock} from '../stock/stock'
@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  @Output()  stockCreated = new EventEmitter<Stock>();

  constructor() { }

  ngOnInit(): void {
  }

  addStock(){
    this.stockCreated.emit(new Stock("stock",'AMD',0,0,0));
  }
}
