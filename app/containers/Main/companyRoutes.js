import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import withAuth from 'containers/Auth';
import CodeScoring from 'containers/CodeScoring/Loadable';
import CompanyDashboard from 'containers/CompanyDashboard/Loadable';
import CompanyPositionDetail from 'containers/CompanyPositionDetail/Loadable';
import CompanySettings from 'containers/CompanySettings/Loadable';
import CompanySignUp from 'containers/CompanySignUp/Loadable';
import ContactUs from 'containers/ContactUs/Loadable';
import Faq from 'components/Faq';
import IssuesDetail from 'containers/Issues/Detail';
import JobApplication from 'containers/JobApplication/Loadable';
import JobsBoard from 'containers/JobsBoard/Loadable';
import Main from 'containers/HomePage/Loadable';
import Messages from 'containers/Messages';
import NotFoundPage from 'components/NotFoundPage';
import Overview from 'containers/Overview';
import Pricing from 'containers/Pricing';
import PrivacyPolicy from 'components/PrivacyPolicy';
import ReposDetail from 'containers/Repos/Detail';
import SignIn from 'containers/Signin';
import Stats from 'containers/Stats/Loadable';
import TermsOfService from 'components/TermsOfService';
import UserProfile from 'containers/UserProfile';
import UsersDetail from 'containers/Users/Detail';

const companyConfig = {
  isAdmin: false,
  isCompany: true,
  isPrivate: true,
};
const privateConfig = { isAdmin: false, isPrivate: true };
const publicConfig = { isAdmin: false, isPrivate: false };

const PrivateCompanyDashboard = withAuth(companyConfig, CompanyDashboard);
const PrivateCompanySettings = withAuth(companyConfig, CompanySettings);
const PrivateCompanySignUp = withAuth(companyConfig, CompanySignUp);
const PrivateMessages = withAuth(privateConfig, Messages);
const PublicCodeScoring = withAuth(publicConfig, CodeScoring);
const PublicCompanyPositionDetail = withAuth(
  publicConfig,
  CompanyPositionDetail,
);
const PublicContactUs = withAuth(publicConfig, ContactUs);
const PublicFaq = withAuth(publicConfig, Faq);
const PublicIssuesDetail = withAuth(publicConfig, IssuesDetail);
const PublicJobApplication = withAuth(publicConfig, JobApplication);
const PublicJobsBoard = withAuth(publicConfig, JobsBoard);
const PublicMain = withAuth(publicConfig, Main);
const PublicNotFoundPage = withAuth(publicConfig, NotFoundPage);
const PublicOverview = withAuth(publicConfig, Overview);
const PublicPricing = withAuth(publicConfig, Pricing);
const PublicPrivacyPolicy = withAuth(publicConfig, PrivacyPolicy);
const PublicReposDetail = withAuth(publicConfig, ReposDetail);
const PublicSignIn = withAuth(publicConfig, SignIn);
const PublicStats = withAuth(publicConfig, Stats);
const PublicTermsOfService = withAuth(publicConfig, TermsOfService);
const PublicUserProfile = withAuth(publicConfig, UserProfile);
const PublicUsersDetail = withAuth(publicConfig, UsersDetail);

// prettier-ignore
const CompanyRoutes = () => (
  <Switch>
    <Route exact path="/" component={PublicMain} />
    <Route exact path="/apply" component={PublicJobApplication} />
    <Route exact path="/apply/:positionId" component={PublicCompanyPositionDetail} />
    <Route exact path="/company/dashboard/:view?" component={PrivateCompanyDashboard} />
    <Route exact path="/company/settings/:view?" component={PrivateCompanySettings} />
    <Route exact path="/company/signup" component={PrivateCompanySignUp} />
    <Route exact path="/contact-us" component={PublicContactUs} />
    <Route exact path="/faq" component={PublicFaq} />
    <Route exact path="/how-to" component={() => <Redirect to="/" />} />
    <Route exact path="/how-we-score-code" component={PublicCodeScoring} />
    <Route exact path="/issues" component={PublicOverview} />
    <Route exact path="/issues/detail/:id" component={PublicIssuesDetail} />
    <Route exact path="/issues/search/:searchValue" component={PublicOverview} />
    <Route exact path="/jobs" component={PublicJobsBoard} />
    <Route exact path="/messages/:threadId?" component={PrivateMessages} />
    <Route exact path="/password-reset" component={PublicSignIn} />
    <Route exact path="/pricing" component={PublicPricing} />
    <Route exact path="/privacy-policy" component={PublicPrivacyPolicy} />
    <Route exact path="/users/:user" component={PublicUserProfile} />
    <Route exact path="/repos" component={PublicOverview} />
    <Route exact path="/repos/detail/:id" component={PublicReposDetail} />
    <Route exact path="/repos/search/:searchValue" component={PublicOverview} />
    <Route exact path="/signin" component={PublicSignIn} />
    <Route exact path="/signup" component={PublicSignIn} />
    <Route exact path="/stats" component={PublicStats} />
    <Route exact path="/terms-of-service" component={PublicTermsOfService} />
    <Route exact path="/users" component={PublicOverview} />
    <Route exact path="/users/detail/:id" component={PublicUsersDetail} />
    <Route exact path="/users/search/:searchValue" component={PublicOverview} />
    <Route component={PublicNotFoundPage} />
  </Switch>
);

export default CompanyRoutes;
