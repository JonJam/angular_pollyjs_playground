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

  // TODO Exact magic here for detectChanged vs whenStable
  // NOTE: This will make real API requests now
  it('renders something', async () => {
    const spectator = createComponent();

    // Trigger ngOnInit
    spectator.detectChanges();

    // Await for promises to resolve
    await spectator.fixture.whenStable();

    // Trigger ngOnInit
    spectator.detectChanges();

    // TODO Change to not be snapshot
    expect(spectator.fixture).toMatchSnapshot();
  });
});