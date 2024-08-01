import { GearApi, decodeAddress } from '@gear-js/api';
import { Keyring } from '@polkadot/api';
import { VftProgram } from './extended_vft.js';

export const simpleTest = async (api: GearApi) => {
  const keyring = new Keyring({ type: 'sr25519', ss58Format: 42 });
  const alice = keyring.addFromUri('//Alice');
  const bob = keyring.addFromUri('//Bob');

  const programId = '0xc95a344edea5b31388114c87db3012d8f84fad21bfdbc2b7df111659e7553297';
  const program = new VftProgram(api, programId);

  let transaction = await program.vft
    .transfer(decodeAddress(bob.address), BigInt(10000))
    .withAccount(alice)
    .calculateGas();
  console.log(`Gas calculated for transfer tx: ${transaction.extrinsic['method']['args'][2]}`);

  transaction = await program.vft.approve(decodeAddress(bob.address), BigInt(10000)).withAccount(alice).calculateGas();
  console.log(`Gas calculated for approve tx: ${transaction.extrinsic['method']['args'][2]}`);

  const allBalances = await program.vft.balances();
  console.log(`Balances are read, the amount of users: ${allBalances.length}`);
};
