import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { PedagogicSupportService } from '../../services/pedagogic-support.service';
import { map, switchMap } from 'rxjs/operators';

interface Acompanhamento {
  titulo: string;
  data: string;
  descricao: string;
  alunoNome: string;
  usuarioNome: string;
  finalizado: boolean;
  id: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  acompanhamentos: Acompanhamento[] = [];
  paginatedAcompanhamentos: Acompanhamento[] = [];
  filtroTitulo: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 9; // Quantidade de items por página que deseja
  totalItems: number = 0;
  totalPages: number[] = [];

  constructor(private pedagogicSupportService: PedagogicSupportService) { }

  ngOnInit() {
    this.obterAcompanhamentos();
  }

  obterAcompanhamentos() {
    this.pedagogicSupportService.getAcompanhamentos().pipe(
      map((acompanhamentos: Acompanhamento[]) => {
        if (this.filtroTitulo.trim() === '') {
          return acompanhamentos;
        } else {
          return acompanhamentos.filter(acompanhamento =>
            acompanhamento.titulo.toLowerCase().includes(this.filtroTitulo.trim().toLowerCase())
          );
        }
      })
    ).subscribe((acompanhamentos: Acompanhamento[]) => {
      this.acompanhamentos = acompanhamentos;
      this.totalItems = this.acompanhamentos.length;
      this.setTotalPages();
      this.paginateAcompanhamentos();
    });
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }

  setTotalPages(): void {
    let numPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.totalPages = Array.from({length: numPages}, (_, i) => i + 1);
  }

  paginateAcompanhamentos(): void {
    let startItem = (this.currentPage - 1) * this.itemsPerPage;
    let endItem = this.currentPage * this.itemsPerPage;
    this.paginatedAcompanhamentos = this.acompanhamentos.slice(startItem, endItem);
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
    this.paginateAcompanhamentos();
  }

  filtrarAcompanhamentos() {
    this.currentPage = 1; // Volta para a primeira página ao aplicar o filtro
    this.obterAcompanhamentos();
  }
}

