import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [NgForOf],
  template: `
    <div style="max-width:480px;margin:0 auto;padding:32px 24px;font-family:sans-serif">
      <h2 style="font-size:1.25rem;font-weight:600;color:#1e293b;margin-bottom:4px">
        Documentos de respaldo
      </h2>
      <p style="font-size:0.875rem;color:#64748b;margin-bottom:24px">
        Sube los documentos requeridos para continuar con tu solicitud
      </p>

      <div *ngFor="let doc of requiredDocs; let i = index"
           style="display:flex;align-items:center;justify-content:space-between;
                  padding:12px 16px;margin-bottom:8px;border:1px solid #e2e8f0;
                  border-radius:8px;background:#f8fafc">
        <div>
          <div style="font-size:0.875rem;font-weight:500;color:#334155">{{ doc.label }}</div>
          <div style="font-size:0.75rem;color:#94a3b8">{{ doc.hint }}</div>
        </div>
        <label style="cursor:pointer;padding:6px 14px;font-size:0.8125rem;
                      font-weight:500;color:#6366f1;border:1px solid #6366f1;
                      border-radius:6px;background:white;transition:all 0.15s;
                      white-space:nowrap">
          {{ uploaded[i] ? 'Cambiar' : 'Subir' }}
          <input type="file" (change)="onFileSelect(i, $event)" style="display:none" />
        </label>
      </div>

      <ul style="font-size:0.75rem;color:#94a3b8;margin:16px 0 24px;padding-left:16px">
        <li style="margin-bottom:4px">Formatos aceptados: PDF, JPG, PNG</li>
        <li style="margin-bottom:4px">Tamaño máximo: 10 MB por archivo</li>
      </ul>

      <button (click)="onSubmit()"
              [style]="'width:100%;padding:12px;border:none;border-radius:8px;font-size:0.9375rem;' +
                       'font-weight:600;cursor:pointer;transition:all 0.15s;' +
                       (allUploaded
                         ? 'background:#6366f1;color:white'
                         : 'background:#e2e8f0;color:#94a3b8;cursor:not-allowed')">
        Continuar
      </button>
    </div>
  `,
})
export class DocumentUploadComponent {
  @Input() emit?: (name: string, detail?: Record<string, unknown>) => void;
  @Output() submit = new EventEmitter<void>();

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
      this.uploaded[index] = true;
    }
  }

  onSubmit() {
    if (!this.allUploaded) return;
    this.emit?.('mf:document-upload:submit', { uploaded: true });
    this.submit.emit();
  }
}
