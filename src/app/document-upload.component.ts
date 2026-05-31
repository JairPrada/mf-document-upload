import { Component, ViewEncapsulation, ChangeDetectorRef, inject } from '@angular/core';
import { NgForOf, NgClass, NgIf } from '@angular/common';
import { publish } from '../events';

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [NgForOf, NgClass, NgIf],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="doc-root">
      <div class="doc-topbar"></div>
      <header class="doc-header">
        <div class="doc-logo">
          <div class="doc-logo-text">
            <span class="doc-logo-name">Banco Caja Social</span>
          </div>
        </div>
        <nav class="doc-nav">
          <span>Cr\u00e9dito </span>
          <span class="doc-nav-highlight">Hipotecario</span>
        </nav>
      </header>
      <main class="doc-main">
        <h2 class="doc-title">Documentos de respaldo</h2>
        <p class="doc-subtitle">Sube los documentos requeridos para continuar con tu solicitud</p>
        <div class="doc-form-wrap">
          <div class="doc-docs">
            <div *ngFor="let doc of requiredDocs; let i = index"
                 class="doc-doc-item"
                 [ngClass]="{'doc-doc-item--uploaded': uploaded[i]}">
              <div class="doc-doc-info">
                <div class="doc-doc-label">{{ doc.label }}</div>
                <div class="doc-doc-hint">{{ doc.hint }}</div>
                <div class="doc-doc-status" *ngIf="uploaded[i]">Subido</div>
              </div>
              <label class="doc-upload-btn" [ngClass]="{'doc-upload-btn--done': uploaded[i]}">
                {{ uploaded[i] ? 'Cambiar' : 'Subir' }}
                <input type="file" class="doc-file-input" (change)="onFileSelect(i, $event)" />
              </label>
            </div>
          </div>

          <ul class="doc-info-list">
            <li>Formatos aceptados: PDF, JPG, PNG</li>
            <li>Tama\u00f1o m\u00e1ximo: 10 MB por archivo</li>
          </ul>

          <button class="doc-btn" [ngClass]="{'doc-btn--active': allUploaded}"
                  [disabled]="!allUploaded" (click)="onSubmit()">
            Continuar
          </button>
        </div>
      </main>
    </div>
  `,
})
export class DocumentUploadComponent {
  private cdr = inject(ChangeDetectorRef);

  requiredDocs = [
    { label: 'Identificacion oficial', hint: 'INE o Pasaporte' },
    { label: 'Comprobante de ingresos', hint: 'Ultimos 3 meses' },
    { label: 'Comprobante de domicilio', hint: 'No mayor a 3 meses' },
  ];

  uploaded: boolean[] = [false, false, false];

  get allUploaded(): boolean {
    return this.uploaded.every(Boolean);
  }

  onFileSelect(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.uploaded = this.uploaded.map((v, i) => (i === index ? true : v));
      this.cdr.detectChanges();
    }
  }

  onSubmit() {
    if (!this.allUploaded) return;
    publish('mf-document-upload:DocumentUpload:submit', { uploaded: true });
  }
}
