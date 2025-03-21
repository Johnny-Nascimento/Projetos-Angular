import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from '../minusculoValidators';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
      private service: PensamentoService,
      private router: Router,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {

    const validatorPadrao = [
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/), // Pelo menos um caractere não espaço
        ];

    this.formulario = this.formBuilder.group({
      id: ['', Validators.required,],
      conteudo: ['', validatorPadrao],
      autoria: ['', validatorPadrao.concat(Validators.minLength(3), minusculoValidator)],
      modelo: ['modelo1'],
      favorito: [false]
    });

    const id =  parseInt(this.route.snapshot.paramMap.get('id')!);

    this.service.buscarPorId(id).subscribe((pensamento)=> this.formulario.setValue(pensamento));
  }

  editarPensamento()  {
    if (this.formulario.valid)
    {
      this.service.editar(this.formulario.value).subscribe(()=> this.router.navigate(['/listarPensamento']));
    }
  }

  cancelar()  {
    this.router.navigate(['/listarPensamento'])
  }

  habilitarBotao(): string{
    if (this.formulario.valid)
      return 'botao'

    return 'botao__desabilitado'
  }
}
