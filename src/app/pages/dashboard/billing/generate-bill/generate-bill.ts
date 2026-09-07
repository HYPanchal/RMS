import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { RoomModel } from '../../../../core/models/room-module/room.model';
import { generateBill, getRoomById } from '../../../../core/test-data';
import { BillingResponse, GenerateBillRequest } from '../../../../core/models/billing-module/billing-DTO.model';

@Component({
  selector: 'app-generate-bill',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './generate-bill.html',
  styleUrl: './generate-bill.css',
})
export class GenerateBill {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackbarService = inject(SnackbarService);

  room = signal<RoomModel | undefined>(undefined);
  isLoading = signal(true);
  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);

  billForm = this.fb.group({
    electricityUnit: [0, [Validators.required, Validators.min(0)]]
  });

  unitsConsumed = computed(() => {
    const room = this.room();
    // const reading = this.billForm.get('electricityUnit')?.value ?? 0;
    const reading = Number(this.electricityUnit()) || 0;
    return room ? Math.max(reading - (room.lastMeterReading ?? 0), 0) : 0;
  });

  estimatedElectricityCost = computed(() => {
    const room = this.room();
    return room ? this.unitsConsumed() * room.lightPerUnit : 0;
  });

  estimatedTotal = computed(() => {
    const room = this.room();
    return room ? room.baseRent + room.waterCharges + this.estimatedElectricityCost() : 0;
  });

  electricityUnit = toSignal(
    this.billForm.get('electricityUnit')!.valueChanges,
    { initialValue: this.billForm.get('electricityUnit')?.value ?? 0 }
  );

  ngOnInit(): void {
    const roomId = Number(this.route.snapshot.paramMap.get('roomId'));
    if (!roomId) {
      this.errorMessage.set('Invalid room.');
      this.isLoading.set(false);
      return;
    }

    // getRoomById(roomId).subscribe({
    //   next: (room) => {
    //     this.room.set(room);
    //     this.billForm.patchValue({ electricityUnit: room.lastMeterReading ?? 0 });
    //     this.isLoading.set(false);
    //   },
    //   error: () => {
    //     this.errorMessage.set('Failed to load room.');
    //     this.isLoading.set(false);
    //   }
    // });

    const room = getRoomById(roomId);
    this.room.set(room);
    this.billForm.patchValue({ electricityUnit: room?.lastMeterReading ?? 0 });
    this.isLoading.set(false);
  }

  generateBillRequest: GenerateBillRequest = {
    roomId: 0,
    electricityUnit: 0
  }

  onSubmit(): void {
    const room = this.room();
    if (!room || this.billForm.invalid) {
      this.billForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const electricityUnit = this.billForm.getRawValue().electricityUnit!;

    generateBill({ roomId: room.id, electricityUnit }).subscribe({
      next: (bill) => {
        this.isSubmitting.set(false);
        this.snackbarService.success('Bill generated successfully');
        this.router.navigate(['/dashboard/billing/details', bill.id]);
      },
      error: () => {
        this.isSubmitting.set(false);
        this.errorMessage.set('Failed to generate bill.');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/billing']);
  }
}
