import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClothingService } from '../clothing.service';
import { Observable } from 'rxjs';
import { IOrder } from '../order-model';

@Component({
  selector: 'app-paid-modal',
  templateUrl: './paid-modal.component.html',
  styleUrls: ['./paid-modal.component.scss']
})
export class PaidModalComponent implements OnInit {
  public paidForm: FormGroup;
  order: IOrder[];

  typeList = [
    { value: 'all', name: 'All' },
    { value: 'oid', name: 'By Order Id' },
    { value: 'sid', name: 'By Student Id' },
    { value: 'name', name: 'Student Name' }
  ];

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<PaidModalComponent>,
    private clothingService: ClothingService) { }

  ngOnInit() {
    this.createForm();
    this.search();
  }

  createForm() {
    this.paidForm = this.formBuilder.group({
      searchType: ['all'],
      search: ['']
    });
  }

  getAllUnpaid() {
    if (this.paidForm.value.searchType === 'all') {
      this.search();
    }
  }

  search() {
    this.order = [];
    this.clothingService.getUnpaidOrders(this.paidForm.value.searchType, this.paidForm.value.search)
      .subscribe(data => {
        this.order = data;
        console.log('unpaid', this.order);
        this.paidForm.controls['search'].reset();
      });
  }

  paid(id: number) {
    this.clothingService.savePaidOrder(id).subscribe(res => {
      if (res) {
        this.search();
      }
    });
  }

  close() {
    this.dialogRef.close('hello');
  }

}
