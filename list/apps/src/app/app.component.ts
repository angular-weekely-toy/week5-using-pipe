import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { SlackService } from '../../../apps/src/app/core/service/slack.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SlackService]
})
export class AppComponent implements OnInit {
  title = 'list';
  group: FormGroup;
  bookList?: any[] = new Array();
  today: number = Date.now();

  constructor(private fb: FormBuilder, private slackService: SlackService) { 
    this.group = this.fb.group({});
  }

  ngOnInit(): void {
    this.group.addControl('push_msg', this.fb.control('',[]));

    setInterval(() => {this.today = Date.now()}, 1);
  }

  submit() {
    this.sendMessage();
  }

  sendMessage() {
    const msg = this.group?.controls?.push_msg?.value;
    this.slackService.sendSlackPush(msg).toPromise()
    .then((res) => {
      console.log('push success');
      alert('발송이 성공하였습니다.');
    })
    .catch((error) => {
      console.log('push fail: ', error);
		})
		.finally(() => {
      console.log('push finally');
		});
  }

  get form() {
		return this.group.controls;
	}

}