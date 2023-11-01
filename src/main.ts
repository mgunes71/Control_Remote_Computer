import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import './app/core/extensions/promise.extension';
import './app/core/extensions/lodash.extension';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
