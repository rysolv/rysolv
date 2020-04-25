import styled from 'styled-components';

import { PrimaryButton } from 'components/base_ui';

export const ContainerTitle = styled.div`
  border-bottom: 0.1rem solid #cfd8dc;
  color: rgba(0, 0, 0, 0.7);
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
  min-height: 2rem;
  padding: 1.5rem 2%;
  padding: 1rem 2%;
  text-align: center;
  width: 100%;
`;

export const ContributorContent = styled.li`
  align-items: center;
  color: rgba(0, 0, 0, 0.7);
  display: flex;
  font-size: 1.6rem;
  list-style: none;
  margin-bottom: 1rem;
  padding: 0.5rem;
  position: relative;

  &:after {
    border-bottom: 0.1rem solid #cfd8dc;
    bottom: 0;
    content: '';
    left: 0;
    margin: 0 auto;
    position: absolute;
    right: 0;
    text-align: center;
    width: 90%;
  }

  & :last-child {
    border-bottom: none;
  }
`;

export const ContributorImage = styled.img`
  align-self: center;
  border-radius: 50%;
  height: 3.6rem;
  margin: 0 1rem;
  width: 3.6rem;
`;

export const ContributorRep = styled.div`
  align-items: center;
  color: rgba(0, 0, 0, 0.7);
  display: flex;
  font-size: 1.6rem;
  font-weight: 500;
  justify-content: space-between;
  margin: 0 1rem;
  white-space: nowrap;
`;

export const ContributorRepo = styled.div`
  color: #6a737d;
  display: flex;
  font-size: 1.35rem;
`;

export const ContributorUsername = styled.div`
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.6rem;
  font-weight: bolder;
  line-height: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ContributorUsernameWrapper = styled.div`
  line-height: 2rem;
  padding: 0.5rem;
  width: 65%;
`;

export const RepoImage = styled.div`
  align-items: center;
  display: flex;
  margin-right: 0.5rem;
`;

export const StarWrapper = styled.div`
  padding: 0.5rem;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  align-self: center;
  font-size: 1.4rem;
`;

export const TopContributorsContainer = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  border: 0.1rem solid #cfd8dc;
  display: flex;
  flex-direction: column;
`;
