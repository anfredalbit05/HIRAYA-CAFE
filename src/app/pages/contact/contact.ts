
import {
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  private cdr = inject(ChangeDetectorRef);

  isSending = false;

  statusMessage = 'We will get back to you as soon as possible.';
  statusType: 'default' | 'success' | 'error' = 'default';

  fullname = '';
  email = '';
  message = '';

  backToContactTop(): void {
  document.getElementById('contact-top')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

  sendMessage(event: Event): void {
    event.preventDefault();

    if (this.isSending) return;

    const name = this.fullname.trim();
    const email = this.email.trim();
    const message = this.message.trim();

    if (!name || !email || !message) {
      this.statusMessage = 'Please complete all fields before sending.';
      this.statusType = 'error';
      return;
    }

    this.isSending = true;
    this.statusMessage = 'Sending your message...';
    this.statusType = 'default';

    const templateParams = {
      to_email: 'anfredalbit042126@gmail.com',
      from_name: name,
      from_email: email,
      message
    };

    emailjs.send(
      environment.emailjsServiceId,
      environment.emailjsTemplateId,
      templateParams,
      environment.emailjsPublicKey
    )
    .then(() => {
      this.fullname = '';
      this.email = '';
      this.message = '';

      this.statusMessage =
        'Message sent successfully! We will reach out soon.';
      this.statusType = 'success';
    })
    .catch((error: unknown) => {
      console.error('EmailJS error:', error);

      this.statusMessage =
        'Failed to send your message. Please try again later.';
      this.statusType = 'error';
    })
    .finally(() => {
      this.isSending = false;
      this.cdr.detectChanges();
    });
  }
}
