import React, { Fragment, useEffect, useRef } from 'react';

import iconDictionary from 'utils/iconDictionary';

import {
  HeaderDescription,
  HeaderWrapper,
  LogoWrapper,
  StepContainer,
  StepContentWrapper,
  StepDescription,
  StepIconWrapper,
  StepImageWrapper,
  StepName,
  StepWrapper,
  StyledExternalLink,
  StyledHowContainer,
  StyledImageWrapper,
  StyledInternalLink,
} from './styledComponents';

const CoinIcon = iconDictionary('coin');
const SiteLogo = iconDictionary('siteLogo');

const HowTo = () => {
  const bountyRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'How To';
    const location = window.location.hash;
    if (location === '#bounties') bountyRef.current.scrollIntoView();
  }, []);

  return (
    <Fragment>
      <StyledHowContainer>
        <HeaderWrapper>What is Rysolv?</HeaderWrapper>
        <StepContainer>
          <StepWrapper>
            <HeaderDescription>
              <StepName>Crowdfunding for open source development</StepName>
              <StepDescription>
                Rysolv provides a platform for users to share issues, contribute
                to open source, and earn bounties for their work.
                <ul>
                  <li>
                    Import an issue from Github that you think needs more
                    attention. This can be one of your issues, or from a project
                    you support.
                  </li>
                  <li>
                    Add a bounty to your issue. Once an issue is on Rysolv,
                    anyone can add to the bounty.
                  </li>
                  <li>
                    <b>Submit a solution!</b> Just upload a pull request that
                    resolves the issue, and Rysolv will keep track of when it
                    gets merged in.
                  </li>
                  <li>
                    <b>Get paid!</b> Once your pull request is approved,
                    you&apos;ll be awarded any outstanding bounty on the issue.
                  </li>
                </ul>
              </StepDescription>
            </HeaderDescription>
            <StepIconWrapper>
              <LogoWrapper>{SiteLogo}</LogoWrapper>
            </StepIconWrapper>
          </StepWrapper>
        </StepContainer>

        <HeaderWrapper>Creating an Issue</HeaderWrapper>
        <StepContainer>
          <StepWrapper>
            <StepContentWrapper>
              <StepName>Step 1</StepName>
              <StepDescription>
                Import an issue from Github that you think needs more attention.
                This can be one of your issues, or from a project you support.
              </StepDescription>
            </StepContentWrapper>
            <StepImageWrapper>
              <StyledImageWrapper image="https://rysolv.s3.us-east-2.amazonaws.com/createNewIssue.png" />
            </StepImageWrapper>
          </StepWrapper>
          <StepWrapper>
            <StepContentWrapper>
              <StepName>Step 2</StepName>
              <StepDescription>
                On the Import Issue page, paste in a link any Github issue, or
                select from an issue on one of your repos.
                <ul>
                  <li>
                    For easier importing of issues, you must link your Github
                    account to Rysolv. You can do this by signing up with
                    Github, or on your{' '}
                    <StyledInternalLink to="/settings/account">
                      settings page
                    </StyledInternalLink>
                    .
                  </li>
                </ul>
              </StepDescription>
            </StepContentWrapper>
            <StepImageWrapper>
              <StyledImageWrapper image="https://rysolv.s3.us-east-2.amazonaws.com/importNewIssue.png" />
            </StepImageWrapper>
          </StepWrapper>
        </StepContainer>

        <HeaderWrapper id="funding">Funding an Issue</HeaderWrapper>
        <StepContainer>
          <StepWrapper>
            <HeaderDescription>
              <StepName>Add a bounty to an issue</StepName>
              <StepDescription>
                Looking to contribute to your favorite project? Or need to see a
                particular issue fixed? Adding a bounty to an issue supports
                maintainers, and shows which features the community needs.
              </StepDescription>
            </HeaderDescription>
            <StepIconWrapper>
              <LogoWrapper>{CoinIcon}</LogoWrapper>
            </StepIconWrapper>
          </StepWrapper>
          <StepWrapper>
            <StepContentWrapper>
              <StepName>Make a payment</StepName>
              <StepDescription>
                Select an issue that you want to fund, and fill out the payment
                information. You can contribute via card, Paypal, or with any
                funds that are in your account.
                <ul>
                  <li>
                    You will recieve an email receipt for any contribution you
                    make, as well as an update when the issue is resolved.
                  </li>
                  <li>
                    A standard transaction fee will be applied based on the
                    payment platform.
                  </li>
                </ul>
              </StepDescription>
            </StepContentWrapper>
            <StepImageWrapper>
              <StyledImageWrapper image="https://rysolv.s3.us-east-2.amazonaws.com/fundIssue.png" />
            </StepImageWrapper>
          </StepWrapper>
        </StepContainer>

        <HeaderWrapper>Submitting a Pull Request</HeaderWrapper>
        <StepContainer>
          <StepWrapper>
            <StepContentWrapper>
              <StepName>Step 1</StepName>
              <StepDescription>
                When you have a solution ready, create a pull request in the
                repo.
                <br />
                <br />
                Go to the issue on Rysolv and click <b>Submit PR</b>. When the
                modal pops up, add a link to your pull requst and click Submit.
                <ul>
                  <li>
                    To verify authenticity, you must have linked your Github
                    account to Rysolv. You can check this on your{' '}
                    <StyledInternalLink to="/settings/overview">
                      settings page
                    </StyledInternalLink>
                    .
                  </li>
                  <li>
                    To make issue tracking easier on maintainers,{' '}
                    <StyledExternalLink
                      href="https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue"
                      target="_blank"
                    >
                      tag the issue
                    </StyledExternalLink>{' '}
                    in your pull request.
                  </li>
                </ul>
              </StepDescription>
            </StepContentWrapper>
            <StepImageWrapper>
              <StyledImageWrapper image="https://rysolv.s3.us-east-2.amazonaws.com/submitPullRequest.png" />
            </StepImageWrapper>
          </StepWrapper>
          <StepWrapper>
            <StepContentWrapper>
              <StepName>Step 2</StepName>
              <StepDescription>
                Once you submit a Pull Request, Rysolv will monitor the issue
                for the following criteria:
                <ul>
                  <li>The pull requst is linked to the issue.</li>
                  <li>The pull request has been accepted and merged in.</li>
                  <li>The issue has been closed.</li>
                </ul>
                Once these criteria are met, any outstanding bounty will be
                awarded to your account. You&apos;ll be notified by email when a
                PR has been accepted, and you&apos;ll see your new balance on
                your{' '}
                <StyledInternalLink to="/settings/account">
                  settings page
                </StyledInternalLink>
                .
              </StepDescription>
            </StepContentWrapper>
            <StepImageWrapper>
              <StyledImageWrapper image="https://rysolv.s3.us-east-2.amazonaws.com/earnBounty.png" />
            </StepImageWrapper>
          </StepWrapper>
        </StepContainer>

        <HeaderWrapper ref={bountyRef}>How are bounties paid?</HeaderWrapper>
        <StepContainer>
          <StepWrapper>
            <StepContentWrapper>
              <StepName>Accepting a bounty</StepName>
              <StepDescription>
                When a pull request has been merged in and the corresponding
                issue closed. You will be notified of a pending bounty. To
                accept this bounty, head to your
                <StyledInternalLink to="/settings/bounty">
                  {' '}
                  settings page
                </StyledInternalLink>
                <ul>
                  <li>
                    If the repo has set up a payout method. You will be prompted
                    to contribute a potion to the repo. Otherwise you will be
                    awarded the full dollar amount of the bounty.
                  </li>
                  <li>
                    If the repo has added a payout method, a minimum of 10% will
                    be allocatd to the parent repo.
                  </li>
                </ul>
              </StepDescription>
              <StepName>Repo payout</StepName>
              <StepDescription>
                For each bounty, there is additional work placed on the repo
                maintainers. To support this work, Rysolv allocates a portion of
                each bounty to the parent repo. And gives the user the ability
                to allocate more.
                <ul>
                  <li>
                    As a maintainer, to reqister for the contributions, locate
                    your repo from
                    <StyledInternalLink to="/repos">
                      {' '}
                      rysolv.com/repos
                    </StyledInternalLink>{' '}
                    and click <b>Add Payout</b> at the top of the page.
                  </li>
                  <ul>
                    <li>
                      Maintainers will be able to select from Github Sponsors,
                      Open Collective, or Paypal. The payments will be
                      aggregated on Rysolv and distributed at the end of each
                      month.
                    </li>
                  </ul>
                  <li>
                    If you don&apos;t see the option on your repo, make sure you
                    have signed in with the Github account associated with your
                    repo, or have verified your Github account in the
                    <StyledInternalLink to="/settings">
                      {' '}
                      settings page
                    </StyledInternalLink>
                    .
                  </li>
                </ul>
              </StepDescription>
            </StepContentWrapper>
            <StepImageWrapper>
              <StyledImageWrapper image="https://rysolv.s3.us-east-2.amazonaws.com/acceptBounty.png" />
            </StepImageWrapper>
          </StepWrapper>
        </StepContainer>

        <HeaderWrapper>Withdrawing Your Funds</HeaderWrapper>
        <StepContainer>
          <StepWrapper>
            <StepContentWrapper>
              <StepName>Step 1</StepName>
              <StepDescription>
                Once you have earned a bounty, you can withdraw funds from your
                account. Visit your{' '}
                <StyledInternalLink to="/settings/account">
                  settings page
                </StyledInternalLink>{' '}
                and select <b>Withdraw Funds</b>.
                <ul>
                  <li>
                    There will be a <b>5% service fee</b> on withdrawals, as
                    well as applicable payment processing fees.
                  </li>
                </ul>
              </StepDescription>
            </StepContentWrapper>
            <StepImageWrapper>
              <StyledImageWrapper image="https://rysolv.s3.us-east-2.amazonaws.com/withdrawFunds.png" />
            </StepImageWrapper>
          </StepWrapper>
          <StepWrapper>
            <StepContentWrapper>
              <StepName>Step 2</StepName>
              <StepDescription>
                All withdraws are made via Paypal. Fill out the{' '}
                <b>Amount to Withdraw</b>, and verify that the{' '}
                <b>Paypal email address</b> is correct.
                <ul>
                  <li>
                    Expect to receive funds within 24 hours of requesting a
                    withdrawal.
                  </li>
                  <li>
                    You will receive an email notification when your withdrawal
                    is complete.
                  </li>
                </ul>
              </StepDescription>
            </StepContentWrapper>
            <StepImageWrapper>
              <StyledImageWrapper image="https://rysolv.s3.us-east-2.amazonaws.com/verifyWithdrawFunds.png" />
            </StepImageWrapper>
          </StepWrapper>
        </StepContainer>
      </StyledHowContainer>
    </Fragment>
  );
};

export default HowTo;
