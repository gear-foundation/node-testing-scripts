import { GearApi } from '@gear-js/api';

import { VftProgram } from './extended_vft.js';


const main = async () => {
    const providerAddress = process.argv[2];

    if (!providerAddress || !providerAddress.startsWith('wss')) {
        console.error('Error: Please provide a valid provider address starting with "wss".');
        process.exit(1);
    }

    const api = await GearApi.create({ providerAddress });
   
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

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

function getRandomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}