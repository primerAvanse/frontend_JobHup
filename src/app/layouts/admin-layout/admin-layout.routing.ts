import { Routes } from "@angular/router";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { BuscarEmpleoComponent } from "src/app/pages/buscar-empleo/buscar-empleo.component";

export const AdminLayoutRoutes: Routes = [
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  { path: "buscarempleo", component: BuscarEmpleoComponent },
  { path: "notificaciones", component: NotificationsComponent }
];

