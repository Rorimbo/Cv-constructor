import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CityDialogComponent } from '../city-dialog/city-dialog.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-cv-creator',
  templateUrl: './cv-creator.component.html',
  styleUrls: ['./cv-creator.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class CvCreatorComponent {
  // form: FormGroup;
  isOnPreview: boolean = false;
  age: number;
  ageText: string = '';

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder) {
    /*   this.form = new FormGroup({
      surname: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),

      city: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      exp: new FormControl('', [Validators.required]),
      about: new FormControl('', []),
    }); */

    this.firstFormGroup = new FormGroup({
      surname: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    });

    this.secondFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{10}'),
      ]),
      address: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });

    this.thirdFormGroup = new FormGroup({
      agreement: new FormControl('', [Validators.requiredTrue]),
      notification: new FormControl('', []),
    });
  }
  /* 
  getFormControl(formControlName: string) {
    return this.form.get(formControlName);
  } */

  // () => {}

  switchMode() {
    this.isOnPreview = !this.isOnPreview;
  }

  checkIfButtonDisabled() {
    return (
      this.firstFormGroup.invalid ||
      this.secondFormGroup.invalid ||
      this.thirdFormGroup.invalid
    );
  }
  /* 
  openDialog() {
    let config = {
      width: '60vw',
    };
    const dialogRef = this.dialog.open(CityDialogComponent, config);
    dialogRef.afterClosed().subscribe((city: string) => {
      this.form.get('city')?.setValue(city);
    });
  } 

  getDateRow() {
    let text: string = '';
    text = this.form.value['gender'] == 'Мужской' ? 'Родился: ' : 'Родилась: ';
    text += this.form.value['date'].toLocaleDateString('ru-RU');
    return text;
  }

  getAge() {
    let today: Date = new Date();
    let age;
    if (this.form.value['date'] instanceof Date) {
      age = today.getTime() - this.form.value['date'].getTime();
      age = new Date(age).getFullYear() - 1970;
    }
    return age;
  }*/

  openDialog() {
    let config = {
      width: '60vw',
    };
    const dialogRef = this.dialog.open(CityDialogComponent, config);
    dialogRef.afterClosed().subscribe((city: string) => {
      this.firstFormGroup.get('city')?.setValue(city);
    });
  }

  getDateRow() {
    if (!this.firstFormGroup.value['gender']) {
      return;
    }
    let text: string = '';
    text =
      this.firstFormGroup.value['gender'] == 'Мужской'
        ? 'Родился: '
        : 'Родилась: ';
    text += this.secondFormGroup.value['date'].toLocaleDateString('ru-RU');
    return text;
  }

  getGender() {
    if (!this.firstFormGroup.value['gender']) {
      return;
    }
    return this.firstFormGroup.value['gender'] == 'Мужской'
      ? 'Мужчина,'
      : 'Женщина,';
  }

  getAge() {
    let today: Date = new Date();
    if (this.secondFormGroup.value['date'] instanceof Date) {
      this.age = today.getTime() - this.secondFormGroup.value['date'].getTime();
      this.age = new Date(this.age).getFullYear() - 1970;
    }
    if (!this.age || this.age < 0) return;
    return this.age;
  }

  getAgeText() {
    if (!this.age || this.age < 0) return;
    if (this.age % 100 != 11 && this.age % 10 == 1) {
      this.ageText = 'год';
    } else if (
      this.age != 12 &&
      this.age != 13 &&
      this.age != 14 &&
      this.age > 1 &&
      this.age < 5
    ) {
      this.ageText = 'года';
    } else {
      this.ageText = 'лет';
    }
    return this.ageText;
  }
}
