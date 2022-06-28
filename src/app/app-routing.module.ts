import { VcitaAppPartnerResellerComponent } from './vcita-app/vcita-app-partner-reseller/vcita-app-partner-reseller.component';
import { PartnerResolver } from './resolvers/partner/partner.resolver';
import { VcitaAppPartnerPageComponent } from './vcita-app/vcita-app-partner-page/vcita-app-partner-page.component';
import { ResellerResolver } from './resolvers/resellers/reseller.resolver';
import { ActivateVcitaGuard } from './guards/activate-vcita.guard';
import { ActivateHubGuard } from './guards/activate-hub.guard';
import { ActivateAppGuard } from './guards/activate-app.guard';
import { UserResolver } from './resolvers/user/user.resolver';
import { ResellerPageComponent } from './hub-app/reseller-page/reseller-page.component';
import { ResellersOverviewComponent } from './hub-app/resellers-overview/resellers-overview.component';
import { HubMainComponent } from './hub-app/main/hub-main/hub-main.component';
import { AfterSignInComponent } from './after-sign-in/after-sign-in.component';
import { PartnersComponent } from './vcita-app/partners/partners.component';
import { VcitaMainComponent } from './vcita-app/vcita-main/vcita-main.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './reseller-app/accounts/account/account.component';
import { MainComponent } from './reseller-app/main/main.component';
import { AccountsListComponent } from './reseller-app/accounts/accounts-list/accounts-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HubsResolver } from './resolvers/hubs/hubs.resolver';
import { ResellerUserResolver } from './resolvers/reseller-user/reseller-user.resolver';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/compat/auth-guard';

// Need to include guards so non-authenticated users will be redirected to the login page
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'email-link-login', component: AfterSignInComponent, ...canActivate(redirectUnauthorizedToLogin)},
  // vcita app routes
  {path: 'vcita', component: VcitaMainComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'hubs'},
    {path: 'hubs', component: PartnersComponent},
    {path: 'hubs/:id', component: VcitaAppPartnerPageComponent, resolve: {partner: PartnerResolver}},
    {path: 'hubs/:id/resellers/:resellerId', component: VcitaAppPartnerResellerComponent, resolve: {reseller: ResellerResolver}},
    {path: 'reports', component: PartnersComponent}
  ]},
  // Hubs app routes
  {path: 'hub/:id', component: HubMainComponent, canActivate: [ActivateHubGuard], resolve: {hub: HubsResolver, partner: PartnerResolver, user: UserResolver}, children: [
    {path: '', pathMatch: 'full', redirectTo: 'resellers'},
    {path: 'resellers', component: ResellersOverviewComponent},
    {path: 'resellers/:resellerId', component: ResellerPageComponent, resolve: {reseller: ResellerResolver}}
  ]},
  // resellers app routes
  {path: 'app', component: MainComponent, resolve: {resellerUser: ResellerUserResolver}, ...canActivate(redirectUnauthorizedToLogin),  children: [
    {path: '', pathMatch: 'full', redirectTo: 'accounts'},
    {path: 'accounts', component: AccountsListComponent, resolve: {resellerUser: ResellerUserResolver}, ...canActivate(redirectUnauthorizedToLogin)},
    {path: 'accounts/:id', component: AccountComponent, resolve: {resellerUser: ResellerUserResolver}, ...canActivate(redirectUnauthorizedToLogin)}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
