import { Component } from '@angular/core';
import { TipoDocumentoComponent } from '../tipo-documento/tipo-documento.component';
import { HttpClient } from '@angular/common/http';
import environment from '../../environment/environment.prod';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-documents',
  imports: [TipoDocumentoComponent, CommonModule, FormsModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
})
export class DocumentsComponent {
  solicitudes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.http.get<any>(`${environment.API_URL}/solicitar-documento`).subscribe({
      next: (res) => {
        this.solicitudes = res.data.sort(
          (a: any, b: any) =>
            new Date(a.fechaSolicitud).getTime() -
            new Date(b.fechaSolicitud).getTime()
        );
      },
      error: () => {
        alert('Error cargando solicitudes');
      },
    });
  }

  getColorClass(fecha: string): string {
    const hoy = new Date();
    const fechaSolicitud = new Date(fecha);
    const diffDias = Math.floor(
      (+hoy - +fechaSolicitud) / (1000 * 60 * 60 * 24)
    );
    if (diffDias < 1) return 'text-success';
    if (diffDias < 2) return 'text-primary';
    return 'text-danger';
  }

  aceptar(id: number) {
    this.http
      .put(`${environment.API_URL}/solicitar-documento/${id}`, {
        revisado: 1,
      })
      .subscribe({
        next: () => {
          this.solicitudes = this.solicitudes.filter(
            (solicitud) => solicitud.id !== id
          );
          this.cargarSolicitudes();
        },
        error: () => {
          alert('Error aceptando la solicitud');
        },
      });
  }

  rechazar(id: number) {
    // Aquí va la lógica de rechazo o eliminación
    this.http
      .delete(`${environment.API_URL}/solicitar-documento/${id}`)
      .subscribe({
        next: () => {
          this.cargarSolicitudes();
        },
        error: () => {
          alert('Error rechazando la solicitud');
        },
      });
    alert(`Solicitud ${id} rechazada`);
  }
}
