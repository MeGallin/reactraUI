# ReactraUI

A modern and blazingly fast UI library for React.

## Features

- 🚀 **Blazingly Fast**: Optimized for performance
- 📱 **Mobile-First**: Responsive components designed for all screen sizes
- ♿ **Accessible**: Built with accessibility in mind
- 🎨 **Themeable**: Easily customize to match your brand
- 🔧 **Modular**: Use only what you need
- 📦 **Lightweight**: Minimal bundle size
- 🧪 **Well-tested**: Comprehensive test coverage

## Installation

```bash
npm install reactra-ui
```

or

```bash
yarn add reactra-ui
```

## Usage

```jsx
import React from 'react';
import { ThemeProvider, Button } from 'reactra-ui';

function App() {
  return (
    <ThemeProvider>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </ThemeProvider>
  );
}
```

## Components

ReactraUI includes a comprehensive set of UI components:

- **Buttons**: Various styles, sizes, and states
- **Forms**: Input fields, checkboxes, radio buttons, selects, etc.
- **Navigation**: Navbar, tabs, breadcrumbs, etc.
- **Overlays**: Modals, tooltips, popovers, etc.
- **Cards**: Content containers with various styles
- **Feedback**: Alerts, toasts, progress indicators, etc.

## Project Architecture

The project follows a modular architecture:

```
src/
├── components/       # UI components
│   ├── Button/
│   ├── Form/
│   ├── Navigation/
│   ├── Overlay/
│   ├── Card/
│   └── Feedback/
├── hooks/            # Custom React hooks
├── theme/            # Theming system
└── utils/            # Utility functions
```

### Components

Each component is organized in its own directory with the following structure:

```
ComponentName/
├── ComponentName.tsx         # Main component implementation
├── ComponentName.test.tsx    # Tests
├── ComponentName.stories.tsx # Storybook stories
└── index.ts                  # Public API
```

### Theming

ReactraUI uses a powerful theming system that allows for deep customization:

```jsx
import { ThemeProvider } from 'reactra-ui';

// Custom theme
const myTheme = {
  colors: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    // ...other colors
  },
  // ...other theme properties
};

function App() {
  return <ThemeProvider customTheme={myTheme}>{/* Your app */}</ThemeProvider>;
}
```

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

or

```bash
yarn
```

### Development Commands

- **Start Storybook**: `npm run storybook` or `yarn storybook`
- **Build**: `npm run build` or `yarn build`
- **Test**: `npm run test` or `yarn test`
- **Lint**: `npm run lint` or `yarn lint`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
