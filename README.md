# Node Testing Scripts

## Installation

First, ensure you have Node.js installed. Then, install the dependencies:

```bash
npm install
```

## Running a Simple Test
To run a simple test, execute the following command. Replace <your_provider_address> with your actual provider address. Ensure the address starts with wss:

```bash
npm run simple-test -- <your_provider_address>
```
For example:
```bash
npm run simple-test -- wss://rpc.vara.network
```
Upon successful completion, the test will calculate the gas for `transfer` and `approve`, and check the state in the fungible token contract.