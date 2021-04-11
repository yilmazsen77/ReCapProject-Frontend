import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  dataLoaded=false;
  filterText:"";

  constructor(
    private carService: CarService, 
    private activatedRoute:ActivatedRoute, 
    private cartService:CartService,
    private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }
      else{
        this.getCars()
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded=true;
    });
  }

  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded=true;
    });
  }

  getCarsByColor(colorId:number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded=true;
    });
  }

  addToCart(car:Car){
    this.toastrService.success("Sepete eklendi", car.description)
    this.cartService.addTocart(car);
  }

}
