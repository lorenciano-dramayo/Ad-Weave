# Adweave Admin App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).


## Dependencies/Frameworks

- [Material UI](https://material-ui.com/)
- [React Router](https://reactrouter.com/web/guides/quick-start)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Animation for Tabs] yarn add react-swipeable-views
- [Kanban Trello] yarn add react-trello
- yarn add @syncfusion/ej2-react-gantt
- yarn add react-reflex
- yarn add react-datepicker

- npm install --save @progress/kendo-react-grid @progress/kendo-data-query @progress/kendo-react-data-tools @progress/kendo-react-inputs @progress/kendo-react-intl @progress/kendo-react-dropdowns @progress/kendo-react-dateinputs @progress/kendo-drawing @progress/kendo-react-animation @progress/kendo-licensing @progress/kendo-react-buttons @progress/kendo-react-treeview @progress/kendo-react-dialogs

- npm install --save @progress/kendo-theme-default
- npm install axios --save
- npm install util
// date-fns
- npm install @date-io/date-fns



## Project Structure

```
.
├── src                     # Source files
│   ├── app                 # App entry point/wrapper
│   ├── assets              # Static assets (images, icons, etc.)
│   ├── components          # Global components
│   ├── config              # Environment/constant variables
│   ├── pages               # App routes
│   │   ├── Users
│   │   │   └── UserDetails # Sub routes
│   ├── services            # API and third party integration files
│   ├── store
│   │   ├── reducers        # Reducers
│   │   └── index.js        # Redux store config/root
|   ├── theme               # App theme
│   └── index.jsx           # Root
└── README.md
```


## Development

### Getting Started

Install dependencies:

```bash
$ yarn
```

Run in dev mode:
```bash
$ yarn start
```

Testing:
```bash
$ yarn test
```

### Useful VSCode Plugins

- [Babel Javascript](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel)
- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
