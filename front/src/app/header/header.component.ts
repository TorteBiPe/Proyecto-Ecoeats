import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";


@Component({
    selector:'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    logeo:any;
    totalWallet="0€";
    title:string='App Angular'
    constructor(private router:Router){}

    ngOnInit(): void {
        this.logeo=localStorage.getItem('login');
    }
    //Función para deslogear al admin
    Logout(){
        this.logeo=localStorage.removeItem('login');
        this.router.navigate(["/home"])
    }

}
