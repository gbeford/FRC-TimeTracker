import { Component, OnInit, ViewChild } from '@angular/core';
import { ClothingService } from '../clothing.service';
import { IApparel } from '../apparel-model';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-apparel-list-edit',
  templateUrl: './apparel-list-edit.component.html',
  styleUrls: ['./apparel-list-edit.component.scss']
})

export class ApparelListEditComponent implements OnInit {
  dataSource: MatTableDataSource<IApparel>; // PaidDataSource;

  displayedColumns = ['editItem', 'apparelId', 'item', 'description', 'price', 'removeItem'];
  
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  apparealData: IApparel[];

  constructor(private clothingService: ClothingService) { }

  ngOnInit() {
    this.getAppareal();
  }


  getAppareal() {
    this.clothingService.getApparelList().subscribe(data => {
      this.apparealData = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      console.log('apparel', this.apparealData);
    });
  }

  deleteItem(el: number) {
    // this.eventService.deleteEventRecord(el).subscribe((data) => {
      alert('click works but did not delete anything as its not fully wired up yet');
    //   this.alertMessage = 'Apparel item was deleted successfully.';
    //   this.success = true;
    //   this.showEvents();
    //   this.addEventForm.reset();
    // });
  }


}
