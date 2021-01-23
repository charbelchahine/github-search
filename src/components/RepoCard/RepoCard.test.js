import React from 'react';
import { render, screen } from '@testing-library/react';
import RepoCard from './RepoCard';

describe('the RepoCard component', () => {
  let repoName;
  let repoDescription;
  let stargazersCount;
  let watchersCount;

  beforeEach(() => {
    render(
      <RepoCard
        name="Best Repo Ever"
        description="This is the best repo ever?"
        stargazers={777}
        watchers={123}
      />
    );
    repoName = screen.getByTestId('repo-name');
    repoDescription = screen.getByTestId('repo-description');
    stargazersCount = screen.getByTestId('stargazers-count');
    watchersCount = screen.getByTestId('watchers-count');
  });

  test('renders the repo name', () => {
    expect(repoName).toHaveTextContent('Best Repo Ever');
  });

  test('renders the repo description', () => {
    expect(repoDescription).toHaveTextContent('This is the best repo ever?');
  });

  test('renders the stargazers count', () => {
    expect(stargazersCount).toHaveTextContent('777 Stargazers');
  });

  test('renders the watchers count', () => {
    expect(watchersCount).toHaveTextContent('123 People Watching');
  });
});
