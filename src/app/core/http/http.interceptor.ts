import { Inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, take, throwError } from 'rxjs';
import { CustomError, SafeAny } from '../classes';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(
    @Inject(TuiAlertService) private readonly _alertService: TuiAlertService
  ) {}

  intercept(
    request: HttpRequest<SafeAny>,
    next: HttpHandler
  ): Observable<HttpEvent<SafeAny>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const msg =
          error && error.message
            ? error.message
            : 'Server response error, try again.';
        console.log(error);
        this.openAlert(new CustomError(msg, error.name));
        return throwError(() => error);
      })
    );
  }

  private openAlert(error: CustomError): void {
    this._alertService
      .open(error.message, {
        label: error.name,
        status: TuiNotification.Error,
        autoClose: false,
      })
      .pipe(take(1))
      .subscribe();
  }
}
