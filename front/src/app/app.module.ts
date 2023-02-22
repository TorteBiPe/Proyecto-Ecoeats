import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule }  from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { ProductComponent } from './product/product.component';
import { FormComponent } from './product/form.component';
import { WalletComponent } from './wallet/wallet.component';
import { RouterModule,Routes } from '@angular/router';
const routes:Routes=[
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"shop",component:ShopComponent},
  {path:"contact",component:ContactComponent},
  {path:"login",component:LoginComponent},
  {path:"home",component:HomeComponent},
  {path:"product",component:ProductComponent},
  {path:"product/form",component:FormComponent},
  {path:"wallet",component:WalletComponent},
  { path: 'product/form/:id', component: FormComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    
    LoginComponent,
    ContactComponent,
    ProductComponent,
    FormComponent,
    WalletComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
    
  ],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent],
  exports:[RouterModule]
})
export class AppModule { }

