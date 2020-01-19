import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";
import { environment } from "../../../environments/environment";

@Pipe({
  name: "dateFormat"
})
export class DateFormatPipe implements PipeTransform {
  transform(date: Date) {
    const result = moment(new Date(date));
    return (result.isValid()
      ? result
      : moment()).format( environment.dateFormat );
  }
}
