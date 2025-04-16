import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import environment from '../../environment/environment.prod';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tipo-documento',
  imports: [FormsModule, CommonModule],
  templateUrl: './tipo-documento.component.html',
})
export class TipoDocumentoComponent {
  public nombreDocumento = '';
  public mensaje = '';
  public error = '';
  public documentos: any[] = [];
  public mostrarModal = false;

  constructor(private http: HttpClient) {
    this.cargar();
  }

  cargar(): void {
    this.http.get<any>(`${environment.API_URL}/tipo-documento`).subscribe({
      next: (res) => (this.documentos = res.data),
      error: () => (this.error = 'Error al cargar los documentos'),
    });
  }

  agregar(): void {
    this.mensaje = '';
    this.error = '';

    if (!this.nombreDocumento.trim()) {
      this.error = 'El nombre del documento es obligatorio';
      return;
    }

    this.http
      .post(`${environment.API_URL}/tipo-documento`, {
        nombreDocumento: this.nombreDocumento,
      })
      .subscribe({
        next: () => {
          this.mensaje = 'Tipo de documento agregado correctamente';
          this.nombreDocumento = '';
          this.cargar(); // recargar lista
        },
        error: () => (this.error = 'Error al agregar el documento'),
      });
  }

  eliminar(id: number) {
    if (!confirm('¿Seguro que quieres eliminar este tipo de documento?'))
      return;

    this.http.delete(`${environment.API_URL}/tipo-documento/${id}`).subscribe({
      next: () => {
        this.mensaje = 'Eliminado correctamente';
        this.cargar();
      },
      error: () => (this.error = 'Error al eliminar'),
    });
  }

  abrirModal() {
    this.mostrarModal? this.mostrarModal = false: this.mostrarModal = true;
  }
}
