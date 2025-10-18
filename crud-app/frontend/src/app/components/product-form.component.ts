import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  template: `
    <h2 mat-dialog-title>{{ isEditMode ? 'Editar Produto' : 'Novo Produto' }}</h2>
    
    <mat-dialog-content>
      <form [formGroup]="productForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nome</mat-label>
          <input matInput formControlName="nome" placeholder="Digite o nome do produto" required>
          <mat-error *ngIf="productForm.get('nome')?.hasError('required')">
            Nome é obrigatório
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Descrição</mat-label>
          <textarea matInput formControlName="descricao" placeholder="Digite a descrição" rows="3"></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Preço</mat-label>
          <input matInput type="number" formControlName="preco" placeholder="0.00" step="0.01" required>
          <span matPrefix>R$&nbsp;</span>
          <mat-error *ngIf="productForm.get('preco')?.hasError('required')">
            Preço é obrigatório
          </mat-error>
          <mat-error *ngIf="productForm.get('preco')?.hasError('min')">
            Preço deve ser maior que zero
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Estoque</mat-label>
          <input matInput type="number" formControlName="estoque" placeholder="0" required>
          <mat-error *ngIf="productForm.get('estoque')?.hasError('required')">
            Estoque é obrigatório
          </mat-error>
          <mat-error *ngIf="productForm.get('estoque')?.hasError('min')">
            Estoque deve ser maior ou igual a zero
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="onSubmit()" [disabled]="!productForm.valid || saving">
        {{ saving ? 'Salvando...' : 'Salvar' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      min-width: 500px;
      padding: 20px;
    }

    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }

    mat-dialog-actions {
      padding: 15px 20px;
    }
  `]
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product | null }
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data.product;
    this.initForm();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      nome: [this.data.product?.nome || '', [Validators.required]],
      descricao: [this.data.product?.descricao || ''],
      preco: [this.data.product?.preco || 0, [Validators.required, Validators.min(0.01)]],
      estoque: [this.data.product?.estoque || 0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.saving = true;
      const productData: Product = this.productForm.value;

      if (this.isEditMode && this.data.product?.id) {
        // Atualizar produto existente
        this.productService.updateProduct(this.data.product.id, productData).subscribe({
          next: () => {
            this.showMessage('Produto atualizado com sucesso!', 'success');
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Erro ao atualizar produto:', error);
            this.showMessage('Erro ao atualizar produto.', 'error');
            this.saving = false;
          }
        });
      } else {
        // Criar novo produto
        this.productService.createProduct(productData).subscribe({
          next: () => {
            this.showMessage('Produto criado com sucesso!', 'success');
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Erro ao criar produto:', error);
            this.showMessage('Erro ao criar produto.', 'error');
            this.saving = false;
          }
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
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
