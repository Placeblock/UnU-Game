import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cast'
})
export class CastPipe implements PipeTransform {

  transform<T>(value: any, clss: new (...args: any[]) => T): T {
    return value as T;
  }
}
