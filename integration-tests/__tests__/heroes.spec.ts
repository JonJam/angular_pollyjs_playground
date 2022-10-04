import {byRole} from '@ngneat/spectator/jest';

import {navigateToInitialPage, startApp} from '../utils/testUtils';

describe('Heroes', () => {
  it('renders a list of heroes', async () => {
    // Start app and navigate to heroes page
    const spectator = startApp();
    const url = `heroes`;
    await navigateToInitialPage(spectator, url);

    // Update view with heroes data
    await global.pollyContext.polly.flush();
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