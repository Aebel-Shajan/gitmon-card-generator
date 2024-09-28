# Gitmon Card Generator

Enter your github username to generate your own gitmon card.

https://gitmon-card-generator.vercel.app/

[![][thumbnail]](https://gitmon-card-generator.vercel.app/)

## Contents
* [Technology Stack](#technology-stack)
* [Usage](#usage)
* [Contributors](#contributors)

## Technology Stack

Tech | Description
-|-
![][typescript] | TypeScript is a statically typed superset of JavaScript that compiles to plain JavaScript.
![][react] | React is a JavaScript library for building user interfaces.
![][vite] | Vite is a fast build tool for modern web applications.
![][eslint] | ESLint is a pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
![][prettier] | Prettier is a code formatter that helps maintain consistent code style across different projects and developers.
Husky	| Used to run linting & formatting when code is commited.
lint-staged	| Tool that runs linters on files staged for commit in Git to ensure code quality before committing changes.
![][npm] | npm is the package manager for the Node.js ecosystem.

## Usage
### Prerequisites
Before setting up the project, make sure you have the following tools installed:
* Node.js (version 14 or higher recommended)
* Git (for cloning the repository)
* A terminal (To enter the commands into)

### Project Setup
1. Clone the repository:
```bash
git clone https://github.com/Aebel-Shajan/gitmon-card-generator.git
```
2. Navigate into the project directory:
```bash
cd gitmon-card-generator
```
3. Install npm dependencies:
```bash
npm install
```
### Running the Project
1. Start the vite development server
```bash
npm run dev
```
2. Go to http://localhost:5173/ or the link displayed in the terminal


[typescript]: https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge
[react]: https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=for-the-badge
[vite]: https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=for-the-badge
[eslint]: https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=fff&style=for-the-badge
[prettier]: https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=fff&style=for-the-badge
[npm]: https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff&style=for-the-badge

[thumbnail]: https://raw.githubusercontent.com/Aebel-Shajan/gitmon-card-generator/main/thumbnail.png

## Contributors
Contributions are more than welcome :). If you have a feature request [raise an issue](https://github.com/Aebel-Shajan/gitmon-card-generator/issues/new). Also feel free to fork and [submit a pull request too.](https://github.com/Aebel-Shajan/gitmon-card-generator/compare). If the precommit hooks are a pain i'll remove them.

Read [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for more details

[![][aebel-card]][aebel-gh] | [![][octocat-card]][octocat-gh] | [![][octocat-card]][octocat-gh] | [![][octocat-card]][octocat-gh]
-|-|-|-


<!-- Links -->
[aebel-gh]: https://github.com/aebel-shajan
[octocat-gh]: https://github.com/octocat

<!-- Assets -->
[aebel-card]: ./docs/assets/gitmon-aebel-shajan.png
[octocat-card]: ./docs/assets/gitmon-octocat.png