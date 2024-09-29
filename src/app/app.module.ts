import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideRemoteConfig, getRemoteConfig } from '@angular/fire/remote-config';
import { environment } from '../environments/environment';
import { LocalStorageTaskRepository } from './infrastructure/adapters/local-storage-task.repository';
import { ENCRYPTION_KEY } from './infrastructure/services/encrypted-storage/encryption-key.token';
import { TASK_REPOSITORY_TOKEN } from './application/ports/task-repository.token';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: TASK_REPOSITORY_TOKEN, useClass: LocalStorageTaskRepository },
    { provide: ENCRYPTION_KEY, useValue: environment.encryptionKey },
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideRemoteConfig(() => getRemoteConfig()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
