import React from 'react';
import T from 'prop-types';

import { Star } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';
import { formatUrlLinks } from 'utils/globalHelpers';

import {
  ContainerTitle,
  ContributorContent,
  ContributorImage,
  ContributorRep,
  ContributorRepo,
  ContributorUsername,
  ContributorUsernameWrapper,
  RepoImage,
  StarWrapper,
  StyledPrimaryButton,
  TopContributorsContainer,
} from './styledComponents';

const contributorsData = [
  {
    rep: 20,
    image: 'https://rysolv.s3.us-east-2.amazonaws.com/tylerprofile.png',
    username: 'norris23',
    repoUrl: 'https://github.com/tylermaran',
  },
  {
    rep: 25,
    image: 'https://rysolv.s3.us-east-2.amazonaws.com/annaprofile.png',
    username: 'annapo',
    repoUrl: 'https://github.com/annapo23',
  },
  {
    rep: 109,
    image: 'https://rysolv.s3.us-east-2.amazonaws.com/paulprofile.png',
    username: 'paulhouse45',
    repoUrl: 'https://github.com/paulhouse',
  },
];

const GithubLink = iconDictionary('github');
const GitlabLink = iconDictionary('gitlab');

const TopContributorsModal = ({ handleNav }) => (
  <TopContributorsContainer>
    <ContainerTitle>Top contributors</ContainerTitle>
    {contributorsData.map(({ image, rep, repoUrl, username }, index) => {
      if (index < 5) {
        const isGithubLink = repoUrl.includes('github');
        const repoImage = isGithubLink ? GithubLink : GitlabLink;
        const repoLink = isGithubLink
          ? `@${formatUrlLinks({ githubLink: repoUrl })}`
          : `@${formatUrlLinks({ gitlabLink: repoUrl })}`;
        return (
          <ContributorContent>
            {index + 1}
            <ContributorImage src={image} />
            <ContributorUsernameWrapper>
              <ContributorUsername>{username}</ContributorUsername>
              <ContributorRepo>
                <RepoImage>{repoImage}</RepoImage>
                {repoLink}
              </ContributorRepo>
            </ContributorUsernameWrapper>
            <ContributorRep>
              <StarWrapper>
                <Star />
              </StarWrapper>
              <div>{rep}</div>
            </ContributorRep>
          </ContributorContent>
        );
      }
      return null;
    })}
    <StyledPrimaryButton
      label="Browse Users"
      onClick={() => handleNav('admin/users')}
    />
  </TopContributorsContainer>
);

TopContributorsModal.propTypes = {
  handleNav: T.func.isRequired,
};

export default TopContributorsModal;
