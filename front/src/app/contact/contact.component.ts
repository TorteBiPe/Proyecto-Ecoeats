import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Component, HostListener } from '@angular/core';
import { Contact } from './contact';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  disabledSubmitButton: boolean = true;
  public contact: Contact = new Contact();

  constructor(private http: HttpClient) {

  }
  //Función para enviar mediante la página Formspree el formulario de Contactos
  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      const email = contactForm.value;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('https://formspree.io/f/xwkyyyyd',
        { name: email.name, replyto: email.email, message: email.messages },
        { 'headers': headers }).subscribe(
          response => {
            console.log(response);
          }
        );
    }
    swal.fire('Enviado', `El formulario ha sido enviado con éxito`, 'success');
  }
}