import React from 'react';

import {
  ContentWrapper,
  LinkWrapper,
  StyledOrderedList,
  TermsOfServiceContainer,
  TermsOfServiceHeader,
} from './styledComponents';

const TermsOfService = () => (
  <TermsOfServiceContainer>
    <TermsOfServiceHeader>Rysolv Terms of Service</TermsOfServiceHeader>
    <ContentWrapper>
      <h3>1. Terms</h3>
      <p>
        By accessing the website at{' '}
        <LinkWrapper href="https://rysolv.com">https://rysolv.com</LinkWrapper>,
        you are agreeing to be bound by these terms of service, all applicable
        laws and regulations, and agree that you are responsible for compliance
        with any applicable local laws. If you do not agree with any of these
        terms, you are prohibited from using or accessing this site. The
        materials contained in this website are protected by applicable
        copyright and trademark law.
      </p>
      <h3>2. Content Restrictions</h3>
      <p>
        You may create or upload user-generated content while using this
        service. You are solely responsible for the content of, and for any harm
        resulting from, any user-generated content that you post, upload, link
        to or otherwise make available via the service, regardless of the form
        of that content. We are not responsible for any public display or misuse
        of your user-generated content.
      </p>
      <p>
        We do not pre-screen user-generated content, but we have the right
        (though not the obligation) to refuse or remove any user-generated
        content that, in our sole discretion, violates any of Rysolv&apos;s
        terms or policies.
      </p>
      <p>
        Under no circumstances will users upload, post, host, execute, or
        transmit any content that:
      </p>
      <StyledOrderedList type="i">
        <li>
          <p>is unlawful or promotes unlawful activities;</p>
        </li>
        <li>
          <p>is or contains sexually obscene content;</p>
        </li>
        <li>
          <p>is libelous, defamatory, or fraudulent;</p>
        </li>
        <li>
          <p>is discriminatory or abusive toward any individual or group;</p>
        </li>
        <li>
          <p>
            gratuitously depicts or glorifies violence, including violent
            images;
          </p>
        </li>
        <li>
          <p>
            is or contains false, inaccurate, or intentionally deceptive
            information that is likely to adversely affect the public interest;
          </p>
        </li>
        <li>
          <p>contains or installs any active malware or exploits;</p>
        </li>
        <li>
          <p>
            infringes any proprietary right of any party, including patent,
            trademark, trade secret, copyright, right of publicity, or other
            right.
          </p>
        </li>
      </StyledOrderedList>
      <h3>3. Conduct Restrictions</h3>
      <p>While using the service, under no circumstances will you:</p>
      <StyledOrderedList type="i">
        <li>
          <p>
            harass, abuse, threaten, or incite violence towards any individual
            or group, including our employees, officers, and agents, or other
            users;
          </p>
        </li>
        <li>
          <p>
            use our servers for any form of excessive automated bulk activity,
            to place undue burden on our servers through automated means, or to
            relay any form of unsolicited advertising or solicitation through
            our servers;
          </p>
        </li>
        <li>
          <p>
            use our servers to disrupt or to attempt to disrupt, or to gain or
            to attempt to gain unauthorized access to, any service, device,
            data, account or network;
          </p>
        </li>
        <li>
          <p>
            impersonate any person or entity, including any of our employees or
            representatives, including through false association with Rysolv, or
            by fraudulently misrepresenting your identity or site&apos;s
            purpose;
          </p>
        </li>
        <li>
          <p>
            violate the privacy of any third party, such as by posting another
            person&apos;s personal information without consent.
          </p>
        </li>
      </StyledOrderedList>
      <h3>4. Disclaimer</h3>
      <StyledOrderedList type="a">
        <li>
          <p>
            The materials on Rysolv&apos;s website are provided on an &apos;as
            is&apos; basis. Rysolv makes no warranties, expressed or implied,
            and hereby disclaims and negates all other warranties including,
            without limitation, implied warranties or conditions of
            merchantability, fitness for a particular purpose, or
            non-infringement of intellectual property or other violation of
            rights.
          </p>
        </li>
        <li>
          <p>
            Further, Rysolv does not warrant or make any representations
            concerning the accuracy, likely results, or reliability of the use
            of the materials on its website or otherwise relating to such
            materials on any sites linked to this site.
          </p>
        </li>
      </StyledOrderedList>
      <h3>5. Limitations</h3>
      <p>
        In no event shall Rysolv be liable for any damages (including, without
        limitation, damages for loss of data or profit, or due to business
        interruption) arising out of the use or inability to use the materials
        on Rysolv&apos;s website, even if Rysolv or a Rysolv authorized
        representative has been notified orally or in writing of the possibility
        of such damage. Because some jurisdictions do not allow limitations on
        implied warranties, or limitations of liability for consequential or
        incidental damages, these limitations may not apply to you.
      </p>
      <h3>6. Accuracy of Materials</h3>
      <p>
        The materials appearing on Rysolv&apos;s website could include
        technical, typographical, or photographic errors. Rysolv does not
        warrant that any of the materials on its website are accurate, complete
        or current. Rysolv may make changes to the materials contained on its
        website at any time without notice. However Rysolv does not make any
        commitment to update the materials.
      </p>
      <h3>7. Links</h3>
      <p>
        Rysolv has not reviewed all of the sites linked to its website and is
        not responsible for the contents of any such linked site. The inclusion
        of any link does not imply endorsement by Rysolv of the site. Use of any
        such linked website is at the user&apos;s own risk.
      </p>
      <h3>8. Modifications</h3>
      <p>
        Rysolv may revise these terms of service for its website at any time
        without notice. By using this website you are agreeing to be bound by
        the then current version of these terms of service.
      </p>
      <h3>9. Governing Law</h3>
      <p>
        These terms and conditions are governed by and construed in accordance
        with the laws of Delaware and you irrevocably submit to the exclusive
        jurisdiction of the courts in that State or location.
      </p>
    </ContentWrapper>
  </TermsOfServiceContainer>
);

export default TermsOfService;
