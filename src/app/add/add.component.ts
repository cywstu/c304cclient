import { Component, OnInit } from '@angular/core';
import { Coffee } from '../models/Coffee';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  coffee: Coffee;

  name:string;
  desc:string;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    const coffee = {
      name: this.name,
      desc: this.desc
    }
  }

}
