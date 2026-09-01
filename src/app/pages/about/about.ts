import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  styleUrl: './about.css',
  templateUrl: './about.html',
})
export class About implements AfterViewInit {

  @ViewChild('hirayaVideo')
  hirayaVideo!: ElementRef<HTMLVideoElement>;

  isMuted = true;

  ngAfterViewInit(): void {
    const video = this.hirayaVideo.nativeElement;

    // Required for mobile autoplay
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.volume = 1;

    video.play().catch((error) => {
      console.warn('Autoplay failed:', error);
    });
  }

  toggleSound(): void {
    const video = this.hirayaVideo.nativeElement;

    video.muted = !video.muted;
    video.volume = 1;

    this.isMuted = video.muted;

    // User interaction allows playback with sound
    if (!video.muted) {
      video.play().catch((error) => {
        console.error('Playback failed:', error);
      });
    }
  }
}
