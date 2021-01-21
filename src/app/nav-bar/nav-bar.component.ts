import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTab, MatTabChangeEvent } from '@angular/material/tabs';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
	@Output() showPage = new EventEmitter<number>();

	constructor() { }

	ngOnInit(): void {
	}

	onTabSelect(tab: MatTabChangeEvent) {
		this.showPage.emit(tab.index);


	}
}
