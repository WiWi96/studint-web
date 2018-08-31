import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.less']
})
export class ErrorsComponent implements OnInit {
  @Input() code: number;
  sub: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route
      .data
      .subscribe(data => this.code = data.code);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getErrorStatus(): string {
    if (this.code >= 500) {
      return '5xx';
    }
    else if (this.code === 404) {
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
