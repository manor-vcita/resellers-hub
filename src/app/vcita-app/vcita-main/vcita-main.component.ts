import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vcita-main',
  templateUrl: './vcita-main.component.html',
  styleUrls: ['./vcita-main.component.scss']
})
export class VcitaMainComponent implements OnInit {

  showMenuTexts = false;

  constructor() {}

  ngOnInit(): void {
  }

}
