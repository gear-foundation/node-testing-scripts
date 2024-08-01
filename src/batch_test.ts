import { GearApi } from '@gear-js/api';

import { VftProgram } from './extended_vft.js';

export const batchTest = async (api: GearApi) => {
  const programId = '0xc95a344edea5b31388114c87db3012d8f84fad21bfdbc2b7df111659e7553297';
  const program = new VftProgram(api, programId);

  const numberOfRequests = 1000;
  const numberOfCycles = 100;

  let totalRequestsSent = 0;

  for (let cycle = 0; cycle < numberOfCycles; cycle++) {
    const balancePromises = Array.from({ length: numberOfRequests }, () => program.vft.balances());
    await Promise.all(balancePromises);

    totalRequestsSent += numberOfRequests;
    console.log(`${totalRequestsSent} requests are sent`);
  }
};
