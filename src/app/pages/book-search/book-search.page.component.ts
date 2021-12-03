import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService, HttpOption } from 'src/app/services/api.service';
import { OpenApiNaver } from 'src/app/models/openapi-naver';
import { InputDelayDirective } from 'src/app/directives/inputDelay.directive';

@Component({
  selector: 'app-book-search.page',
  templateUrl: './book-search.page.component.html',
  styleUrls: ['./book-search.page.component.css']
})
export class BookSearchPageComponent implements OnInit {
  public openApiNaver: OpenApiNaver;
  @ViewChild(InputDelayDirective) child!: InputDelayDirective;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  changeData(value: string): void {
    this.searchBook(value);
  }

  searchBook(value = this.child.value): void {
    console.log('-', value);
    const option = {
      headers: {
        'X-Naver-Client-Id': 'Fq3JkmuDgnVEHXOyWOfk',
        'X-Naver-Client-Secret': 'GbD74HX7qn'
      },
      params: {
        query: value
      }
    } as HttpOption;
    this.apiService.get<OpenApiNaver>(`/openapi-naver/v1/search/book.json`, option).subscribe(it => {
      this.openApiNaver = it;
    });
  }
}
