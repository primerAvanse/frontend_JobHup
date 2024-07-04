import { Component, ViewChild, TemplateRef } from '@angular/core';

import { TriggerService } from './services/trigger-service.service';
import { NgxLoadingComponent, ngxLoadingAnimationTypes } from 'ngx-loading';


const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'JobHup.app';

  @ViewChild('ngxLoading') ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate') customLoadingTemplate: TemplateRef<any>;

  public ngxLoadingAnimationType = ngxLoadingAnimationTypes.pulse;
  public primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;
  public loadingTemplate: TemplateRef<any>;
  public loading = false;

  constructor(private triggerServiceInstance: TriggerService) {


    this.triggerServiceInstance.listenLoaderPetition().subscribe(() => {
      this.showLoader();
    });

    this.triggerServiceInstance.listenLoaderOutPetition().subscribe(() => {
      this.hideLoader();
    });

  }

  showLoader(): void {
    setTimeout(() => {
      this.loading = true;
    }, 50);

  }
  hideLoader(): void {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
}
