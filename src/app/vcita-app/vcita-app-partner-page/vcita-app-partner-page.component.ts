import { IBusiness } from './../../models/business.interface';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { IReseller } from './../../models/reseller.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { IHub } from './../../models/hub.interface';
import { map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vcita-app-partner-page',
  templateUrl: './vcita-app-partner-page.component.html',
  styleUrls: ['./vcita-app-partner-page.component.scss']
})
export class VcitaAppPartnerPageComponent implements OnInit {

  partner$!: Observable<IHub>;
  resellers$!: Observable<IReseller[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private firestore: FirestoreService
  ) {
    this.partner$ = this.activatedRoute.data.pipe(map((data) => data?.['partner']));
    this.resellers$ = this.firestore.getResellersByPartnerId(this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit(): void {
  }

}
