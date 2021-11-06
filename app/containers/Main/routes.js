import React from 'react';
import { Switch, Route } from 'react-router-dom';
import withAuth from 'containers/Auth';

import CodeScoring from 'containers/CodeScoring/Loadable';
import CompanyDashboard from 'containers/CompanyDashboard/Loadable';
import CompanyRecruitment from 'containers/CompanyRecruitment/Loadable';
import CompanySignUp from 'containers/CompanySignUp/Loadable';
import Contact from 'components/Contact';
import Faq from 'components/Faq';
import HowTo from 'components/HowTo';
import IssuesAdd from 'containers/Issues/Add';
import IssuesDetail from 'containers/Issues/Detail';
import Jobs from 'containers/Jobs';
import Main from 'containers/HomePage/Loadable';
import NotFoundPage from 'components/NotFoundPage';
import Overview from 'containers/Overview';
import PrivacyPolicy from 'components/PrivacyPolicy';
import ReposAdd from 'containers/Repos/Add';
import ReposDetail from 'containers/Repos/Detail';
import Settings from 'containers/Settings';
import SignIn from 'containers/Signin';
import Stats from 'containers/Stats/Loadable';
import TermsOfService from 'components/TermsOfService';
import UserDashboard from 'containers/UserDashboard';
import UsersDetail from 'containers/Users/Detail';
import VerifyGithub from 'containers/VerifyGithub/Loadable';

const privateConfig = { isAdmin: false, isPrivate: true };
const publicConfig = { isAdmin: false, isPrivate: false };

const PrivateCompanyDashboard = withAuth(privateConfig, CompanyDashboard);
const PrivateCompanySignUp = withAuth(privateConfig, CompanySignUp);
const PrivateIssuesAdd = withAuth(privateConfig, IssuesAdd);
const PrivateReposAdd = withAuth(privateConfig, ReposAdd);
const PrivateSettings = withAuth(privateConfig, Settings);
const PrivateUserDashboard = withAuth(privateConfig, UserDashboard);
const PublicCodeScoring = withAuth(publicConfig, CodeScoring);
const PublicCompanyRecruitment = withAuth(publicConfig, CompanyRecruitment);
const PublicContact = withAuth(publicConfig, Contact);
const PublicFaq = withAuth(publicConfig, Faq);
const PublicHowTo = withAuth(publicConfig, HowTo);
const PublicIssuesDetail = withAuth(publicConfig, IssuesDetail);
const PublicJobs = withAuth(publicConfig, Jobs);
const PublicMain = withAuth(publicConfig, Main);
const PublicNotFoundPage = withAuth(publicConfig, NotFoundPage);
const PublicOverview = withAuth(publicConfig, Overview);
const PublicPrivacyPolicy = withAuth(publicConfig, PrivacyPolicy);
const PublicReposDetail = withAuth(publicConfig, ReposDetail);
const PublicSignIn = withAuth(publicConfig, SignIn);
const PublicStats = withAuth(publicConfig, Stats);
const PublicTermsOfService = withAuth(publicConfig, TermsOfService);
const PublicUsersDetail = withAuth(publicConfig, UsersDetail);
const PublicVerifyGithub = withAuth(publicConfig, VerifyGithub);

// prettier-ignore
const Routes = () => (
  <Switch>
    <Route exact path ="/how-we-score-code" component={PublicCodeScoring} />
    <Route exact path="/" component={PublicMain} />
    <Route exact path="/account/verify-github" component={PublicVerifyGithub} />
    <Route exact path="/company/dashboard/:view?" component={PrivateCompanyDashboard} />
    <Route exact path="/contact-us" component={PublicContact} />
    <Route exact path="/dashboard/:view?" component={PrivateUserDashboard} />
    <Route exact path="/faq" component={PublicFaq} />
    <Route exact path="/how-to" component={PublicHowTo} />
    <Route exact path="/issues" component={PublicOverview} />
    <Route exact path="/issues/add" component={PrivateIssuesAdd} />
    <Route exact path="/issues/detail/:id" component={PublicIssuesDetail} />
    <Route exact path="/issues/search/:searchValue" component={PublicOverview} />
    <Route exact path="/jobs" component={PublicJobs} />
    <Route exact path="/jobs/verify-github" component={PublicVerifyGithub} />
    <Route exact path="/password-reset" component={PublicSignIn} />
    <Route exact path="/privacy-policy" component={PublicPrivacyPolicy} />
    <Route exact path="/recruitment" component={PublicCompanyRecruitment} />
    <Route exact path="/repos" component={PublicOverview} />
    <Route exact path="/repos/add" component={PrivateReposAdd} />
    <Route exact path="/repos/detail/:id" component={PublicReposDetail} />
    <Route exact path="/repos/search/:searchValue" component={PublicOverview} />
    <Route exact path="/settings/:view?" component={PrivateSettings} />
    <Route exact path="/signin" component={PublicSignIn} />
    <Route exact path="/signin/verify-github" component={PublicVerifyGithub} />
    <Route exact path="/signup" component={PublicSignIn} />
    <Route exact path="/signup/company" component={PrivateCompanySignUp} />
    <Route exact path="/signup/verify-github" component={PublicVerifyGithub} />
    <Route exact path="/stats" component={PublicStats} />
    <Route exact path="/terms-of-service" component={PublicTermsOfService} />
    <Route exact path="/users" component={PublicOverview} />
    <Route exact path="/users/detail/:id" component={PublicUsersDetail} />
    <Route exact path="/users/search/:searchValue" component={PublicOverview} />
    <Route component={PublicNotFoundPage} />
  </Switch>
);

export default Routes;
