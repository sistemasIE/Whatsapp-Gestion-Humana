import { Component } from '@angular/core';
import environment from '../../environment/environment.prod';
import { Otro } from '../../interfaces/otro.interface';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-others',
  imports: [FormsModule, CommonModule],
  templateUrl: './others.component.html',
  styleUrl: './others.component.css',
})
export class OthersComponent {
  otros: Otro[] = [];
  filtrados: Otro[] = [];
  termino: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.http.get<any>(`${environment.API_URL}/otros/`).subscribe((res) => {
      this.otros = res.data;
      this.aplicarFiltro();
    });
  }

  aplicarFiltro() {
    const t = this.termino.toLowerCase().trim();
    this.filtrados = this.otros.filter(
      (o) =>
        o.motivo.toLowerCase().includes(t) ||
        o.nombre.toLowerCase().includes(t) ||
        o.revisado.toString().includes(t)
    );
  }

  aceptar(id: number) {
    this.http
      .put(`${environment.API_URL}/otros/${id}`, { revisado: true })
      .subscribe(() => this.obtenerDatos());
  }

  rechazar(id: number) {
    this.http
      .delete(`${environment.API_URL}/otros/${id}`)
      .subscribe(() => this.obtenerDatos());
  }
}
