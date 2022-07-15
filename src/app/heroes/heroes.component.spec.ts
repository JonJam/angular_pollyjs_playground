import {byRole, createRoutingFactory} from '@ngneat/spectator/jest';
import {HeroesComponent} from './heroes.component';
import {AppModule} from '../app.module';
import { autoSetupPolly } from '../../test-utils/auto-setup-polly';

describe('HeroesComponent', () => {
  const pollyContext = autoSetupPolly();

  const createComponent = createRoutingFactory({
    component: HeroesComponent,
    imports: [AppModule],
    stubsEnabled: false,
    detectChanges: false,
  });

  it('renders a list of heroes', async () => {
    // ACT
    const spectator = createComponent();

    // Trigger ngOnInit
    // https://ngneat.github.io/spectator/docs/testing-components#detectchanges
    // https://angular.io/api/core/testing/ComponentFixture#detectchanges
    // https://angular.io/guide/testing-utility-apis#componentfixture-methods
    spectator.detectChanges();

    // Wait for HTTP calls to resolve
    // https://angular.io/guide/testing-utility-apis#componentfixture-methods
    // https://angular.io/guide/testing-components-scenarios#component-with-async-service
    // await spectator.fixture.whenStable();
    // https://netflix.github.io/pollyjs/#/api?id=flush
    // Need to use this otherwise promises won't resolve until after polly is stopped when test completes
    await pollyContext.polly.flush();

    // Update view with heroes data
    spectator.detectChanges();

    // ASSERT
    const heroes : HTMLLIElement[] = spectator.queryAll(byRole('listitem'));

    const linkContents = heroes.map(li => {
      const link = li.querySelector('a');

      if (link === null || link.textContent === null) {
        return "";
      }

      return link.textContent.trim();
    });

    const expected =  [
      '1 Leanne Graham',
      '2 Ervin Howell',
      '3 Clementine Bauch',
      '4 Patricia Lebsack',
      '5 Chelsey Dietrich',
      '6 Mrs. Dennis Schulist',
      '7 Kurtis Weissnat',
      '8 Nicholas Runolfsdottir V',
      '9 Glenna Reichert',
      '10 Clementina DuBuque'
    ];

    expect(linkContents).toEqual(expect.arrayContaining(expected));
  });
});