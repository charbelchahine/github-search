import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import StarIcon from '@material-ui/icons/Star';
import RepoCard from '../RepoCard/RepoCard';

const UserProfile = ({ profileData }) => {
  const {
    avatar_url: avatarUrl,
    login,
    location,
    repos_url: repoURL,
  } = profileData;
  const [repositories, setRepositories] = useState(undefined);
  const [sort, setSort] = useState('alphabetical');

  useEffect(
    () =>
      axios
        .get(repoURL)
        .then((response) => setRepositories(response.data))
        .catch(() => {}),
    [repoURL]
  );

  const sortRepos = (a, b) =>
    sort === 'stargazers'
      ? a.stargazers_count - b.stargazers_count
      : a.name.localeCompare(b.name);

  return (
    <div data-testid="search-results">
      <div className="profileHeader">
        <div className="profileInfo">
          <Avatar
            src={avatarUrl}
            className="profileAvatar"
            alt="profile avatar"
            data-testid="profile-avatar"
          />
          <div className="profileDetails">
            {login && (
              <span
                className="profileUsername"
                data-testid="profile-username"
              >{`@${login}`}</span>
            )}
            {location && (
              <span className="profileLocation">
                <LocationOnIcon />
                <span data-testid="profile-location">{location}</span>
              </span>
            )}
          </div>
        </div>
        <div className="toggleButtonGroupWrapper">
          <span className="toggleButtonGroupLabel">Sort by</span>
          <ToggleButtonGroup
            exclusive
            value={sort}
            aria-label="Sort by"
            onChange={(event, newSort) => setSort(newSort)}
          >
            <ToggleButton
              value="alphabetical"
              aria-label="alphabetical order"
              data-testid="alphabetical-button"
            >
              <SortByAlphaIcon />
            </ToggleButton>
            <ToggleButton
              value="stargazers"
              aria-label="stargazers"
              data-testid="stargazers-button"
            >
              <StarIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      {repositories && (
        <div className="repoGrid">
          {repositories.sort(sortRepos).map((repo) => (
            <RepoCard
              key={repo.name}
              name={repo.name}
              description={repo.description}
              stargazers={repo.stargazers_count}
              watchers={repo.watchers_count}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;

UserProfile.propTypes = {
  profileData: PropTypes.shape({
    login: PropTypes.string,
    location: PropTypes.string,
    avatar_url: PropTypes.string,
    repos_url: PropTypes.string,
  }).isRequired,
};
