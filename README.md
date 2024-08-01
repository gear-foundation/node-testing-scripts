# Node Testing Scripts

## Installation

First, ensure you have Node.js installed. Then, install the dependencies:

```bash
yarn install
```

## Running a Simple Test
To run a simple test, execute the following command. Replace <your_provider_address> with your actual provider address. Ensure the address starts with wss:

```bash
yarn test simple <your_provider_address>
```
For example:
```bash
yarn test simple wss://rpc.vara.network
```
Upon successful completion, the test will calculate the gas for `transfer` and `approve`, and check the state in the fungible token contract.

## Running a Load Test
To perform load testing on the node, execute the following command. Replace <your_provider_address> with your actual provider address. Ensure the address starts with wss:

```bash
yarn test batch <your_provider_address>
```

This test sends 10,000 state reading requests to the contract.
