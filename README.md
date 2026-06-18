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

## Local Development & Buy Flow

Follow these steps in order to run the full presale stack locally — Hardhat node, deployed contracts, and the React frontend — all talking to each other.

### 1. Install dependencies

```powershell
npm install --legacy-peer-deps
```

> The `--legacy-peer-deps` flag is required because some web3 libraries have peer-dependency conflicts with the React 19 tree. All Hardhat dev-dependencies are already listed in `package.json`.

### 2. Start the local Hardhat node

Open a dedicated terminal and keep it running throughout your session:

```powershell
npm run node
# equivalent: npx hardhat node
```

Hardhat prints 20 funded test accounts with their private keys on startup. Copy the private key of **Account #0** — you will need it for MetaMask in step 5.

```
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### 3. Deploy the contracts

In a **second** terminal (while the node is running):

```powershell
npm run deploy:local
# equivalent: npx hardhat run scripts/deploy.js --network localhost
```

The deploy script will:
- Deploy `SimpleERC20` (1 000 000 STAR supply)
- Deploy `Presale` at **0.001 ETH per token** (1 ETH = 1 000 tokens)
- Approve and deposit 100 000 tokens into the Presale contract
- Confirm the presale is open
- Write `src/contracts/SimpleERC20.json` and `src/contracts/Presale.json` with the deployed addresses and ABIs so the React app can import them directly

### 4. Start the frontend

In a **third** terminal:

```powershell
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000). Navigate to the hero section — the **BuyBox** will read the token price live from the contract once your wallet is connected.

### 5. Configure MetaMask

1. Open MetaMask → **Settings → Networks → Add a network manually**.
2. Fill in these values:

   | Field | Value |
   |---|---|
   | Network name | Hardhat Local |
   | New RPC URL | `http://127.0.0.1:8545` |
   | Chain ID | `31337` |
   | Currency symbol | `ETH` |
   | Block explorer URL | *(leave blank)* |

3. Click **Save**, then switch to the **Hardhat Local** network.
4. Import the Account #0 private key printed by `npm run node`:
   - MetaMask → **Import account** → paste the private key.
   - This account starts with 10 000 ETH on the local network, more than enough to test purchases.

5. Visit [http://localhost:3000](http://localhost:3000), click **Connect Wallet**, and approve the MetaMask prompt.  
   The UI will switch automatically if your wallet is on the wrong network.

### 6. Run the contract tests

```powershell
npm run test:contracts
# equivalent: npx hardhat test
```

Runs the full Hardhat/Chai test suite in `test/presale.test.js`. All 27 tests should pass without a live node — Hardhat spins up an in-memory network automatically for tests.

---

## Security Decisions

**ReentrancyGuard and the checks-effects-interactions pattern** were both applied to `buy()` as layered, complementary defences rather than choosing one over the other. `ReentrancyGuard` wraps the function in a mutex that reverts any re-entrant call before it even reaches application logic, making it safe even if a future maintainer accidentally reorders the code. The checks-effects-interactions pattern is enforced structurally: all `require()` guards run first, then the `totalRaised` state variable is incremented, and only then does `token.transfer()` execute. This ordering means that if a malicious ERC-20 token were ever substituted (one whose `transfer` callback re-entered `buy()`), the re-entrant call would see an already-updated `totalRaised` and be blocked by the mutex — two independent layers both catching the same attack vector. The explicit `require(token.transfer(...), "...")` wrapper also catches non-reverting tokens that signal failure by returning `false` instead of throwing.

**Access control** is handled through OpenZeppelin's `Ownable`, which restricts `withdraw()`, `setPrice()`, `setOpen()`, and `depositTokens()` to the deployer's address with a single `onlyOwner` modifier. The trade-off here is simplicity over flexibility: a production presale serving thousands of users would likely want a multi-sig (e.g. Gnosis Safe) as the owner so that no single key can drain funds or change the price unilaterally. That upgrade path is trivially available — `transferOwnership(multiSigAddress)` in the deploy script is all it takes — but was left out to keep the local development workflow frictionless. Similarly, `withdraw()` uses a low-level `call` rather than `transfer` to avoid the 2 300-gas stipend limitation that would silently block withdrawal if the owner address were ever a contract with a non-trivial `receive()`. The returned success flag is explicitly checked so a failed ETH send always reverts rather than silently swallowing funds.

---

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
