import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api/api.service';
import { Data } from 'src/assets/models/data.model';
import { Region } from 'src/assets/models/region.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit, OnInit {
  disableSelect = new FormControl(false);
  displayedColumns: string[] = ['prenom', 'nom', 'telephone', 'region'];
  dataSource!: MatTableDataSource<Data>;
  regions!: Array<Region>;
  newData: Data = {
    prenom: '',
    nom: '',
    telephone: 0,
    region: ''
  };


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.getRegions()
      .subscribe((data: Region[]) => {
        this.regions = data;
        console.log(this.regions);
      });
    this.dataSource = JSON.parse(localStorage.getItem('arrayData') || '[]');
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  send(data: Data): void {
    let datas: Data[] = JSON.parse(localStorage.getItem('arrayData') || '[]');
    datas.push(data);
    localStorage.setItem('arrayData', JSON.stringify(datas));
    this.dataSource = JSON.parse(localStorage.getItem('arrayData') || '[]');
  }
}
