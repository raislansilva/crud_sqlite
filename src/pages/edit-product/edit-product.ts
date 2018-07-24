import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { CategoryProvider } from '../../providers/category/category';
import { Product } from '../../models/Product';

/**
 * Generated class for the EditProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {
  model: Product
  categories: any[];

  constructor(
    private toast: ToastController,
    private productProvider: ProductProvider,
    private categoryProvider: CategoryProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
      this.model = new Product

      if(this.navParams.data.id){
        this.productProvider.get(this.navParams.data.id)
        .then((result:any)=>{
          this.model= result;
        })
      }

    }

    ionViewDidLoad(){
      this.categoryProvider.getAll()
      .then((result: any[])=> {
        this.categories =  result;
      })
      .catch(()=> {
        this.toast.create({message:'Erro ao carregar as categorias', duration:3000, position:'botton'}).present();
      })
    }

    save(){
      this.saveProduct()
        .then(()=>{
          this.toast.create({message: 'Produto salvo', duration:3000, position:'botton'}).present();
        })
        .catch(()=>{
           this.toast.create({message:'Erro ao salvar', duration:3000,position:'botton'}).present();
        })
      

      
    }

    saveProduct(){
      if(this.model.id){
        return this.productProvider.update(this.model);
      }else{
        return this.productProvider.insert(this.model);

      }
    }

 

}
