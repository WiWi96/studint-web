import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.less']
})
export class ErrorPageComponent implements OnInit {
  @Input() code: number;

  constructor() { }

  ngOnInit() {
  }

  getErrorStatus(): string {
    if (this.code >= 500) {
      return '5xx';
    }
    else if (this.code === 404 || !this.code) {
      return '404';
    }
    else if (this.code === 401 || this.code === 403) {
      return '403';
    }
    else if (this.code === 418) {
      return '418';
    }
    else if (this.code >= 400) {
      return '4xx';
    }
    return 'default';
  }
}
