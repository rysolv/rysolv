import React from 'react';
import SimpleMDE from 'simplemde';
import T from 'prop-types';

import 'simplemde/dist/simplemde.min.css';

import { CodeIcon, PrimaryButton } from 'components/base_ui';

import {
  MarkdownContainer,
  HTMLContainer,
  EditContainer,
  StyledSecondaryButton,
} from './styledComponents';

class MarkDown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      html: '',
      preview: false,
    };
  }

  componentDidMount() {
    const textArea = document.getElementById('editor');

    this.markdown = new SimpleMDE({
      autosave: true,
      element: textArea,
      initialValue: this.props.body,
      status: false,
    });
  }

  componentDidUpdate() {
    this.markdown.value(this.props.body);
    this.updateHtml(this.markdown.value());
  }

  handleClick = () => {
    this.props.handleSave(this.markdown.value());
    if (this.state.preview) {
      this.setState({ preview: false });
    } else {
      this.setState({ preview: true });
      this.updateHtml(this.markdown.value());
    }
  };

  updateHtml = newMarkdown => {
    const newHtml = this.markdown.options.previewRender(newMarkdown);
    this.setState({ html: newHtml });
    document.getElementById('htmlContainer').innerHTML = this.state.html;
  };

  render() {
    const { handleSave } = this.props;

    return (
      <MarkdownContainer>
        <EditContainer view={this.state.preview} id="editorContainer">
          <textarea id="editor" />
        </EditContainer>
        <HTMLContainer view={this.state.preview} id="htmlContainer" />

        <StyledSecondaryButton
          Icon={CodeIcon}
          label={this.state.preview ? 'Markdown' : 'HTML'}
          onClick={() => this.handleClick()}
        />
        <PrimaryButton
          label="Save"
          onClick={() => handleSave(this.markdown.value())}
        />
      </MarkdownContainer>
    );
  }
}

MarkDown.propTypes = {
  body: T.string,
  handleSave: T.func,
  // edit: T.bool,
};

export default MarkDown;
