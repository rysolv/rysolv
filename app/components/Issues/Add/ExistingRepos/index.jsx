import React from 'react';
import T from 'prop-types';

import { CheckboxWithLabel, ConditionalRender } from 'components/base_ui';

import { RepoCard, StyledExistingRepos } from './styledComponents';

const ExistingRepos = ({
  activeUser: { repos },
  handleClearRepo,
  handleInputChange,
  handleUpdateRepo,
  repoData,
}) => {
  const hadRepos = repos && repos.length > 0;

  const handleUnselect = () => {
    handleClearRepo();
    handleInputChange({
      field: 'repoId',
      form: 'repoData',
      value: '',
    });
  };

  const handleSelect = id => {
    repos.forEach(el => {
      if (el.id === id) {
        const selectedRepos = {
          importUrl: { error: '', value: '' },
          organizationUrl: { error: '', value: el.organizationUrl },
          repoDescription: { error: '', value: el.description },
          repoId: { error: '', value: el.id },
          repoLogo: { error: '', value: el.logo },
          repoName: { error: '', value: el.name },
          repoUrl: { error: '', value: el.repoUrl },
        };
        handleUpdateRepo({ repoData: selectedRepos });
      }
    });

    handleInputChange({
      field: 'repoId',
      form: 'repoData',
      value: id,
    });
  };

  const userRepos = repos.map(el => {
    const checked = el.id === repoData.repoId.value;

    return (
      <RepoCard key={el.id}>
        <CheckboxWithLabel
          checked={checked}
          disabled={false}
          label={el.name}
          onChange={() => (checked ? handleUnselect() : handleSelect(el.id))}
        />
      </RepoCard>
    );
  });

  const RepoList = <StyledExistingRepos>{userRepos}</StyledExistingRepos>;

  const NoRepos = <StyledExistingRepos>No repos</StyledExistingRepos>;

  return (
    <ConditionalRender
      Component={RepoList}
      FallbackComponent={NoRepos}
      shouldRender={hadRepos}
    />
  );
};

ExistingRepos.propTypes = {
  activeUser: T.object,
  handleClearRepo: T.func,
  handleInputChange: T.func,
  handleUpdateRepo: T.func,
  repoData: T.object,
};

export default ExistingRepos;
