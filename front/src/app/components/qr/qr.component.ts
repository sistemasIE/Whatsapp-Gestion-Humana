import { Component } from '@angular/core';
import environment from '../../environment/environment.prod';
@Component({
  selector: 'app-qr',
  imports: [],
  templateUrl: './qr.component.html',
  styleUrl: './qr.component.css'
})
export class QrComponent {
  public qrSrc: string = `${environment.BOT_URL}/qr.png`; // Replace with your QR code image URL
}
