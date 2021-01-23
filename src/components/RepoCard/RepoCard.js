import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, CardHeader, CardContent } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';

const RepoCard = ({ name, description, stargazers, watchers }) => (
  <Card className="repoCard">
    <CardHeader
      avatar={
        <Avatar className="cardAvatar">
          <CodeIcon />
        </Avatar>
      }
      title={name}
      titleTypographyProps={{ 'data-testid': 'repo-name' }}
      subheader={
        <div className="cardSubheader">
          <span data-testid="stargazers-count">{`${stargazers} Stargazers`}</span>
          <span data-testid="watchers-count">{`${watchers} People Watching`}</span>
        </div>
      }
    />
    <CardContent data-testid="repo-description">{description}</CardContent>
  </Card>
);

export default RepoCard;

RepoCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  stargazers: PropTypes.number.isRequired,
  watchers: PropTypes.number.isRequired,
};

RepoCard.defaultProps = {
  description: '',
};
