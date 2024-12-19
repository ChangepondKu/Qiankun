# Quinquan Micro-Frontend Library (MFE) Example

This repository demonstrates the integration of multiple micro-frontends using the Quinquan Single-SPA framework. Below are instructions and details on how to run this setup.

## Project Structure

- **main-react-app**: The container application hosting the micro-frontends.
- **micro-react-app1**: The first micro-frontend application.
- **micro-react-app2**: The second micro-frontend application.
- **micro-react-app3**: The third micro-frontend application.
- **navbar-app**: A shared application providing the navigation bar.
- **footer-app**: A shared application providing the footer.

## Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (or yarn if preferred)
- A text editor, such as [VS Code](https://code.visualstudio.com/)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd main-react-app
   ```

2. Install dependencies for each application:
   ```bash
   npm install
   cd ../micro-react-app1 && npm install
   cd ../micro-react-app2 && npm install
   cd ../micro-react-app3 && npm install
   cd ../navbar-app && npm install
   cd ../footer-app && npm install
   cd ../main-react-app
   ```

## Scripts

### Starting Individual Applications

Run the following commands to start individual applications:

- **Main App:**
  ```bash
  npm run start:main
  ```

- **Micro App 1:**
  ```bash
  npm run start:micro1
  ```

- **Micro App 2:**
  ```bash
  npm run start:micro2
  ```

- **Micro App 3:**
  ```bash
  npm run start:micro3
  ```

- **Navbar App:**
  ```bash
  npm run start:navbar
  ```

- **Footer App:**
  ```bash
  npm run start:footer
  ```

### Starting All Applications Concurrently

To start all applications at once, use the following command:

```bash
npm run start:all
```

This will use the `concurrently` package to start all applications simultaneously. Each application will run on its configured port (default configuration below):

- **Main App:** `http://localhost:3010`
- **Micro App 1:** `http://localhost:3001`
- **Micro App 2:** `http://localhost:3002`
- **Micro App 3:** `http://localhost:3003`
- **Navbar App:** `http://localhost:3004`
- **Footer App:** `http://localhost:3005`

## How It Works

1. **Quinquan Single-SPA Framework:**
   This framework integrates micro-frontends, enabling independent development and deployment while ensuring a seamless user experience.

2. **Port Configuration:**
   Each application runs on a separate port. Modify the `PORT` environment variable if needed.

3. **Shared Navbar and Footer:**
   The `navbar-app` and `footer-app` are independently developed but shared across all micro-frontends.

## Notes

- Ensure all applications are properly registered in your `single-spa-config` file.
- Synchronize shared dependencies (such as React) to avoid version conflicts.

## Troubleshooting

- If any application fails to start, check for:
  - Missing dependencies (`npm install` or `yarn install`)
  - Port conflicts (update the `PORT` variable in the scripts)
- Review logs in the terminal for specific error messages.

## Contributing

Contributions are welcome! Please create a new branch and submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
