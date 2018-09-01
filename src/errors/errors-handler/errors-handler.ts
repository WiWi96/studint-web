import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '_service/notification/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorsService } from '../errors-service/errors.service';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
    constructor(
        private errorsService: ErrorsService,
        private injector: Injector,
        private zone: NgZone
    ) { }

    handleError(error: Error | HttpErrorResponse) {
        const router = this.injector.get(Router);
        const notificationService = this.injector.get(NotificationService);
        if (error instanceof HttpErrorResponse) {
            if (!navigator.onLine) {
                return notificationService.notify('We detected no Internet connection');
            } else {
                if (error.status === 401) {
                    return router.navigate(['/login']);
                }
                else {
                    this.errorsService.updateError(error.status);
                    this.zone.run(() => {
                        return router.navigate(['/error']);
                    });
                }
            }
        } else {
            return notificationService.notify(error.message);
        }
    }
}