import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class Menu {

  backToMenuTop(): void {
  document.getElementById('menu-top')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

}
