import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { ActivatedRoute, Route } from '@angular/router';
import { IReseller } from './../../models/reseller.interface';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IBusiness } from 'src/app/models/business.interface';

@Component({
  selector: 'app-reseller-page',
  templateUrl: './reseller-page.component.html',
  styleUrls: ['./reseller-page.component.scss']
})
export class ResellerPageComponent implements OnInit {

  reseller$: Observable<IReseller>;
  businesses$: Observable<IBusiness[]>;

  constructor(
    private activatedRoute:ActivatedRoute,
    private firestore: FirestoreService
  ) {
    this.reseller$ = this.activatedRoute.data.pipe(map((data) => data?.['reseller']));
    this.businesses$ = this.firestore.getAccountsByResellerId(this.activatedRoute.snapshot.params['resellerId']);
  }

  ngOnInit(): void {
  }

}
