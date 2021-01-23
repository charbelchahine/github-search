import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

const profileData = {
  avatar_url: 'https://image.com/anImage',
  login: 'jamesBond',
  location: 'Montreal',
  repos_url: 'https://api.github.com/users/jamesBond/repos',
};

const server = setupServer(
  rest.get('https://api.github.com/users/', (req, res, ctx) =>
    res(ctx.json(profileData))
  )
);

describe('the App component', () => {
  let logo;
  let searchField;
  let searchButton;

  beforeEach(() => {
    render(<App />);
    logo = screen.getByTestId('github-search-logo');
    searchField = screen.getByTestId('search-field');
    searchButton = screen.getByTestId('search-button');
  });
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('renders logo', () => {
    expect(logo).toBeTruthy();
  });

  test('renders search field', () => {
    expect(searchField).toBeTruthy();
  });

  test('renders search button', () => {
    expect(searchButton).toBeTruthy();
  });

  test('returns search results', async () => {
    fireEvent.click(searchButton);
    await waitFor(() => screen.getByTestId('search-results'));
    expect(screen.getByTestId('search-results')).toBeTruthy();
  });

  test('returns error', async () => {
    server.use(
      rest.get('https://api.github.com/users/', (req, res, ctx) =>
        res(ctx.status(404))
      )
    );

    fireEvent.click(searchButton);
    await waitFor(() => screen.getByTestId('search-error'));
    expect(screen.getByTestId('search-error')).toBeTruthy();
  });
});
