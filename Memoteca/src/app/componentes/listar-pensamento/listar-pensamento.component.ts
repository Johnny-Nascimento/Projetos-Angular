import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Pensamento } from './../pensamentos/pensamento';
import { PensamentoService } from '../pensamentos/pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1
  haMaisPensamentos: boolean = true
  filtro: string = ''
  favoritos: boolean = false
  titulo: string = 'Meu Mural'

  @Input() listaFavoritos: Pensamento[] = []

  constructor(private service: PensamentoService,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
       this.listaPensamentos = listaPensamentos
      })
      this.changeDetector.detectChanges();
  }

  carregarMaisPensamentos(){
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos).subscribe(
      listaPensamentos => { this.listaPensamentos.push(...listaPensamentos)
          this.haMaisPensamentos = listaPensamentos.length ? true : false
      });
  }

  pesquisarPensamentos(){
    this.paginaAtual = 1;
    this.haMaisPensamentos = true
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentos => {this.listaPensamentos = listaPensamentos})
  }

  listarFavoritos(){
    this.titulo = 'Meus Favoritos'
    this.favoritos = true
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe(lista => {
      this.listaPensamentos = lista
      this.listaFavoritos = lista
    })
   }

   recarregarComponente() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
   }
}
