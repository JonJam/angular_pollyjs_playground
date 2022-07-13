/** @jest-environment setup-polly-jest/jest-environment-jsdom */
// TODO Move to jest.config.js

import { createRoutingFactory } from '@ngneat/spectator/jest';
import {HeroesComponent} from './heroes.component';
import {AppModule} from '../app.module';
import {Polly} from '@pollyjs/core';
import * as XHRAdapter from '@pollyjs/adapter-xhr';
import * as RESTPersister from '@pollyjs/persister-rest';
import { setupPolly } from 'setup-polly-jest';

Polly.register(XHRAdapter); // TODO Determine whether angular even uses this
Polly.register(RESTPersister);

describe('HeroesComponent', () => {
  let context = setupPolly({
      adapters: ['xhr'],
      persister: 'rest',
      logLevel: 'info' // Log requests to console
  });

  const createComponent = createRoutingFactory({
    component: HeroesComponent,
    imports: [AppModule],
    stubsEnabled: false,
    detectChanges: false,
  });

  // NOTE: This will make real API requests now
  it('renders something', async () => {
    context.polly.configure({ recordIfMissing: true });

    const spectator = createComponent();

    // Trigger ngOnInit
    // https://ngneat.github.io/spectator/docs/testing-components#detectchanges
    // https://angular.io/api/core/testing/ComponentFixture#detectchanges
    // https://angular.io/guide/testing-utility-apis#componentfixture-methods
    spectator.detectChanges();

    // https://angular.io/guide/testing-utility-apis#componentfixture-methods
    // https://angular.io/guide/testing-components-scenarios#component-with-async-service
    // Wait for HTTP call
    await spectator.fixture.whenStable();

    // Update view with heroes data
    spectator.detectChanges();

    // TODO Change to not be snapshot
    expect(spectator.fixture).toMatchSnapshot();
  });
});