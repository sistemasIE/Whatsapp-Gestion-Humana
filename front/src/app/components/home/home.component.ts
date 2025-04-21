import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reclutamiento } from '../../interfaces/reclutamiento.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import environment from '../../environment/environment.prod';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  reclutamientos: Reclutamiento[] = [];
  orden: 'nombre' | 'telefono' | 'ciudad' | 'cargo'= 'nombre';
  ascendente: boolean = true;
  busqueda: string = '';
  reclutamientosOriginal: Reclutamiento[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarReclutamientos();
  }

  cargarReclutamientos() {
    this.http
      .get<any>(`${environment.API_URL}/reclutamiento`)
      .subscribe((data) => {
        this.reclutamientosOriginal = data.data;
        this.filtrarYOrdenar();
      });
  }

  filtrarYOrdenar() {
    const filtro = this.busqueda.toLowerCase();
    this.reclutamientos = this.reclutamientosOriginal
      .filter((r) =>
        [r.nombre, r.telefono, r.ciudad].some((campo) =>
          campo?.toLowerCase().includes(filtro)
        )
      )
      .sort((a, b) => {
        const valorA = a[this.orden]?.toLowerCase?.() || '';
        const valorB = b[this.orden]?.toLowerCase?.() || '';
        return this.ascendente
          ? valorA.localeCompare(valorB)
          : valorB.localeCompare(valorA);
      });
  }

  ordenarPor(campo: 'nombre' | 'telefono' | 'ciudad' | 'cargo') {
    this.orden === campo
      ? (this.ascendente = !this.ascendente)
      : ((this.orden = campo), (this.ascendente = true));
    this.filtrarYOrdenar();
  }

  revisar(id: number) {
    this.http
      .put(`${environment.API_URL}/reclutamiento/${id}`, { revisado: 1 })
      .subscribe(() => this.cargarReclutamientos());
  }

  descartar(id: number) {
    this.http
      .delete(`${environment.API_URL}/reclutamiento/${id}`)
      .subscribe(() => this.cargarReclutamientos());
  }
}
