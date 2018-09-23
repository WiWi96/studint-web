import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorsService } from '../errors-service/errors.service';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.less']
})
export class ErrorsComponent implements OnInit {
  routeParams;
  data;
  error: number;
  private sub: any;

  constructor(
    private errorsService: ErrorsService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.sub = this.errorsService.update$.subscribe(
      error => {
        this.error = error;
      }
    )
    this.error = this.error || this.route.snapshot.data.error;
    if (!this.error) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getError(): void {

  }

  getErrorStatus(code: number): string {
    if (code >= 500 && code <= 511) {
      return '5xx';
    }
    else if (code === 404) {
      return '404';
    }
    else if (code === 401 || code === 403) {
      return '403';
    }
    else if (code === 418) {
      return '418';
    }
    else if (code >= 400) {
      return '4xx';
    }
  }
}
