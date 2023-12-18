import { Component } from '@angular/core';
import { DatabaseService } from './services/util/database.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private databaseSV: DatabaseService) {
    this.initApp();
  }

  async initApp() {
    await this.databaseSV.initializPlugin();
    SplashScreen.hide();
  }
}
