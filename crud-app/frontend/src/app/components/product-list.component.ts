import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { ProductFormComponent } from './product-form.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatToolbarModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Gerenciamento de Produtos</span>
      <span class="spacer"></span>
      <button mat-raised-button color="accent" (click)="openCreateDialog()">
        <mat-icon>add</mat-icon>
        Novo Produto
      </button>
    </mat-toolbar>

    <div class="container">
      <mat-card>
        <mat-card-content>
          <div *ngIf="loading" class="loading">
            <mat-spinner></mat-spinner>
            <p>Carregando produtos...</p>
          </div>

          <div *ngIf="!loading && products.length === 0" class="empty-state">
            <mat-icon>inventory_2</mat-icon>
            <h2>Nenhum produto cadastrado</h2>
            <p>Clique em "Novo Produto" para adicionar o primeiro produto.</p>
          </div>

          <table mat-table [dataSource]="products" *ngIf="!loading && products.length > 0" class="mat-elevation-z2">
            <!-- ID Column -->
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>ID</th>
              <td mat-cell *matCellDef="let product">{{ product.id }}</td>
            </ng-container>

            <!-- Nome Column -->
            <ng-container matColumnDef="nome">
              <th mat-header-cell *matHeaderCellDef>Nome</th>
              <td mat-cell *matCellDef="let product">{{ product.nome }}</td>
            </ng-container>

            <!-- Descrição Column -->
            <ng-container matColumnDef="descricao">
              <th mat-header-cell *matHeaderCellDef>Descrição</th>
              <td mat-cell *matCellDef="let product">{{ product.descricao || '-' }}</td>
            </ng-container>

            <!-- Preço Column -->
            <ng-container matColumnDef="preco">
              <th mat-header-cell *matHeaderCellDef>Preço</th>
              <td mat-cell *matCellDef="let product">{{ product.preco | currency:'BRL' }}</td>
            </ng-container>

            <!-- Estoque Column -->
            <ng-container matColumnDef="estoque">
              <th mat-header-cell *matHeaderCellDef>Estoque</th>
              <td mat-cell *matCellDef="let product">{{ product.estoque }}</td>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Ações</th>
              <td mat-cell *matCellDef="let product">
                <button mat-icon-button color="primary" (click)="openEditDialog(product)" matTooltip="Editar">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deleteProduct(product)" matTooltip="Excluir">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }

    .container {
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }

    mat-card {
      margin-top: 20px;
    }

    table {
      width: 100%;
    }

    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
    }

    .loading mat-spinner {
      margin-bottom: 20px;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #666;
    }

    .empty-state mat-icon {
      font-size: 80px;
      width: 80px;
      height: 80px;
      color: #ccc;
    }

    .empty-state h2 {
      margin: 20px 0 10px;
      color: #333;
    }

    th.mat-header-cell {
      font-weight: bold;
      font-size: 14px;
    }

    td.mat-cell {
      padding: 12px 8px;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'preco', 'estoque', 'actions'];
  loading = false;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.showMessage('Erro ao carregar produtos. Verifique se o backend está rodando.', 'error');
        this.loading = false;
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '600px',
      data: { product: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '600px',
      data: { product: { ...product } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  deleteProduct(product: Product): void {
    if (confirm(`Tem certeza que deseja excluir o produto "${product.nome}"?`)) {
      this.productService.deleteProduct(product.id!).subscribe({
        next: () => {
          this.showMessage('Produto excluído com sucesso!', 'success');
          this.loadProducts();
        },
        error: (error) => {
          console.error('Erro ao excluir produto:', error);
          this.showMessage('Erro ao excluir produto.', 'error');
        }
      });
    }
  }

  showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }
}
