import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorListComponent } from './pages/author/author-list/author-list.component';
import { BookListComponent } from './pages/book/book-list/book-list.component';
import { VitrineComponent } from './pages/vitrine/vitrine.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'book',
    component: BookListComponent
  },
  {
    path: 'vitrine',
    component: VitrineComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
