import React, { useState, Dispatch } from 'react';
import { makeStyles, Button, Paper, IconButton, InputBase, Divider, Theme, createStyles, Chip } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen, faFile, faSearch } from '@fortawesome/free-solid-svg-icons'
// import { Formik, getIn, setIn, validateYupSchema, FormikProps, Form, Field } from 'formik';

// https://material-ui.com/components/text-fields/#customized-inputs
// https://stackoverflow.com/questions/40589302/how-to-enable-file-upload-on-reacts-material-ui-simple-input
// https://hackernoon.com/formik-handling-files-and-recaptcha-209cbeae10bc

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '80%'
      // width: 400,
    },
    textInput: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    fileInput: {
      marginLeft: theme.spacing(1),
      flex: 1,
      textAlign: 'left'
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

export const PageFile = () => {
  const classes = useStyles();

  // テキスト入力
  const [text, setText] = useState('');
  const [textDisplay, setTextDisplay] = useState(true);

  // ファイル入力
  const [fileChipLabel, setFileChipLabel] = useState('');
  const [fileChipDisplay, setFileChipDisplay] = useState(false);
  const [file, setFile] = useState<File|null>(null);
  // <input type="file" /> を controlled component として扱う
  // https://ja.reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    alert(`onSubmit\ntext:${text} file:${file}`);
  }

  const handleFileChipDelete = (setFile: Dispatch<File|null>) => {
    setFile(null);
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Paper className={classes.root}>
        {/*
          ファイルパス/テキスト入力
        
          [参考情報]
          条件演算子によるインライン If-Else
          https://ja.reactjs.org/docs/conditional-rendering.html#inline-if-else-with-conditional-operator
          */
          file
          ?
            <div className={classes.fileInput}>
              <Chip
                variant="outlined"
                icon={<FontAwesomeIcon icon={faFile} />}
                label={fileChipLabel}
                // className={classes.fileInput}
                onDelete={() => handleFileChipDelete(setFile)}
                style={{ paddingLeft: '0.35rem' }}
              />
            </div>
          : 
            <InputBase
              name="text"
              type="text"
              placeholder="検索"
              className={classes.textInput}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setText((event.target as HTMLInputElement).value);
              }}
              value={text}
            />
        }

        {/*
          ファイル選択

          [参考情報]
          ファイル input タグ
          https://ja.reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
        */}
        <input
          id="id_file"
          name="file"
          type="file"
          className={classes.iconButton}
          onChange={(event: any) => {
            if (event.currentTarget.files) {
              const file = event.currentTarget.files[0];
              setFile(file);
              setFileChipLabel(file.name);
              setTextDisplay(false);
            }
          }}
          ref={inputRef}
          style={{ display: 'none' }}
        />
        <IconButton component="label" htmlFor="id_file" className={classes.iconButton} aria-label="fileinput">
          <FontAwesomeIcon icon={faFolderOpen} />
        </IconButton>

        <Divider className={classes.divider} orientation="vertical" />

        {/* 検索実行 */}
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <FontAwesomeIcon icon={faSearch} />
        </IconButton>
      </Paper>
    </form>
  );
}
