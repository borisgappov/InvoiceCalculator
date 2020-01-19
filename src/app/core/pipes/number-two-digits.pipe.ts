import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "twoDigits"
})
export class NumberTwoDigitsPipe implements PipeTransform {
  transform(num: any) {
    if (!num) {
      return "";
    }
    if (typeof num === "string") {
      num = Number.parseFloat(num);
    }
    return num ? (Math.round(num * 100) / 100).toFixed(2).toString() : "";
  }
}
