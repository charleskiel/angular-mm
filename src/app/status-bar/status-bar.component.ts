import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {

  @Input() socketStatus: number;
  constructor() { }

  ngOnInit(): void {
  }

  socketStatusString(): string {
    switch (this.socketStatus) {
      case 0:
        return "Closed";
      case 1:
        return "Connected";
      case 2:
        return "Disconnected";
      case 3:
        return "Reconnecting";
    }
  }
}
