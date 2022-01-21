import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { myValidators } from 'src/app/utils/validators';

import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private router: Router
  ) {
    this.buildeForm();
   }

  ngOnInit() {
  }
  saveProduct(event: Event){
    event.preventDefault();
    if(this.form.valid){
      const product = this.form.value;
      this.productService.createProduct(product)
      .subscribe((newProduct)=>{
        console.log(newProduct);
        this.router.navigate(['./admin/products']);
      })
    }
    console.log(this.form.value)
  }

  private buildeForm(){
    this.form = this.formBuilder.group({
      id: ['',[Validators.required]],
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
