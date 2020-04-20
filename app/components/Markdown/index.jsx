import React from 'react';
import SimpleMDE from 'simplemde';
import T from 'prop-types';

import 'simplemde/dist/simplemde.min.css';

import {
  MarkdownContainer,
  HTMLContainer,
  EditContainer,
} from './styledComponents';

class Markdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      html: '',
      edit: props.edit || false,
    };
  }

  componentDidMount() {
    const textArea = document.getElementById('editor');
    this.markdown = new SimpleMDE({
      autosave: true,
      element: textArea,
      initialValue: this.props.body || '',
      status: false,
      placeholder: 'Type here. Use Markdown or HTML to format.',
      hideIcons: ['side-by-side', 'fullscreen'],
    });

    this.markdown.codemirror.options.extraKeys.Tab = false;
    this.markdown.codemirror.options.extraKeys['Shift-Tab'] = false;

    this.markdown.codemirror.on('blur', () => {
      this.props.handleInput(this.markdown.value());
    });
    this.updateHtml(this.props.body || '');
  }

  componentDidUpdate() {
    this.markdown.value(this.props.body || '');
    this.updateHtml(this.markdown.value());
    this.markdown.codemirror.execCommand('goDocEnd');
  }

  handleClick = () => {
    this.props.handleInput(this.markdown.value());
    if (this.state.edit) {
      this.setState({ edit: false });
    } else {
      this.setState({ edit: true });
      this.updateHtml(this.markdown.value());
    }
  };

  updateHtml = newMarkdown => {
    const newHtml = this.markdown.options.previewRender(newMarkdown);
    this.setState({ html: newHtml });
    document.getElementById('htmlContainer').innerHTML = this.state.html;
  };

  render() {
    return (
      <MarkdownContainer comment={this.props.comment}>
        <EditContainer view={this.state.edit} id="editorContainer">
          <textarea id="editor" />
        </EditContainer>
        <HTMLContainer view={this.state.edit} id="htmlContainer" />
      </MarkdownContainer>
    );
  }
}

Markdown.propTypes = {
  body: T.string,
  handleInput: T.func,
  edit: T.bool,
  comment: T.bool,
};

export default Markdown;
