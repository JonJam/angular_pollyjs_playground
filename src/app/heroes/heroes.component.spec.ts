import { createRoutingFactory } from '@ngneat/spectator/jest';
import {HeroesComponent} from './heroes.component';
import {AppModule} from '../app.module';

describe('HeroesComponent', () => {
  const createComponent = createRoutingFactory({
    component: HeroesComponent,
    imports: [AppModule],
    stubsEnabled: false,
    detectChanges: false,
  });

  // NOTE: This will make real API requests now
  it('renders something', async () => {
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