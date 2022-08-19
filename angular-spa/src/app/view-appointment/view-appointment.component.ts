import { Component, OnInit } from "@angular/core";
import { UserService } from "../_services";

@Component({
  selector: "app-view-appointment",
  templateUrl: "./view-appointment.component.html",
})
export class ViewAppointmentComponent implements OnInit {
  appointments: any[] = [];
  constructor(private _service: UserService) {}

  ngOnInit() {
    this.getfitness();
  }

  getfitness() {
    this._service.getfitnessdata().subscribe((data) => {
      this.appointments = data;
    });
  }
}
