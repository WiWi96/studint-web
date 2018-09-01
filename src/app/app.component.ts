import { Component, OnInit, NgZone } from '@angular/core';
import { NotificationService } from '_service/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'app';
  notification: string;
  showNotification: boolean;

  constructor(
    private zone: NgZone,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.notificationService
      .notification$
      .subscribe(message => {
        this.zone.run(() => {
          this.notification = message;
          this.showNotification = true;
        });
      });
  }
}
