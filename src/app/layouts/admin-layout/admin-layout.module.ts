import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { AgGridModule } from 'ag-grid-angular';
import { FullCalendarModule } from "@fullcalendar/angular";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from "@ng-select/ng-select";
import { componentsAgrid } from "src/app/components/ag-grid";
import { componentsShared } from "src/app/components/shared";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgMultiSelectDropDownModule,
    AgGridModule,
    FullCalendarModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forChild(),
    NgSelectModule,
  ],
  declarations: [
    UserComponent,
    TablesComponent,
    TypographyComponent,
    NotificationsComponent,
    componentsShared,
    componentsAgrid

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    NgSelectModule
  ]
})
export class AdminLayoutModule {}
