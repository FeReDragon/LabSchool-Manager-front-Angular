import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PedagogicSupportService } from '../../services/pedagogic-support.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  acompanhamentos$: Observable<any> = of();

  constructor(private pedagogicSupportService: PedagogicSupportService) { }

  ngOnInit() {
    this.acompanhamentos$ = this.pedagogicSupportService.getAcompanhamentos();
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }
}

