import React from 'react';
import SimpleMDE from 'simplemde';
import T from 'prop-types';

import 'simplemde/dist/simplemde.min.css';

import { MarkdownContainer, EditContainer } from './styledComponents';

class Markdown extends React.PureComponent {
  componentDidMount() {
    const textArea = document.getElementById('editor');
    this.markdown = new SimpleMDE({
      autosave: false,
      element: textArea,
      initialValue: this.props.body || '',
      status: false,
      placeholder: 'Type here. Use Markdown or HTML to format.',
      hideIcons: ['side-by-side', 'fullscreen'],
    });

    this.markdown.codemirror.options.extraKeys.Tab = false;
    this.markdown.codemirror.options.extraKeys['Shift-Tab'] = false;

    // Handle CTRL+Enter submit
    this.markdown.codemirror.on('keyup', (a, b) => {
      this.props.handleInput(this.markdown.value());
      if (b.key === 'Enter' && b.ctrlKey === true) {
        this.props.handleEnter();
      }
    });
  }

  componentDidUpdate() {
    if (this.props.body === '') {
      this.markdown.value(this.props.body);
    }
  }

  render() {
    const { comment, ...restProps } = this.props;
    return (
      <MarkdownContainer comment={comment} {...restProps}>
        <EditContainer>
          <textarea id="editor" />
        </EditContainer>
      </MarkdownContainer>
    );
  }
}

Markdown.propTypes = {
  body: T.string,
  handleInput: T.func,
  handleEnter: T.func,
  comment: T.bool,
};

export default Markdown;
