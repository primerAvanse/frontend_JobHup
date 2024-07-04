import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  
  {
   path: "/user",
   title: "User Profile",
   icon: "icon-single-02",
   class: ""
  },
  {
   path: "/tables",
   title: "Table List",
   icon: "icon-puzzle-10",
   class: ""
  },
  {
   path: "/typography",
   title: "Typography",
   icon: "icon-align-center",
   class: ""
  },
  {
   path: "/buscarempleo",
   title: "Buscar Empleo",
   icon: "icon-align-center",
   class: ""
  },
  {
    path: "/notificaciones",
    title: "Notificaciones",
    icon: "icon-align-center",
    class: ""
   }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
