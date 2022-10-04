import {createRoutingFactory, SpectatorRouting} from '@ngneat/spectator/jest';
import {TestBed} from '@angular/core/testing';
import {NgZone} from '@angular/core';

import {AppComponent} from '../../src/app/app.component';
import {AppModule} from '../../src/app/app.module';

const createComponent = createRoutingFactory({
  component: AppComponent,
  imports: [AppModule],
  // Setting to false as per https://ngneat.github.io/spectator/docs/testing-with-routing#integration-testing-with-routertestingmodule
  // to perform an integration test.
  stubsEnabled: false,
  detectChanges: false
});

function startApp() : SpectatorRouting<AppComponent> {
  // Create app
  return createComponent();
}

async function navigateToInitialPage(spectator: SpectatorRouting<AppComponent>, url: string) : Promise<void> {
  // Navigate to page under test
  const ngZone = TestBed.inject(NgZone);
  await ngZone.run(async () => {
    await spectator.router.navigateByUrl(url);
  });

  // Wait for any HTTP and UI updates
  await global.pollyContext.polly.flush();
  spectator.detectChanges();
}

export { startApp, navigateToInitialPage };