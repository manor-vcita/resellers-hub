import { IReseller } from './../../models/reseller.interface';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vcita-app-partner-reseller',
  templateUrl: './vcita-app-partner-reseller.component.html',
  styleUrls: ['./vcita-app-partner-reseller.component.scss']
})
export class VcitaAppPartnerResellerComponent implements OnInit {

  reseller: IReseller;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.reseller = this.activatedRoute.snapshot.data['reseller'];
  }

  ngOnInit(): void {
  }

}
