import { Component, Input } from "@angular/core";
import { InputFormComponent } from "../../component/input-form/input-form";

@Component({
  selector: "app-home",
  templateUrl: "./home.template.html",
  styleUrls: ["./home.styles.css"],
  imports: [InputFormComponent],
})
export class HomeComponent {   }