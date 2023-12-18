import { Component } from '@angular/core';
import { DatabaseService } from './services/util/database.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@capacitor/screen-orientation';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private databaseSV: DatabaseService,
    private plf: Platform
  ) {
    if (this.plf.is('cordova') || this.plf.is('capacitor')) {
      this.initApp();
    }
  }

  async initApp() {
    await this.databaseSV.initializPlugin();
    await ScreenOrientation.lock({
      orientation: 'portrait-primary'
    });
    SplashScreen.hide();
  }
}
