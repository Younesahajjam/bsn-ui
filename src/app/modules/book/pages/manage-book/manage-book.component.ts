import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookRequest } from '../../../../services/models';
import { BookService } from '../../../../services/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule,],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent implements OnInit {
  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: ''
  };
  errorMsg: Array<string> = [];
  selectedPicture: string | undefined ;
  selectedBookCover: any;

  constructor(
     private bookService: BookService
    ,private router: Router
    ,private activateRoute: ActivatedRoute
    ){}

  ngOnInit(): void {
      const bookId= this.activateRoute.snapshot.params['bookId'];
      if (bookId) {
        this.bookService.findBookById({
          'book-id': bookId
        }).subscribe({
          next: (book)=>{
            this.bookRequest = {
              id: book.id ,
              title: book.title as string,
              authorName: book.authorName as string,
              isbn: book.isbn as string,
              synopsis: book.synopsis as string,
              shareable: book.shareable
            }
            if (book.cover) {
              this.selectedPicture = 'date:image/jpg;base64,'+book.cover

            }

          }
        })

      }
  }

  onFileSelected(event: any){
    this.selectedBookCover=event.target.files[0];
    console.log(this.selectedBookCover);
    if (this.selectedBookCover) {
      const reader=new FileReader();
      reader.onload=()=>{
        this.selectedPicture=reader.result as string;
      }
      reader.readAsDataURL(this.selectedBookCover);

    }
  }

  saveBook(){
    this.bookService.saveBook({
      body: this.bookRequest
    }).subscribe({
      next:(bookId: number)=>{
        this.bookService.uploadBookCoverPicture({
          'book-id': bookId,
          body: {
             file:this.selectedBookCover
          }
        }).subscribe({
          next: ()=>{
            this.router.navigate(['/books/my-books']);
          }
        })
      },
      error: (err)=>{
        this.errorMsg=err.error.validationErrors;
      }
    });
  }
}
