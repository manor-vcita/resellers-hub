import { VcitaMainComponent } from './vcita-app/vcita-main/vcita-main.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './reseller-app/accounts/account/account.component';
import { AccountsListComponent } from './reseller-app/accounts/accounts-list/accounts-list.component';
import { LoginComponent } from './login/login.component';
import { TopNavComponent } from './reseller-app/top-nav/top-nav.component';
import { SideNavComponent } from './reseller-app/side-nav/side-nav.component';
import { MainComponent } from './reseller-app/main/main.component';
import { CreateAccountDialogComponent } from './reseller-app/accounts/create-account-dialog/create-account-dialog.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { VcitaSideNavComponent } from './vcita-app/vcita-side-nav/vcita-side-nav.component';
import { VcitaTopNavComponent } from './vcita-app/vcita-top-nav/vcita-top-nav.component';
import { PartnersComponent } from './vcita-app/partners/partners.component';
import { AfterSignInComponent } from './after-sign-in/after-sign-in.component';
import { HubMainComponent } from './hub-app/main/hub-main/hub-main.component';
import { ResellersOverviewComponent } from './hub-app/resellers-overview/resellers-overview.component';
import { ResellerPageComponent } from './hub-app/reseller-page/reseller-page.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { HubSideNavComponent } from './hub-app/hub-side-nav/hub-side-nav.component';
import { HubTopNavComponent } from './hub-app/hub-top-nav/hub-top-nav.component'
import { HubsResolver } from './resolvers/hubs/hubs.resolver';
import { VcitaAppPartnerPageComponent } from './vcita-app/vcita-app-partner-page/vcita-app-partner-page.component';
import { VcitaAppPartnerResellerComponent } from './vcita-app/vcita-app-partner-reseller/vcita-app-partner-reseller.component';
import { BusinessCardComponent } from './reusable-components/business-card/business-card.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    TopNavComponent,
    LoginComponent,
    AccountsListComponent,
    AccountComponent,
    SideNavComponent,
    MainComponent,
    CreateAccountDialogComponent,
    VcitaMainComponent,
    VcitaSideNavComponent,
    VcitaTopNavComponent,
    PartnersComponent,
    AfterSignInComponent,
    HubMainComponent,
    ResellersOverviewComponent,
    ResellerPageComponent,
    HubSideNavComponent,
    HubTopNavComponent,
    VcitaAppPartnerPageComponent,
    VcitaAppPartnerResellerComponent,
    BusinessCardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgxSpinnerModule,
    NgxChartsModule
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
