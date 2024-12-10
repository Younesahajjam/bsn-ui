import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services';
import { Router, RouterOutlet } from '@angular/router';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from "../../components/book-card/book-card.component";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, BookCardComponent,RouterOutlet],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  bookResponse:PageResponseBookResponse={};
 page=0;
 size=5;
 message='';
 level='success';


  constructor(
    private bookService: BookService
    ,private router:Router
    ){}

  ngOnInit(): void {
      this.findAllBooks();
  }

  private findAllBooks():void{
    this.bookService.findAllBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next:(books)=>{
        this.bookResponse=books;

      }
    });
  }

  gotToFirstPage(){
    this.page=0;
    this.findAllBooks();
  }

  gotToPreviousPage(){
    this.page--;
    this.findAllBooks();
  }

  gotToPage(page:number){
    this.page=page;
    this.findAllBooks();
  }
  gotToNextPage(){
    this.page++;
    this.findAllBooks();
  }

  gotToLastPage(){
     this.page = this.bookResponse.totalPages as number - 1;
     this.findAllBooks();
  }


  get isLastPage(): boolean{
    return this.page == this.bookResponse.totalPages as number - 1;
  }

  borrowBook(book: BookResponse){
    this.message='';
    this.bookService.borrowBook({
      'book-id': book.id as number
    }).subscribe({
      next: ()=>{
        this.level='success';
        this.message = 'Book successfully added to your List';
      },
      error: (err)=>{
        console.log(err);
        this.level = 'error';
        this.message=err.error.error;
      }
    })

  }
}
