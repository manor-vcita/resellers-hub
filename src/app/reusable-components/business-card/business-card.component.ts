import { IVcitaStaffMember } from './../../models/staff-member.interface';
import { IVcitaAppointment } from './../../models/appointment.interafce';
import { IVcitaClient } from './../../models/client.interface';
import { IVcitaBusiness } from './../../models/vcita-business.interface';
import { VcitaService } from './../../services/vcita/vcita.service';
import { IBusiness } from './../../models/business.interface';
import { Component, Input, OnInit } from '@angular/core';
import { of, Observable, catchError, observable } from 'rxjs';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss']
})
export class BusinessCardComponent implements OnInit {

  @Input() businessUid!: string;

  clients$!: Observable<{total: number}>;
  payments$!: Observable<{total: number}>;
  appointments$!: Observable<{total: number}>;
  campaigns$!: Observable<{total: number}>;
  staffMembers$!: Observable<IVcitaStaffMember[]>
  business$!: Observable<IVcitaBusiness>;

  numberCardView: [number, number] = [100, 200];
  cardColor: string = '#232837';

  constructor(
    private store: StoreService,
    private vcita: VcitaService
  ) {
  }

  ngOnInit(): void {
    console.log(this.businessUid);
    this.clients$ = this.vcita.getBusinessClients(this.businessUid);
    this.appointments$ = this.vcita.getBusinessAppointments(this.businessUid);
    this.business$ = this.vcita.getBusiness(this.store.reseller.hubId, this.businessUid);
  }

}
