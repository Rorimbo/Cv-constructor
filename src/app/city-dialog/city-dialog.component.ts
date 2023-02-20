import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { CvCreatorService } from '../cv-creator.service';

@Component({
  selector: 'app-city-dialog',
  templateUrl: './city-dialog.component.html',
  styleUrls: ['./city-dialog.component.scss'],
})
export class CityDialogComponent {
  city: string;

  constructor(
    public dialogRef: MatDialogRef<CityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public params: any,
    private service: CvCreatorService
  ) {
    this.service.getCityList().subscribe((cityList: any) => {
      this.dataSource.data = cityList;
    });
  }
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<any>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: any) => node.expandable;
}
