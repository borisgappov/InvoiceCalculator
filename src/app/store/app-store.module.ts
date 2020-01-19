import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { ActionReducer, MetaReducer, StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { DefaultDataServiceConfig, NgrxDataModule } from "ngrx-data";
import { localStorageSync } from "ngrx-store-localstorage";
import { environment } from "../../environments/environment";
import { appReducer } from "./app-reducer";
import { appStateFeatureKey, entityStateFeatureKey } from "./app-state";
import { entityConfig } from "./entity-metadata";

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [appStateFeatureKey, entityStateFeatureKey],
    rehydrate: true
  })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  imports: [
    StoreModule.forRoot({}, { metaReducers }),
    StoreModule.forFeature(appStateFeatureKey, appReducer),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    NgrxDataModule.forRoot(entityConfig)
  ],
  providers: [
    {
      provide: DefaultDataServiceConfig,
      useValue: {
        root: environment.apiUrl,
        timeout: environment.timeout
      } as DefaultDataServiceConfig
    }
  ]
})
export class AppStoreModule {}
