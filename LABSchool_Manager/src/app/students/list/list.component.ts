import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/students.service';

interface Student {
  nome: string;
  telefone: string;
  dataNascimento: string;
  cpf: string;
  nota: number;
  id: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  students: Student[] = [];
  paginatedStudents: Student[] = [];
  filterText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalItems: number = 0;
  totalPages: number[] = [];
  loadingError: boolean = false; // Nova propriedade

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe((data: any) => {
      this.students = data;
      if (this.students.length === 0) {
        this.loadingError = true;
      }
      this.students.sort((a: Student, b: Student) => a.nome.localeCompare(b.nome));
      this.totalItems = this.students.length;
      this.setTotalPages();
      this.paginateStudents();
    }, err => {
      this.loadingError = true;
    });
  }

  setTotalPages(): void {
    let numPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.totalPages = Array.from({length: numPages}, (_, i) => i + 1);
  }

  paginateStudents(): void {
    let startItem = (this.currentPage - 1) * this.itemsPerPage;
    let endItem = this.currentPage * this.itemsPerPage;
    this.paginatedStudents = this.students.slice(startItem, endItem);
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
    this.paginateStudents();
  }
}






