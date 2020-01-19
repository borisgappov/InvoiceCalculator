import { NgModule } from "@angular/core";
import { DateFormatPipe } from "./date-format.pipe";
import { ItemsTotalPricePipe } from "./items-total-price.pipe";
import { NumberTwoDigitsPipe } from "./number-two-digits.pipe";

@NgModule({
  declarations: [DateFormatPipe, NumberTwoDigitsPipe, ItemsTotalPricePipe],
  exports: [DateFormatPipe, NumberTwoDigitsPipe, ItemsTotalPricePipe]
})
export class PipesModule {}
