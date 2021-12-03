import { Component, OnInit } from '@angular/core';
import { ApiService, HttpOption } from 'src/app/services/api.service';
import { Breed, TheCat } from 'src/app/models/theCat';

@Component({
  selector: 'app-cat-search',
  templateUrl: './cat-search.page.component.html',
  styleUrls: ['./cat-search.page.component.css']
})
export class CatSearchPageComponent implements OnInit {

  breeds: Breed[];
  selected?: Breed;
  cats?: TheCat[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.get<Breed[]>('https://api.thecatapi.com/v1/breeds/').subscribe(it => {
      this.breeds = it;
    });
    // this.apiService.get('https://api.thecatapi.com/v1/images/search?breed_ids=beng').subscribe(it => {
    //   console.log('----', it);
    // });
  }

  select(breed: Breed): void {
    this.selected = breed;
    const option: HttpOption = {
      params: {
        breed_ids: breed.id,
        limit: 10
      }
    };
    this.apiService.get<TheCat[]>('https://api.thecatapi.com/v1/images/search', option).subscribe(it => {
      this.cats = it;
    });
  }
}
