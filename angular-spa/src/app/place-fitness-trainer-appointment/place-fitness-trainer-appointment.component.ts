import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { from } from "rxjs";
import { UserService } from "../_services";

export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname: string,
    public lastname: string,
    public age: number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) {}
}

@Component({
  selector: "app-place-fitness-trainer-appointment",
  templateUrl: "./place-fitness-trainer-appointment.component.html",
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {
  fitnessForm: FormGroup;

  constructor(private fb: FormBuilder, private _service: UserService) {}

  ngOnInit() {
    this.fitnessForm = this.fb.group({
      name: ["", Validators.required],
      age: ["", Validators.required],
      email: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      addressLine1: ["", Validators.required],
      addressLine2: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      country: ["", Validators.required],
      pinCode: ["", Validators.required],
      trainerPreference: ["", Validators.required],
      needPhysioTherapist: ["", Validators.required],
      package: ["", Validators.required],
      week: ["", Validators.required],
      amount: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.fitnessForm.valid) {
      const payload = this.generatePayload(this.fitnessForm.getRawValue());
      this._service.postfitnessdata(payload);
    }
  }

  generatePayload(form) {
    const payload: Fitness = {
      firstname: form.name.split(" ").slice(1) || "",
      lastname: form.name.split(" ")[0] || "",
      age: form.age,
      email: form.email,
      phonenumber: form.phoneNumber,
      streetaddress: `${form.addressLine1}, ${form.addressLine2}`,
      city: form.city,
      state: form.state,
      country: form.country,
      pincode: form.pinCode,
      trainerpreference: form.trainerPreference,
      physiotherapist: form.needPhysioTherapist,
      packages: form.package,
      inr: form.amount,
      paisa: 0,
    };
    return payload;
  }

  calculateAmount() {
    const packageValue = this.fitnessForm.get("package").value
      ? parseInt(this.fitnessForm.get("package").value)
      : 0;
    const weeks = this.fitnessForm.get("week").value
      ? this.fitnessForm.get("week").value
      : 0;
    this.fitnessForm.get("amount").setValue(packageValue * weeks);
  }
}
