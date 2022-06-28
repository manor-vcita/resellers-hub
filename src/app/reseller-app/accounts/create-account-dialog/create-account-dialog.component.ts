import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account-dialog',
  templateUrl: './create-account-dialog.component.html',
  styleUrls: ['./create-account-dialog.component.scss']
})
export class CreateAccountDialogComponent implements OnInit {

  createAccountForm = this.fb.group({
    adminEmail: ['', Validators.required],
    adminFirstName: [''],
    adminLastName: [''],
    adminPhone: [''],
    businessName: ['', Validators.required],
    businessPhone: [''],
    businessAddress: [''],
    businessWebsiteUrl: [''],
    businessShortDescription: [''],
    metaInSetup: [''],
    metaNote: [''],
    metaTags: [''],
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
