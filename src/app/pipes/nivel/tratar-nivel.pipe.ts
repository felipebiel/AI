import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tratarNivel',
  pure: true,
})
export class TratarNivelPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 0:
          value = "Vazio";
        break;
      case 1:
          value = "Baixo";
        break;
      case 2:
          value = "Médio";
        break;

      case 3:
          value = "Cheio";
        break;
      default:

        break;
    }

    return value;
  }

}
