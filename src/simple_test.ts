import { GearApi, GearKeyring, decodeAddress } from '@gear-js/api';
import fs from 'fs';
import { Keyring } from '@polkadot/api';
import { VftProgram } from './extended_vft.js';

const main = async () => {
    const providerAddress = process.argv[2];

    if (!providerAddress || !providerAddress.startsWith('wss')) {
        console.error('Error: Please provide a valid provider address starting with "wss".');
        process.exit(1);
    }

    const api = await GearApi.create({ providerAddress });

    const keyring = new Keyring({ type: 'sr25519', ss58Format: 42 });
    const alice = keyring.addFromUri('//Alice');
    const bob = keyring.addFromUri('//Bob');
   
    const programId = '0xc95a344edea5b31388114c87db3012d8f84fad21bfdbc2b7df111659e7553297';
    const program = new VftProgram(api, programId);

    let transaction = await program.vft.transfer(decodeAddress(bob.address), BigInt(10000)).withAccount(alice).calculateGas();
    console.log(`Gas calculated for transfer tx: ${transaction.extrinsic['method']['args'][2]}`);

    transaction = await program.vft.approve(decodeAddress(bob.address), BigInt(10000)).withAccount(alice).calculateGas();
    console.log(`Gas calculated for approve tx: ${transaction.extrinsic['method']['args'][2]}`);

    const allBalances = await program.vft.balances();
    console.log(`Balances are read, the amount of users: ${allBalances.length}`);
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