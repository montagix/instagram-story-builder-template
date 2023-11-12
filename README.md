# Instagram Story Builder Template


## Installation

To set up the Instagram Story Builder template, follow these steps:

1. Clone the repository to your local machine.

```shell
git clone https://github.com/montagix/instagram-story-builder-template.git
```

2. Navigate to the project directory.

```shell
cd instagram-story-builder-template
```

3. Set up the `.npmrc` file with the following configuration to use GitHub Packages:
```shell
@montagix:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=your-access-key 
```

Replace `your-access-key` with the access token provided by [Montagix](https://montagix.com/).

4. Install the necessary packages using npm:

```shell
npm install
```

5. (Optional) Create a `.env` file in the root directory of the project and add your Giphy API key:

```
VITE_GIPHY_KEY=<your-giphy-api-key>
```

Replace `<your-giphy-api-key>` with your actual Giphy API key to enable GIF functionality.

6. Start the project

```shell
npm start
```