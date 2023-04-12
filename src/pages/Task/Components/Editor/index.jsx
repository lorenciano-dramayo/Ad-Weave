import PropTypes from 'prop-types';

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

// MUI Component
import { Stack } from '@mui/material';

import MUIRichTextEditor from 'mui-rte';

import { convertFromHTML, ContentState, convertToRaw } from 'draft-js';

const theme = createTheme({
  overrides: {
    MUIRichTextEditor: {
      root: {
        borderRadius: '1em',
        border: '1px solid #ececec',
      },
      container: {
        display: 'flex',
        flexDirection: 'column-reverse',
        minHeight: '10em',
      },
      toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px solid #e2e2e2',
        padding: '0.2em 0.5em',
      },
      placeHolder: {
        width: 'calc(100% - 52.6em)',
        padding: '0.5em 1em',
        position: 'absolute',
        minHeight: '8.5em',
        marginBottom: '2em',
      },
      editor: {
        padding: '0.5em',
        minHeight: '-webkit-fill-available',
        overflow: 'auto',
        lineHeight: '1em',
      },
      editorContainer: {
        minHeight: '-webkit-fill-available',
      },
      DraftEditor: {
        root: {
          minHeight: '-webkit-fill-available',
        },
        editorContainer: {
          minHeight: '-webkit-fill-available',
        },
      },
      MuiSvgIcon: {
        root: {
          fontSize: '1em',
        },
      },
    },
  },
});

const Editor = ({ info }) => {
  const contentHTML = convertFromHTML(info?.toString());
  const state = ContentState.createFromBlockArray(
    contentHTML.contentBlocks,
    contentHTML.entityMap
  );
  const content = JSON.stringify(convertToRaw(state));

  return (
    <Stack>
      <ThemeProvider theme={theme}>
        <MUIRichTextEditor
          id="comment_editor"
          inlineToolbar={false}
          toolbarButtonSize="small"
          defaultValue={content}
          controls={[
            'title',
            'bold',
            'italic',
            'underline',
            'link',
            'strikethrough',
            'highlight',
            'link',
            'media',
            'numberList',
            'bulletList',
            'quote',
            'save'
          ]}
        />
      </ThemeProvider>
    </Stack>
  );
};

Editor.propTypes = {
  info: PropTypes.any,
};

export default Editor;
