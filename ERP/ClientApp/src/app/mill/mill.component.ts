import { Component, OnInit } from '@angular/core';
import { mill } from './mill';
import { MillService } from './mill.service';
//import { product } from '../product/product';
//import { ProductService } from '../product/product.service';
import { EditMillViewModel } from './EditMillViewModel';
import { Province } from './Province';
import { City } from './City';
@Component({
  selector: 'app-mill',
  templateUrl: './mill.component.html',
  styleUrls: ['./mill.component.css']
})
export class MillComponent implements OnInit {

  constructor(private millService: MillService) { }
  private provinceData: Array<Province> = [];
  private millsData: Array<mill> = [];
  private errorMessage: any = '';
  private gender: string[];
  private mill: mill;
  private city: string[];
  private province: string[];

  public getProvinces() {
    debugger
    this.millService.getProvinces().subscribe((data: Array<Province>) => {
      this.provinceData = data;
    });
  }

  public getMills() {
    debugger
    this.millService.getMills().subscribe((data: Array<mill>) => {
      this.millsData = data;
    });
  }

  //public onFormSubmit({ value, valid }: { value: mill, valid: boolean }) {
  //  this.mill = value;
  //  this.millService.createMill(this.mill)
  //    .subscribe(res => {
  //      this.submitted = true;
  //      this.closeBtn.nativeElement.click();
  //    });
  //}

  ngOnInit() {
    this.getProvinces();
    this.getMills();

    this.gender = ['Male', 'Female', 'Others'];
    this.city = [
      'Lahore',
      'Karachi',
      'Shorab Gott Karachi',
      'Gujranwala',
      'Sialkot',
      'Sukhar'
    ];
    this.province = ['Punjab', 'Sindh', 'KPK', 'Baluchistan'];
    this.mill = new mill({
      Name: "Ahmad Paper Mill",
      City: this.city[1],
      FabricId: "",
      MDName: "",
      MDCell: 509705440,
      ManagerName: "",
      ManagerCell: 509705440,
      CPMName: "",
      CPMCell: 509705440,
      MechanicalName: "",
      MechanicalCell: 509705440,
      gender: this.gender[0],
      Province: this.province[0]
    });

  }


}
