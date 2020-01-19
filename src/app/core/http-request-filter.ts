import { HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable()
export class HttpRequestFilter {
  ordersUrl = environment.apiUrl + "orders";

  handle(req: HttpRequest<any>): HttpRequest<any> {
    if (req.url === this.ordersUrl) {
      let customerId = req.params.get("customer_id");
      Object.assign(req, {
        url: this.ordersUrl + "/" + customerId,
        urlWithParams: req.urlWithParams.replace(
          "/orders",
          "/orders/" + customerId
        )
      });
    }

    return req;
  }
}
