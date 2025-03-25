import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConsultaCepService } from '../service/consulta-cep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private router: Router, private cepService: ConsultaCepService) { }

  ngOnInit(): void {
  }

  cadastrar(form: NgForm) {

    if (form.valid) {
      this.router.navigate(['./sucesso'])
    }
    else {
      alert('Formulário inválido')
    }
  }

  formataTelefone(event: any, form: NgForm) {
    if (form.controls['telefone']?.hasError('pattern') || form.controls['telefone']?.hasError('required'))
      return

    let telefone = event.target.value
    telefone = telefone.replace(/\D/g, '')
    telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    event.target.value = telefone
  }

  populaEndereco(cep: any, form: NgForm){
    form.form.patchValue(
      {
        endereco: cep.logradouro,
        complemento: cep.complemento,
        bairro: cep.bairro,
        cidade: cep.localidade,
        estado: cep.uf
      }
    )
  }

  buscarCep(event: any, form: NgForm) {
    if (form.controls['cep']?.hasError('pattern') || form.controls['cep']?.hasError('required'))
      return

    this.cepService.getConsultaCep(event.target.value).subscribe(cep => this.populaEndereco(cep, form))
  }
}
