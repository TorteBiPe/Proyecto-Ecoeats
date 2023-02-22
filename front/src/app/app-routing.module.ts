import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { FormComponent } from "./product/form.component";
import { ProductComponent } from "./product/product.component";
import { ShopComponent } from "./shop/shop.component";
import { WalletComponent } from "./wallet/wallet.component";

const routes:Routes=[
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"shop",component:ShopComponent},
    {path:"contact",component:ContactComponent},
    {path:"login",component:LoginComponent},
    {path:"home",component:HomeComponent},
    {path:"product",component:ProductComponent},
    {path:"product/form",component:FormComponent},
    {path:"wallet",component:WalletComponent},
    {path:"product/form/:id", component: FormComponent }
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}
