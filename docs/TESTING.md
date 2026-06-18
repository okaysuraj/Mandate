# 🧪 Testing Guide

Mandate is built with a dual-testing philosophy: Isolated Backend Integration tests and Full-Journey Frontend E2E tests.

---

## Backend Integration Tests
We use **Jest**, **Supertest**, and **MongoDB-Memory-Server**. This allows us to spin up a fully isolated, ephemeral MongoDB database for testing API endpoints without modifying production data.

### Running Tests
Navigate to the `backend` directory:

```bash
cd backend
npm test
```

### Philosophy
- Tests are located in `backend/src/tests/`.
- `setup.js` automatically provisions the memory server before tests and wipes it after.
- We test full Request/Response lifecycles, ensuring middlewares (`protect`, `rateLimiter`) trigger correctly.
- Examples include verifying that registering provisions a default workspace, and that creating a task accurately links to that workspace.

---

## Frontend End-to-End (E2E) Tests
We use **Playwright** to simulate real browser interactions. Playwright actually clicks buttons, fills inputs, and asserts that the DOM renders the expected React outcomes.

### Running Tests
Navigate to the `frontend` directory:

```bash
cd frontend
npx playwright test
```

To view the interactive UI report if tests fail:
```bash
npx playwright show-report
```

### Philosophy
- The test suite (`frontend/tests/e2e.spec.js`) operates on the full stack. (Ensure your local backend is running!).
- The suite simulates a "Critical User Journey":
  1. Registering a brand new account.
  2. Navigating to the Dashboard.
  3. Clicking "New Task", filling the custom Modal, and saving.
  4. Navigating to the Kanban board.
  5. Asserting the newly created task exists in the correct column.
