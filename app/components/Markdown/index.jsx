import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';

import { EditContainer, MarkdownContainer } from './styledComponents';

const Markdown = ({
  body,
  comment,
  handleInput,
  handleSubmit,
  preview,
  ...restProps
}) => {
  const [markdown, setMarkdown] = useState(null);

  // Configure initial Markdown Editor
  const createMarkdown = ({ textarea }) => {
    const newMarkdown = new SimpleMDE({
      autosave: false,
      element: textarea,
      hideIcons: ['fullscreen', 'guide', 'preview', 'side-by-side'],
      initialValue: body || '',
      placeholder: 'Type here. Use Markdown or HTML to format.',
      shortcuts: {
        togglePreview: null,
      },
      spellChecker: false,
      status: false,
    });

    const { codemirror } = newMarkdown;
    codemirror.on('change', () => handleInput(newMarkdown.value()));
    codemirror.options.extraKeys.Tab = false;
    codemirror.options.extraKeys['Shift-Tab'] = false;
    return newMarkdown;
  };

  // Set Markdown area after DOM renders
  useEffect(() => {
    const textarea = document.getElementById('editor');
    setMarkdown(createMarkdown({ textarea }));
  }, []);

  // Toggle preview
  useEffect(() => {
    if (markdown) markdown.togglePreview();
  }, [preview]);

  return (
    <MarkdownContainer comment={comment} {...restProps}>
      <EditContainer>
        <textarea id="editor" />
      </EditContainer>
    </MarkdownContainer>
  );
};

Markdown.propTypes = {
  body: T.string,
  comment: T.bool,
  handleSubmit: T.func,
  handleInput: T.func,
  preview: T.bool,
};

export default Markdown;
