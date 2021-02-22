import React from 'react';
import T from 'prop-types';

import { CheckboxWithLabel, ConditionalRender } from 'components/base_ui';

import { RepoCard, StyledExistingRepos } from './styledComponents';

const ExistingRepos = ({
  activeUser,
  handleClearRepo,
  handleInputChange,
  handleUpdateRepo,
  repoData,
}) => {
  const hadRepos = activeUser.repos && activeUser.repos.length > 0;

  const handleUnselect = () => {
    handleClearRepo();
    handleInputChange({
      field: 'organizationId',
      form: 'repoData',
      value: '',
    });
  };

  const handleSelect = id => {
    activeUser.repos.forEach(el => {
      if (el.id === id) {
        const selectedRepos = {
          importUrl: { error: '', value: '' },
          organizationDescription: { error: '', value: el.description },
          organizationId: { error: '', value: el.id },
          organizationLogo: { error: '', value: el.logo },
          organizationName: { error: '', value: el.name },
          organizationRepo: { error: '', value: el.repoUrl },
          organizationUrl: { error: '', value: el.organizationUrl },
        };
        handleUpdateRepo({ repoData: selectedRepos });
      }
    });

    handleInputChange({
      field: 'organizationId',
      form: 'repoData',
      value: id,
    });
  };

  const userRepos = activeUser.repos.map(el => {
    const checked = el.id === repoData.organizationId.value;

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
