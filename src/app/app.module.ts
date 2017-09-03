import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgRedux, NgReduxModule, DevToolsExtension } from 'ng2-redux';
import { AppState, rootReducer, INITIAL_STATE } from './store';
import { StoreEnhancer } from 'redux';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(ngRedux: NgRedux<AppState>,
              devTools: DevToolsExtension) {

    const middleware = [];
    const enhancers: StoreEnhancer<AppState>[] = isDevMode() ? [devTools.enhancer()] : [];

    ngRedux.configureStore(rootReducer, INITIAL_STATE, middleware, enhancers);
  }

 }
