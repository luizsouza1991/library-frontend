import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthorListComponent } from './pages/author/author-list/author-list.component';
import { AuthorModalComponent } from './pages/author/author-modal/author-modal.component';
import { AuthorService } from './services/author/author.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxIziToastModule } from 'ngx-izitoast';
import { BookService } from './services/book/book.service';
import { BookListComponent } from './pages/book/book-list/book-list.component';
import { BookModalComponent } from './pages/book/book-modal/book-modal.component';
import { VitrineComponent } from './pages/vitrine/vitrine.component';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorListComponent,
    AuthorModalComponent,
    BookListComponent,
    BookModalComponent,
    VitrineComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    NgxIziToastModule
  ],
  providers: [AuthorService, BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
