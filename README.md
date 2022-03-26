# Studious Eureka

![GitHub](https://img.shields.io/github/license/benedictkhoo/studious-eureka?style=flat-square)

A beginner project with smart contracts.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Install

```sh
npm i
```

## Usage

1. Create a secrets.json file in the root directory with the following properties:

```
{
    "mnemonic": "wallet mnemonic...",
    "providerUrl": "infura url",
    "etherscanAPIKey": "etherscan API key"
}
```

2. Run the project:


```sh
npm run ganache
npm run migrate
```

## Contributing

Please read the [Contributing file](CONTRIBUTING.md).

## License

[MIT](LICENSE) &copy; 2022 Benedict Khoo
