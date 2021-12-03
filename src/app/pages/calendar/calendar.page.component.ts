import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.component.html',
  styleUrls: ['./calendar.page.component.css']
})
export class CalendarPageComponent implements OnInit {

  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // 일 = ['일', '월', '화', '수', '목', '금', '토'];
  // 수개월 = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  date = new Date();
  items: { date: Date, datas: { date: Date, title: string }[] }[] = [];

  @Input()
  mode: 'grid' | 'block' = 'grid';

  // @Input()
  datas: { date: Date, title: string }[] = [];
  currentItem?: { date: Date; datas: { date: Date; title: string }[] };


  constructor() {
    this.datas =  [
      {date: new Date(2021, 11, 20), title: '20day'},
      {date: new Date(2021, 11, 24), title: 'data1'},
      {date: new Date(2021, 11, 24), title: 'data2'},
      {date: new Date(2021, 11, 24), title: 'data3'},
      {date: new Date(2021, 11, 24), title: 'data4'},
      {date: new Date(), title: 'now data'}
    ];
  }

  ngOnInit(): void {
    this.setItem();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, this.mode);
    this.setItem();
    // console.log(changes.myInput.currentValue);
  }

  setItem(): void {
    const d = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    const result = new Date(d);


    this.items = Array(d.getDay()).fill(undefined);
    while (d.getMonth() === result.getMonth()) {
      const applayDate = new Date(result);
      // tslint:disable-next-line:max-line-length
      const datas = this.datas.filter(it => it.date.getFullYear() === applayDate.getFullYear() && it.date.getMonth() === applayDate.getMonth() && it.date.getDate() === applayDate.getDate());
      this.items.push({date: applayDate, datas});
      result.setDate(result.getDate() + 1);
    }
    // console.log(this.items)
  }

  getYear(date = this.date): number {
    return date.getFullYear();
  }

  getMonthName(date = this.date): string {
    return this.months[date.getMonth()];
  }

  getMonth(date = this.date): number {
    return date.getMonth() + 1;
  }

  getDayOfWeekName(date = this.date): string {
    return this.days[date.getDay()];
  }

  getDay(date = this.date): number {
    return date.getDay() + 1;
  }

  getDate(date = this.date): number {
    return date.getDate();
  }

  focusDate(item: { date: Date, datas: { date: Date, title: string }[] }): void {
    this.currentItem = item;
  }

  plusMonth(plus: number): void {
    const d = new Date(this.date);
    d.setMonth(d.getMonth() + plus);
    this.date = d;
    this.setItem();
    // var newDate = new Date(date.setMonth(date.getMonth()+8));
  }

  changeData(): void {
    this.datas = [
      {date: new Date(2021, 10, 20), title: '20day'},
      {date: new Date(2021, 11, 2), title: '20day'},
      {date: new Date(2021, 11, 4), title: 'data1'},
      {date: new Date(2021, 11, 4), title: 'data2'},
      {date: new Date(2021, 11, 4), title: 'data3'},
      {date: new Date(2021, 11, 4), title: 'data4'}
    ];
    this.setItem();
  }
}
