import { setupPolly } from 'setup-polly-jest';
import path from 'path';
import {PollyConfig} from '@pollyjs/core';
import {MODES} from '@pollyjs/utils';

// This is inspired by:
// - pollyjs TypeScript example: https://github.com/Netflix/pollyjs/blob/master/examples/typescript-jest-node-fetch/src/utils/auto-setup-polly.ts
// - spotify/polly-jest-preset: https://github.com/spotify/polly-jest-presets/blob/master/src/pollyContext.ts

function getPollyMode() : "record" | "replay" {
  let mode: PollyConfig['mode'] = MODES.REPLAY;

  switch (process.env['POLLY_MODE']) {
    case 'record':
      mode = MODES.RECORD;
      break;
    case 'replay':
      mode = MODES.REPLAY;
      break;
    case 'offline':
      mode = MODES.REPLAY;
      break;
  }

  return mode;
}

function getDefaultRecordingDir() {
  // This is setup using a custom jest environment
  const testPath: string = (global as any).testPath;

  return path.relative(
    process.cwd(),
    `${path.dirname(testPath)}/__recordings__`,
  );
}

const pollyContext = setupPolly({
    recordIfMissing: false,
    mode: getPollyMode(),
    // Having to use require imports due to https://github.com/gribnoysup/setup-polly-jest/issues/23
    adapters: [require('@pollyjs/adapter-xhr')],
    persister: require('@pollyjs/persister-fs'),
    persisterOptions: {
      fs: {
        recordingsDir: getDefaultRecordingDir(),
      },
      // Improve diff readability for git. See https://netflix.github.io/pollyjs/#/configuration?id=disablesortingharentries
      disableSortingHarEntries: true,
    },
    flushRequestsOnStop: true,
    recordFailedRequests: true,
    // Default level is warn. Useful to see PollyJs Recorded or Replayed logs
    logLevel: 'info',
    expiryStrategy: 'error',
    expiresIn: '14d',
    // Insulate the tests from differences in session data.
    //
    // See https://netflix.github.io/pollyjs/#/configuration?id=matchrequestsby for options.
    matchRequestsBy: {
      headers: false,
      body: false,
    },
  });

beforeEach(() => {
  // Grouping common requests so that they share a single recording.
  //
  // See https://netflix.github.io/pollyjs/#/server/route-handler?id=recordingname
  //
  // TODO Add common requests.
  // pollyContext.polly.server.any('/api/example').recordingName('Example');
});

global.pollyContext = pollyContext;
