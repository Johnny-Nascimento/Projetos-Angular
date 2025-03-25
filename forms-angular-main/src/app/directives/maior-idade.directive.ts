import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[maiorIdadeValidator]',
  providers: [{
    provide: NG_VALIDATORS, 
    useExisting: MaiorIdadeDirective, 
    multi: true
  }]
})

export class MaiorIdadeDirective implements Validator{

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const dataNascimento = new Date(control.value + "T00:00:00")
    const anoNascimento = dataNascimento.getFullYear()

    const dataAtual = new Date(); 
    const anoAtual = dataAtual.getFullYear()

    const idade = anoAtual - anoNascimento
    const jaFezDezoito = idade > 18 || (idade == 18 && this.jaFezAniversario(dataAtual, dataNascimento))

    if (!jaFezDezoito)
      return {'maiorIdadeValidator': true}

    return null
  }

  private  jaFezAniversario(dataAtual: Date, dataNascimento: Date): boolean {
    return dataAtual.getMonth() >= dataNascimento.getMonth() && dataAtual.getDate() >= dataNascimento.getDate()
  }
}
