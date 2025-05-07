import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as AOS from 'aos';
@Component({
  selector: 'app-home',
  imports: [RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  videos: string[] = [
    // 'https://media.istockphoto.com/id/906626750/video/4k-top-view-and-turning-of-cosmetic-and-brush-collection.jpg?s=640x640&k=20&c=8Fs1vp1AdOcreHTqXGfkn40wxdvd1VfvVeEnndejZ28=',
    'https://media.istockphoto.com/id/1209730692/video/rotation-of-cosmetic-and-make-up-brush-collection-on-pink-background.mp4?s=mp4-640x640-is&k=20&c=rRGaQY4fMhqvVEX8OOA4k3J5mN82a3ggFLIiYdhVmm8=',
     'Videos/3971844-hd_1920_1080_25fps.mp4'
  ];
  currentVideoIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startSlider();
    AOS.init({
      duration: 1000,  
      once: true})
  }

  startSlider() {
    this.intervalId = setInterval(() => {
      this.currentVideoIndex =
        (this.currentVideoIndex + 1) % this.videos.length;
    }, 3000); 
  }

  pauseSlider() {
    clearInterval(this.intervalId);
  }

  resumeSlider() {
    this.startSlider();
  }
  goToVideo(index: number) {
    this.currentVideoIndex = index;
    this.pauseSlider();  
  }
}
