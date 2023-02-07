import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from "ngx-quill";
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  imports: [
    HttpClientModule,
    QuillModule,
    NgxPaginationModule
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    NgxPaginationModule
  ]
})
export class SharedModule {}
