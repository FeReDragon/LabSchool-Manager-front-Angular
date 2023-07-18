import { Component, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { PedagogicSupportService } from '../../services/pedagogic-support.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  acompanhamentos$: Observable<any> = of();
  filtroTitulo: string = '';

  constructor(private pedagogicSupportService: PedagogicSupportService) { }

  ngOnInit() {
    this.obterAcompanhamentos();
  }

  obterAcompanhamentos() {
    this.acompanhamentos$ = this.pedagogicSupportService.getAcompanhamentos();
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }
  filtrarAcompanhamentos() {
    this.acompanhamentos$ = this.pedagogicSupportService.getAcompanhamentos().pipe(
      map((acompanhamentos: any[]) => {
        if (this.filtroTitulo.trim() === '') {
          return acompanhamentos;
        } else {
          return acompanhamentos.filter(acompanhamento =>
            acompanhamento.titulo.toLowerCase().includes(this.filtroTitulo.trim().toLowerCase())
          );
        }
      })
    );
  }
}
