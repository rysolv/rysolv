import React, { useEffect } from 'react';

import {
  ContentWrapper,
  LinkWrapper,
  StyledH3,
  StyledOrderedList,
  StyledP,
  TermsOfServiceHeader,
  ViewContainer,
} from './styledComponents';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Terms of Service';
  }, []);
  return (
    <ViewContainer>
      <TermsOfServiceHeader>Rysolv Terms of Service</TermsOfServiceHeader>
      <ContentWrapper>
        <StyledH3>1. Terms</StyledH3>
        <StyledP>
          By accessing the website at{' '}
          <LinkWrapper href="https://rysolv.com">
            https://rysolv.com
          </LinkWrapper>
          , you are agreeing to be bound by these terms of service, all
          applicable laws and regulations, and agree that you are responsible
          for compliance with any applicable local laws. If you do not agree
          with any of these terms, you are prohibited from using or accessing
          this site. The materials contained in this website are protected by
          applicable copyright and trademark law.
        </StyledP>
        <StyledH3>2. Content Restrictions</StyledH3>
        <StyledP>
          You may create or upload user-generated content while using this
          service. You are solely responsible for the content of, and for any
          harm resulting from, any user-generated content that you post, upload,
          link to or otherwise make available via the service, regardless of the
          form of that content. We are not responsible for any public display or
          misuse of your user-generated content.
        </StyledP>
        <StyledP>
          We do not pre-screen user-generated content, but we have the right
          (though not the obligation) to refuse or remove any user-generated
          content that, in our sole discretion, violates any of Rysolv&apos;s
          terms or policies.
        </StyledP>
        <StyledP>
          Under no circumstances will users upload, post, host, execute, or
          transmit any content that:
        </StyledP>
        <StyledOrderedList type="i">
          <li>
            <StyledP>is unlawful or promotes unlawful activities;</StyledP>
          </li>
          <li>
            <StyledP>is or contains sexually obscene content;</StyledP>
          </li>
          <li>
            <StyledP>is libelous, defamatory, or fraudulent;</StyledP>
          </li>
          <li>
            <StyledP>
              is discriminatory or abusive toward any individual or group;
            </StyledP>
          </li>
          <li>
            <StyledP>
              gratuitously depicts or glorifies violence, including violent
              images;
            </StyledP>
          </li>
          <li>
            <StyledP>
              is or contains false, inaccurate, or intentionally deceptive
              information that is likely to adversely affect the public
              interest;
            </StyledP>
          </li>
          <li>
            <StyledP>
              contains or installs any active malware or exploits;
            </StyledP>
          </li>
          <li>
            <StyledP>
              infringes any proprietary right of any party, including patent,
              trademark, trade secret, copyright, right of publicity, or other
              right.
            </StyledP>
          </li>
        </StyledOrderedList>
        <StyledH3>3. Conduct Restrictions</StyledH3>
        <p>While using the service, under no circumstances will you:</p>
        <StyledOrderedList type="i">
          <li>
            <StyledP>
              harass, abuse, threaten, or incite violence towards any individual
              or group, including our employees, officers, and agents, or other
              users;
            </StyledP>
          </li>
          <li>
            <StyledP>
              use our servers for any form of excessive automated bulk activity,
              to place undue burden on our servers through automated means, or
              to relay any form of unsolicited advertising or solicitation
              through our servers;
            </StyledP>
          </li>
          <li>
            <StyledP>
              use our servers to disrupt or to attempt to disrupt, or to gain or
              to attempt to gain unauthorized access to, any service, device,
              data, account or network;
            </StyledP>
          </li>
          <li>
            <StyledP>
              impersonate any person or entity, including any of our employees
              or representatives, including through false association with
              Rysolv, or by fraudulently misrepresenting your identity or
              site&apos;s purpose;
            </StyledP>
          </li>
          <li>
            <StyledP>
              violate the privacy of any third party, such as by posting another
              person&apos;s personal information without consent.
            </StyledP>
          </li>
        </StyledOrderedList>
        <StyledH3>4. Disclaimer</StyledH3>
        <StyledOrderedList type="a">
          <li>
            <StyledP>
              The materials on Rysolv&apos;s website are provided on an &apos;as
              is&apos; basis. Rysolv makes no warranties, expressed or implied,
              and hereby disclaims and negates all other warranties including,
              without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </StyledP>
          </li>
          <li>
            <StyledP>
              Further, Rysolv does not warrant or make any representations
              concerning the accuracy, likely results, or reliability of the use
              of the materials on its website or otherwise relating to such
              materials on any sites linked to this site.
            </StyledP>
          </li>
        </StyledOrderedList>
        <StyledH3>5. Limitations</StyledH3>
        <StyledP>
          In no event shall Rysolv be liable for any damages (including, without
          limitation, damages for loss of data or profit, or due to business
          interruption) arising out of the use or inability to use the materials
          on Rysolv&apos;s website, even if Rysolv or a Rysolv authorized
          representative has been notified orally or in writing of the
          possibility of such damage. Because some jurisdictions do not allow
          limitations on implied warranties, or limitations of liability for
          consequential or incidental damages, these limitations may not apply
          to you.
        </StyledP>
        <StyledH3>6. Accuracy of Materials</StyledH3>
        <StyledP>
          The materials appearing on Rysolv&apos;s website could include
          technical, typographical, or photographic errors. Rysolv does not
          warrant that any of the materials on its website are accurate,
          complete or current. Rysolv may make changes to the materials
          contained on its website at any time without notice. However Rysolv
          does not make any commitment to update the materials.
        </StyledP>
        <StyledH3>7. Links</StyledH3>
        <StyledP>
          Rysolv has not reviewed all of the sites linked to its website and is
          not responsible for the contents of any such linked site. The
          inclusion of any link does not imply endorsement by Rysolv of the
          site. Use of any such linked website is at the user&apos;s own risk.
        </StyledP>
        <StyledH3>8. Modifications</StyledH3>
        <StyledP>
          Rysolv may revise these terms of service for its website at any time
          without notice. By using this website you are agreeing to be bound by
          the then current version of these terms of service.
        </StyledP>
        <StyledH3>9. Governing Law</StyledH3>
        <StyledP>
          These terms and conditions are governed by and construed in accordance
          with the laws of Delaware and you irrevocably submit to the exclusive
          jurisdiction of the courts in that State or location.
        </StyledP>
      </ContentWrapper>
    </ViewContainer>
  );
};

export default TermsOfService;
