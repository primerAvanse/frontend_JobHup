import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit {
  public sidebarColor: string = "blue";

  constructor() {}

  ngOnInit() {
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var mainPanel = document.getElementsByClassName('main-panel')[0];
    sidebar.setAttribute('data', this.sidebarColor);
    mainPanel.setAttribute('data', this.sidebarColor);
  }
}
