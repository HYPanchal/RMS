import { Component, inject } from '@angular/core';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'snack-bar',
  standalone: true,
  templateUrl: './snack-bar.html',
  styleUrl: './snack-bar.css',
})
export class SnackBar {
  snackbarService = inject(SnackbarService);

  close(): void {
    this.snackbarService.dismiss();
  }
}
