import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive], // <-- Add RouterLinkActive here
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {}
