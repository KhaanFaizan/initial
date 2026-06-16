# Getting Started with Create React App

This project was bootstrapped with Create React App and has been extended with a minimal Hardhat smart-contract test harness intended for interview or internal testing.

## Frontend (React)

Available scripts (run from the project root):

- `npm start` — start the dev server at http://localhost:3000
- `npm test` — run frontend tests
- `npm run build` — create a production build

Notes:
- The project uses Tailwind CSS for styling.

## Smart-contracts (Hardhat)

This repository includes a basic Hardhat setup with two contracts used by the test harness:

- `contracts/SimpleERC20.sol` — a simple ERC-20 token (OpenZeppelin) used for presale deposits.
- `contracts/Presale.sol` — a small presale contract with `buy()`, `withdraw()`, and owner controls.

Dev dependencies that support the Hardhat setup are already listed in `package.json`.

Basic commands (PowerShell):

```powershell
# install dependencies (use legacy-peer-deps if your environment requires it)
npm install --legacy-peer-deps

# run Solidity unit tests
npx hardhat test

# run the demo deploy script on the in-memory hardhat network
npx hardhat run scripts/deploy.js --network hardhat

# (optional) run a local node to connect the frontend
npx hardhat node

# deploy to the local node (in a separate terminal after npx hardhat node):
npx hardhat run scripts/deploy.js --network localhost
```

Files added for smart-contract testing:

- `contracts/SimpleERC20.sol`
- `contracts/Presale.sol`
- `scripts/deploy.js`
- `test/presale.test.js`
- `.env.example` (placeholder for external RPC keys if needed)

## Assignment: Presale integration & audit exercise

This repository is intentionally structured as a short, practical evaluation for a senior blockchain/front-end engineer. The assignment below contains required tasks, acceptance criteria, hints, and a scoring rubric. Candidates should treat this as a take-home exercise and aim to produce a clear, maintainable solution.

Overview
- The goal is to integrate the existing front-end with the included Hardhat presale contract, harden the contract where appropriate, extend tests, and demonstrate a working buy flow.
- This tests practical skills: Solidity correctness and security, JavaScript/React integration, developer ergonomics (scripts/tests), and clear documentation.

Timebox suggestion
- 3–6 hours for a concise solution; more advanced polish or extra-credit items are optional.

Required tasks (must complete)
1. Make the Presale smart contract robust and well-tested:
   - Review `contracts/Presale.sol` and add unit tests for missing edge cases.
   - At minimum add tests for:
     - Buying tokens when there are insufficient tokens deposited.
     - Buying more ETH than available token allocation (precision/rounding).
     - Reverts when price is zero or when presale is closed.
     - Access control: only owner may call `withdraw()` or change price/open state.
   - Ensure tests run with `npx hardhat test` and all pass.

2. Front-end integration:
   - Wire the Buy UI (the hero/BuyBox) so a user can connect a wallet (MetaMask) and purchase tokens from the local presale contract.
   - Provide clear feedback in the UI: connected address, ETH input, token price, estimated tokens to receive, transaction pending state, success/failure notifications.
   - The UI must connect to a local Hardhat node (run `npx hardhat node`) or to the Hardhat in-memory network when invoking the demo deploy script.
   - Add a small README section documenting how to start a local node, deploy contracts to it, and use the front-end to buy.

3. Delivery & reproducibility:
   - Add npm scripts to `package.json` (if missing) for common flows, e.g.:
     - `test:contracts` -> `npx hardhat test`
     - `node` -> `npx hardhat node`
     - `deploy:local` -> `npx hardhat run scripts/deploy.js --network localhost`
   - Update README with exact commands for reviewers to reproduce your work.

Optional (extra credit)
- Add server-side or client-side validation for amounts and gas estimation.
- Implement a lightweight swap preview showing slippage and gas cost estimate.
- Add E2E test (Playwright or Puppeteer) that launches the app, connects to MetaMask (or a test wallet), and performs a buy on the local node.
- Improve contract with pull-over-push withdrawals or other best-practice patterns where justified.

Acceptance criteria (how we'll grade)
- Correctness (40%): All required unit tests pass and the buy flow works on a local Hardhat node.
- Security & Code Quality (25%): Contracts include basic safety checks (sanity checks, access control) and code is readable and commented where needed.
- Front-end UX & Integration (20%): Connect wallet, show accurate estimates, handle pending/failure states. Clear README reproduction steps.
- Documentation & Repro (15%): Scripts exist to reproduce, README updated, clear commit messages.

Minimum automatic checks (what we will run)
- `npm ci` or `npm install --legacy-peer-deps`
- `npx hardhat test` (all tests should pass)
- `npm start` and basic smoke (app should start; we'll manually test buy flow against a local node)

Security checklist (expected from candidate)
- No critical reentrancy vulnerabilities (use ReentrancyGuard or checks-effects-interactions).
- Proper access control for owner-only functions.
- Avoid arithmetic under/overflows (use solidity ^0.8.x built-ins or SafeMath patterns if necessary).
- Prefer explicit error messages in require statements.

Deliverables
- A Git branch or patch with all changes (contracts, tests, frontend) and a short README section detailing how to run and test.
- A short write-up (1–2 paragraphs) describing reasoning about any security decisions and trade-offs.

Hints & local workflow
1. Start a Hardhat node in one terminal:

```powershell
npx hardhat node
```

2. Deploy contracts to the local node (in another terminal):

```powershell
npx hardhat run scripts/deploy.js --network localhost
```

3. Start the frontend and point it at network `http://127.0.0.1:8545` (the local node):

```powershell
npm start
```

4. Use MetaMask configured to connect to `http://127.0.0.1:8545` and import one account from the Hardhat node private keys printed on startup.

Scoring rubric (example)
- 90–100: Complete solution + extra credit + excellent tests & docs.
- 75–89: Core tasks complete, good tests, minor UX or docs gaps.
- 60–74: Partial integration, some tests missing or failing, clear work but not production-ready.
- <60: Missing required tasks or tests failing.

How to submit
- Push a branch named `presale/<your-name>` and create a PR with a short description.
- Include screenshots or a short video gif showing the buy flow working (optional but appreciated).

Academic honesty
- This is an evaluation. Please do your own work. You may use public resources and libraries, but do not copy a whole external solution.

Troubleshooting
- If you see TypeScript / peer-dependency errors while installing optional web3 libraries, try:

```powershell
npm install --legacy-peer-deps
```

Resources
- Create React App docs: https://create-react-app.dev/
- Hardhat docs: https://hardhat.org/getting-started/
- OpenZeppelin Contracts: https://docs.openzeppelin.com/contracts/4.x/

*** End of assignment section ***

Troubleshooting

- If you see TypeScript / peer-dependency errors while installing optional web3 libraries, try `npm install --legacy-peer-deps`.

Resources

- Create React App docs: https://create-react-app.dev/
- Hardhat docs: https://hardhat.org/getting-started/
