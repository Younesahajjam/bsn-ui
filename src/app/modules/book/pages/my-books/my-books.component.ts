import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';
import { BookService } from '../../../../services/services';
import { Router } from '@angular/router';
import { BookCardComponent } from "../../components/book-card/book-card.component";

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, BookCardComponent],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit{
  bookResponse:PageResponseBookResponse={};
  page=0;
  size=5;



   constructor(
     private bookService: BookService
     ,private router:Router
     ){}

   ngOnInit(): void {
       this.findAllBooks();
   }

   private findAllBooks():void{
     this.bookService.findAllBooksByOwner({
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

   archiveBook(book: BookResponse){
      this.bookService.updateArchivedStatus({
        "book-id": book.id as number
      }).subscribe({
        next:()=>{
          book.archived= !book.archived;
        }
      })

   }

   shareBook(book: BookResponse){
     this.bookService.updateShareableStatus({
      "book-id": book.id as number
     }).subscribe({
      next: ()=>{
        book.shareable=!book.shareable;
      }
     })

   }

   editBook(book: BookResponse){
    this.router.navigate(['books', 'manage', book.id])


   }

}
