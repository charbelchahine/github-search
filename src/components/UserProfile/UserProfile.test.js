import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import UserProfile from './UserProfile';

const profileData = {
  avatar_url: 'https://image.com/anImage',
  login: 'jamesBond',
  location: 'Montreal',
  repos_url: 'https://api.github.com/users/jamesBond/repos',
};

const repositories = [
  {
    name: 'repoA',
    description: 'description for repoA',
    stargazers_count: 321,
    watchers_count: 777,
  },
  {
    name: 'repoB',
    description: 'description for repoB',
    stargazers_count: 123,
    watchers_count: 777,
  },
];

const server = setupServer(
  rest.get(profileData.repos_url, (req, res, ctx) =>
    res(ctx.json(repositories))
  )
);

describe('the UserProfile component', () => {
  let profileAvatar;
  let profileUsername;
  let profileLocation;
  let alphabeticalButton;
  let stargazersButton;

  beforeEach(async () => {
    await act(async () => {
      render(<UserProfile profileData={profileData} />);
      profileAvatar = screen.getByTestId('profile-avatar');
      profileUsername = screen.getByTestId('profile-username');
      profileLocation = screen.getByTestId('profile-location');
      alphabeticalButton = screen.getByTestId('alphabetical-button');
      stargazersButton = screen.getByTestId('stargazers-button');
    });
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('renders a profile avatar', async () => {
    // screen.debug();
    await waitFor(() => expect(profileAvatar).toBeTruthy());
  });

  test('renders the profile username', async () => {
    await waitFor(() =>
      expect(profileUsername).toHaveTextContent('@jamesBond')
    );
  });

  test('renders the profile location', async () => {
    await waitFor(() => expect(profileLocation).toHaveTextContent('Montreal'));
  });

  test('renders both alphabetical & stargazers sort buttons', async () => {
    await waitFor(() => expect(alphabeticalButton).toBeTruthy());
    await waitFor(() => expect(stargazersButton).toBeTruthy());
  });

  test('returns repos in stargazers order', async () => {
    fireEvent.click(stargazersButton);
    await waitFor(() => {
      expect(screen.getAllByTestId('stargazers-count')[0]).toHaveTextContent(
        '123 Stargazers'
      );
      expect(screen.getAllByTestId('stargazers-count')[1]).toHaveTextContent(
        '321 Stargazers'
      );
    });
  });

  test('returns repos in alphabetical order', async () => {
    fireEvent.click(alphabeticalButton);
    await waitFor(() => {
      expect(screen.getAllByTestId('repo-name')[0]).toHaveTextContent('repoA');
      expect(screen.getAllByTestId('repo-name')[1]).toHaveTextContent('repoB');
    });
  });
});
