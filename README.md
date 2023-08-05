# Figma React + Tailwind + Webpack Starter

This is a template project to help you setup Figma plugin along with React, Tailwind, and Webpack.

# How to use

## 1. Clone the project
You can clone this project or click the use "Use this template button"


## 2. Create your Figma plugin via Figma

Follow [this guide](https://help.figma.com/hc/en-us/articles/360042786733-Create-a-plugin-for-development) to create your Figma plugin.

Then copy the `manifest.json` to the cloned project. Make sure the `main` and `ui` properties are pointed to the correct directory:

```json
{
  "name": "your-plugin-name",
  "id": "your-plugin-id",
  "api": "1.0.0",
  "main": "./dist/code.js",
  "capabilities": [],
  "enableProposedApi": false,
  "editorType": [
    "figma"
  ],
  "ui": "./dist/ui.html",
  "networkAccess": {
    "allowedDomains": [
      "none"
    ]
  }
}
```

## 3. Run the watch script

Finally, run this command:

```bash
yarn build:watch
```

This will run webpack in the development mode.

# Reference

I used this wonderful template [https://github.com/nirsky/figma-plugin-react-template](https://github.com/nirsky/figma-plugin-react-template) as the main reference for the `webpack` and `react` setup.
