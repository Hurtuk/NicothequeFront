import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'overview'
})
export class OverviewPipe implements PipeTransform {

  transform(value: string): unknown {
    return value
      .replace(/ \./gi, ".")
      .replace(/\.\.\./gi, "…")
      .replace(/ "/gi, " « ")
      .replace(/" /gi, " » ")
      .replace(/ ?;/gi, "&nbsp;;")
      .replace(/ ?\?/gi, "&nbsp;?")
      .replace(/ ?!/gi, "&nbsp;!")
      .replace(/ ?:/gi, "&nbsp;:")
      .replace(/« ?/gi, "«&nbsp;")
      .replace(/ ?»/gi, "&nbsp;»");
  }

}
