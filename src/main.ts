import { GearApi } from '@gear-js/api';
import { batchTest } from './batch_test';
import { simpleTest } from './simple_test';

const TESTS = ['simple', 'batch'];

const [test, providerAddress] = process.argv.slice(2);

if (!providerAddress || !providerAddress.startsWith('wss')) {
  console.error('Error: Please provide a valid provider address starting with "wss".');
  process.exit(1);
}

if (!TESTS.includes(test)) {
  console.error("Error: Please provide a valid test name. Available tests: 'simple', 'batch'.");
  process.exit(1);
}

const main = async () => {
  const api = await GearApi.create({ providerAddress });

  switch (test) {
    case 'simple': {
      console.log('Running simple test...');
      await simpleTest(api);
      break;
    }
    case 'batch': {
      console.log('Running batch test...');
      await batchTest(api);
      break;
    }
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
