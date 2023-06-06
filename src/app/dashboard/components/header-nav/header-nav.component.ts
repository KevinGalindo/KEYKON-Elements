import { Component, OnInit, NO_ERRORS_SCHEMA, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HeaderNavComponent implements OnInit {

  isActive = false;
  menuState= false;
  @Output() clickMenu = new EventEmitter<void>()

  constructor(private _router: Router) { }

  ngOnInit(): void {
    let theme = localStorage.getItem('theme');
    if (theme == 'true') {
      this.isActive = true;
      document.body.classList.toggle('day');
    }
  }

  changeTheme(){
    localStorage.setItem('theme', `${!this.isActive}`);
    document.body.classList.toggle('day');
    this.isActive = !this.isActive;
  
  }

  closeMenu(): void{
    this.menuState = !this.menuState;
    this.clickMenu.emit();
  }

  searchElement(text:string){
    if(text.length == 0){
      return;
    }
    this._router.navigate(['/elementos'], {queryParams: { text }});
  }

}
