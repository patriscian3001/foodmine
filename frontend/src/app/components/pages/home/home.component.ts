import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  user!: User;
  constructor (private foodService:FoodService, activatedRoute:ActivatedRoute) {
    let foodsObservable: Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm){
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      }
      else if(params.tag){
        foodsObservable = this.foodService.getAllFoodsByTag(params.tag);
      }
      else{
        foodsObservable = foodService.getAll();
      }
      foodsObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
        window.location.reload;
      })

    });
  }

  ngOnInit(): void{

  }
}
