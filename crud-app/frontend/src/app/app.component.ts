import { Component } from '@angular/core';
import { ProductListComponent } from './components/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent],
  template: `
    <app-product-list></app-product-list>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `]
})
export class AppComponent {
  title = 'CRUD de Produtos';
}
