import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpRequestFilter } from './http-request-filter';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  
  constructor(private filter: HttpRequestFilter) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.filter.handle(req));
  }
}
