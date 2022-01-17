import React from 'react';
import T from 'prop-types';

import {
  Content,
  IconWrapper,
  MainText,
  MessageContainer,
  Text,
} from './styledComponents';

const AlertMessage = ({ body, footnote, icon, title }) => (
  <MessageContainer>
    <IconWrapper>{icon}</IconWrapper>
    <Content>
      <MainText>{title}</MainText>
      <Text>{body}</Text>
      <Text>{footnote}</Text>
    </Content>
  </MessageContainer>
);

AlertMessage.propTypes = {
  body: T.string,
  footnote: T.oneOfType([T.object, T.string]),
  icon: T.element,
  title: T.string,
};

export default AlertMessage;
