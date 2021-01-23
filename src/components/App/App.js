import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import logo from '../../logo.svg';
import UserProfile from '../UserProfile/UserProfile';

const searchButtonClasses = {
  root: 'searchButtonRoot',
  contained: 'searchButtonContained',
  label: 'searchButtonLabel',
};

function App() {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [result, setResult] = useState(undefined);

  const onClick = () =>
    axios
      .get(`https://api.github.com/users/${value}`)
      .then((response) => {
        setError(false);
        setResult(response);
      })
      .catch(() => {
        setError(true);
        setResult(undefined);
      });

  return (
    <div className="app">
      <div className={`searchSection ${result && 'minimized'}`}>
        <img
          src={logo}
          className="logo"
          alt="logo"
          data-testid="github-search-logo"
        />
        <div className="searchRow">
          <TextField
            error={error}
            size="small"
            variant="outlined"
            placeholder="Search Github"
            data-testid="search-field"
            value={value}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            helperText={error && 'Error 404, something went wrong'}
            FormHelperTextProps={{ 'data-testid': 'search-error' }}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            variant="contained"
            classes={searchButtonClasses}
            onClick={() => onClick()}
            data-testid="search-button"
          >
            search
          </Button>
        </div>
      </div>
      {result && <UserProfile profileData={result.data} />}
    </div>
  );
}

export default App;
