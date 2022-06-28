import { IVcitaProduct } from './../../models/product.interface';
import { IVcitaPayment } from './../../models/payment.interface';
import { IVcitaStaffMember } from './../../models/staff-member.interface';
import { IVcitaAppointment } from './../../models/appointment.interafce';
import { IBusiness } from './../../models/business.interface';
import { IVcitaBusiness } from './../../models/vcita-business.interface';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { IVcitaClient } from 'src/app/models/client.interface';

@Injectable({
  providedIn: 'root'
})
export class VcitaService {

  constructor(
    private http: HttpClient
  ) {
  }


  getBusiness(hubId: string, businessUid: string) {
    return this.http.get<IVcitaBusiness>(`${environment.functionsUrl}/api/vcita/business?hubId=${hubId}&businessUid=${businessUid}`).pipe(
      catchError((err) => of(err))
    );
  }

  createAccount(business: any, hubId: string): Observable<IVcitaBusiness> {
    return this.http.post<IVcitaBusiness>(`${environment.functionsUrl}/api/vcita/create-business`, {
      hubId: hubId,
      business: business
    }).pipe(
      catchError((err) => of(err))
    );
  }

  getBusinessClients(businessUid: string): Observable<{total: number}> {
    const options = {
      params: new HttpParams().set('businessUid', businessUid)
    }
    return this.http.get<{total: number}>(`${environment.functionsUrl}/api/vcita/clients`, options)
  }

  getBusinessAppointments(businessUid: string): Observable<{total: number}> {
    const options = {
      params: new HttpParams().set('businessUid', businessUid)
    }
    return this.http.get<{total: number}>(`${environment.functionsUrl}/api/vcita/appointments`, options).pipe(
      catchError((err) => of(err))
      );
    }

    getBusinessStaff(hubId: string, businessUid: string): Observable<IVcitaStaffMember[]> {
    const options = {
      params: new HttpParams().set('businessUid', businessUid)
    }
    return this.http.get<IVcitaStaffMember>(`${environment.functionsUrl}/api/vcita/staff?hubId=${hubId}&businessUid=${businessUid}`).pipe(
      catchError((err) => of(err))
      );
    }

    getBusinessPayments(businessUid: string): Observable<{total: number}> {
    const options = {
      params: new HttpParams().set('businessUid', businessUid)
    }
    return this.http.get<{total: number}>(`${environment.functionsUrl}/api/vcita/payments`, options).pipe(
      catchError((err) => of(err))
      );
    }

    getBusinessProducts(hubId: string, businessUid: string): Observable<IVcitaProduct[]> {
      const options = {
        params: new HttpParams().set('businessUid', businessUid)
      }
      return this.http.get<IVcitaProduct>(`${environment.functionsUrl}/api/vcita/products?hubId=${hubId}&businessUid=${businessUid}`).pipe(
      catchError((err) => of(err))
    );
  }

}
