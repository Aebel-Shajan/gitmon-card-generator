# Contributing Guidelines

Thank you for your interest in contributing to the project! Here's some stuff which may help you out when contributing

If you do a succesfull pr I'll add your gitmon card to the [bottom of the README.md](../README.md#contributors)

## Table of Contents
- [Getting Started](#getting-started)
- [Code Style](#code-style)
- [Testing](#testing)
- [Documentation](#documentation)
- [License](#license)

## Getting Started
To get started with contributing to our project, please follow these steps:
1. Fork the repository.
2. Clone the forked repository to your local machine.
3. Install the project dependencies by running `npm install`.
(See [README](../README.md#usage) for full setup instructions)
4. Make your desired changes or additions.
5. Test your changes locally to ensure they work as expected.
6. Commit your changes.
7. Push your changes to your forked repository.
8. Submit a pull request to the main repository.

## Code Style
I got a precommit thing going on with husky and lint staged. If they are too annoying let me know and I'll remove them.

Do this command in the terminal to check if your staged changes are commit ready:
```
npm run pre-commit
```
(or `npx lint-staged` (they do the same thing.) )

Precommmit hooks run before every commit and ensures your code is properly formatted before committing.

## Testing
Upto you 

## Documentation
If you feel like it, add some [tsdocs/jsdocs](https://tsdoc.org/) to your functions.

## License
By contributing to this project, you agree that your contributions will be licensed under the [MIT License](LICENSE).


![sPINing](./assets/you-me-spin.gif)