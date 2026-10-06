import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pengaturan',
  templateUrl: './pengaturan.page.html',
  styleUrls: ['./pengaturan.page.scss'],
  standalone: false,
})
export class PengaturanPage implements OnInit {

  isDarkMode: boolean = false;

  ngOnInit(){
    this.isDarkMode = document.body.classList.contains('dark');
  }

  toggleDarkMode(event: any) {
    this.isDarkMode = event.detail.checked;
  if (this.isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }

}
