## Description

This is a web application for dictionary to provide users with detailed information about words, including their phonetics, meanings, and source URLs. This application fetches data from an external API and displays it in a user-friendly interface.

## Features

- **Word Search**: Users can search for any word to get detailed information.
- **Phonetics**: Displays the phonetic transcription of the word.
- **Meanings**: Provides multiple meanings and parts of speech for the word.
- **Source URLs**: Links to the sources of the word definitions.

## Installation

1. Clone the repository:

   git clone `https://github.com/foysal-m/search-pilot-dictionary.git`

2. Navigate to the project directory

3. Install dependencies:

   `npm install` && run `npm run start` to start the server

4. Open your browser and navigate to `http://localhost:4000` where express server is running.

## test

- To run the tests: `npm run test`
- To run the test with coverage report: `npm run test:coverage`

## Technologies and Concepts

## React Query

React Query is a powerful library for fetching, caching, and updating asynchronous data in React applications. It abstracts data-fetching logic, simplifies handling loading states, and ensures synchronization with the server, improving performance and reliability.

## Server-Side Rendering (SSR)

Server-Side Rendering (SSR) generates HTML on the server instead of the client, improving performance and SEO by providing fully rendered pages to the client. In this project, SSR is implemented using Express, a minimal Node.js web application framework.

## Express

**Rendering React Components on the Server**

Express is used in this app to implement Server-Side Rendering (SSR), which enables React components to be rendered on the server rather than the client. This results in faster initial page loads and improved SEO, as the server sends fully-rendered HTML to the browser. Express handles incoming requests, processes the rendering of React components using ReactDOMServer, and then sends the resulting HTML back to the client. Additionally, Express serves static files like JavaScript and CSS, ensuring the app becomes interactive after the page load.

## Webpack

Webpack is a module bundler that optimizes the build process by bundling JavaScript, managing assets, and enabling features like hot module replacement. It helps improve performance by reducing bundle size and optimizing the loading of resources.

## Jest

Jest is a JavaScript testing framework used for unit and integration testing. It simplifies testing with zero configuration, snapshot testing, and a powerful mocking library, ensuring the correctness of the codebase and detecting regressions.

## Other Technologies Used

- **React**:Facilitates the creation of the board and streamlines app development with its component-based architecture
- **ReactDOM**: Handles DOM-specific methods for efficient rendering of React components.
- **React StrictMode**: Activates additional checks and warnings to highlight potential problems in the application.
- **@tanstack/react-query-devtools**: A set of debugging tools for React Query, making it easier to track and optimize queries.
- **TypeScript**: Provides strict type checking to enhance code quality and maintainability
- **React Testing Library**: Used for unit testing to ensure component functionality and reliability
- **SCSS**: Utilized for styling the board, offering advanced features and a more maintainable CSS structure
- **i18next**: For localizing content

## Improvements to be Made:

- As I figured out hydration error, would be great to have some E2E test using cypress
