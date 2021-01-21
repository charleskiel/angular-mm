import {Component, Input, OnInit} from '@angular/core';
import {Stock} from '../stock/stock'

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  @Input() stock: Stock

  constructor( ) { }

  ngOnInit(): void {
  }

}
