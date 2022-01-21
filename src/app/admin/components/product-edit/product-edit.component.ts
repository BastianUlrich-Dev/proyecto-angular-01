import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { myValidators } from 'src/app/utils/validators';

import { ProductsService } from 'src/app/core/services/products/products.service';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  form: FormGroup;
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.buildeForm();
   }

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.productService.getProduct(this.id)
      .subscribe(product => {
        this.form.patchValue(product);
      });
    });
  }
  saveProduct(event: Event){
    event.preventDefault();
    if(this.form.valid){
      const product = this.form.value;
      this.productService.updateProduct(this.id, product)
      .subscribe((newProduct)=>{
        console.log(newProduct);
        this.router.navigate(['./admin/products']);
      })
    }
    console.log(this.form.value)
  }

  private buildeForm(){
    this.form = this.formBuilder.group({
      title: ['',[Validators.required]],
      price: ['',[Validators.required, myValidators.IsPriceValid]],
      image: [''],
      description: ['',[Validators.required]]
    })
  }

  get priceField(){
    return this.form.get('price');
  }

}
