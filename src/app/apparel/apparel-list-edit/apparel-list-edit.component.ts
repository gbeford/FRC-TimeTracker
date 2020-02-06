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

  displayedColumns = ['apparelId', 'item', 'description',  'price'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  apparealData: IApparel[];

  constructor(private clothingService: ClothingService) { }

  ngOnInit() {
    this.getAppareal();
  }


  getAppareal() {
    this.clothingService.getApparelList().subscribe(data => {
      this.apparealData = data;
      console.log('apparel', this.apparealData);
    });
  }

}
