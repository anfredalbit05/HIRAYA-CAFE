
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements AfterViewInit {
  @ViewChild('hirayaVideo')
  hirayaVideo!: ElementRef<HTMLVideoElement>;

  isMuted = true;

  ngAfterViewInit(): void {
    const video = this.hirayaVideo.nativeElement;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    video.play().catch(() => {
      // Autoplay may be blocked by the browser.
    });
  }

  backToAboutTop(): void {
  document.getElementById('about-top')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

  toggleSound(): void {
    const video = this.hirayaVideo?.nativeElement;

    if (!video) return;

    video.muted = !video.muted;
    this.isMuted = video.muted;

    video.play().catch(() => {
      // Playback can require another user interaction.
    });
  }
}
