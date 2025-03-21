import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from './../minusculoValidators';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    const validatorPadrao = [
      Validators.required,
      Validators.pattern(/(.|\s)*\S(.|\s)*/), // Pelo menos um caractere não espaço
    ];

    this.formulario = this.formBuilder.group({
      conteudo: ['', validatorPadrao],
      autoria: ['', validatorPadrao.concat(Validators.minLength(3), minusculoValidator)],
      modelo: ['modelo1'],
      favorito: [false]
    });
  }

  criarPensamento(){
    if (this.formulario.valid)
    {
      this.service.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento'])});
    }
  }

  cancelarPensamento(){
    this.router.navigate(['/listarPensamento'])
  }

  habilitarBotao(): string{
    if (this.formulario.valid)
      return 'botao'

    return 'botao__desabilitado'
  }
}
