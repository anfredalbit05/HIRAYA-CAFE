import { Component, inject, ChangeDetectorRef } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class Contact {
  isSending = false;
  statusMessage = 'We will get back to you as soon as possible.';

  private cdr = inject(ChangeDetectorRef);

  public sendMessage(event: Event, nameInput: HTMLInputElement, emailInput: HTMLInputElement, messageInput: HTMLTextAreaElement) {
    event.preventDefault();

    if (this.isSending) return; // Prevent double clicking

    this.isSending = true;
    this.statusMessage = 'Sending your message...';

    const templateParams = {
      to_email: 'anfredalbit042126@gmail.com',
      from_name: nameInput.value,
      from_email: emailInput.value,
      message: messageInput.value,
    };

    emailjs.send(
      environment.emailjsServiceId,
      environment.emailjsTemplateId,
      templateParams,
      environment.emailjsPublicKey
    )
      .then(() => {
        this.isSending = false;
        this.statusMessage = 'Message sent successfully! We will reach out soon.';

        // Clear the form fields after successful send
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';

        // Force change detection so the button updates immediately
        this.cdr.detectChanges();
      })
      .catch((error) => {
        this.isSending = false;
        this.statusMessage = 'Failed to send message. Please try again later.';
        console.error('Email error:', error);

        // Force change detection on error as well
        this.cdr.detectChanges();
      });
  }
}
