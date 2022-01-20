import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';

import { usePrevious } from 'utils/globalHelpers';

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

  // Use to clear the markdown body
  const previousBody = usePrevious(body);
  useEffect(() => {
    if (markdown && previousBody && previousBody !== body && body === '')
      markdown.value(body);
  }, [body, previousBody]);

  // Toggle preview
  useEffect(() => {
    if (markdown) markdown.togglePreview();
  }, [preview]);

  return (
    <MarkdownContainer mobile={comment} {...restProps}>
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
