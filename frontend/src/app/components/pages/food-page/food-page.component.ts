import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { UserService } from 'src/app/services/user.service';
import { Food } from 'src/app/shared/models/Food';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css'],
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  user!: User;
  constructor(
    foodService: FoodService,
    activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private router:Router,
    userService: UserService
  ) {
    userService.userObservable.subscribe((newUser) =>{
      this.user = newUser;
    });

    if(!this.user.id){
      router.navigateByUrl('/login');
    }

    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        foodService.getFoodById(params.id).subscribe(serverFood =>{
          this.food = serverFood;
        });
      }
    });
  }
  ngOnInit(): void {}

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
