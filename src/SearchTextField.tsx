import React, { useEffect } from "react";
import { Field, FormikHandlers } from "formik";
import { InputBase, createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    }
  }),
);

interface FieldProps {
  id: string,
  type: string,
  name: string,
  value: string,
  values: any;
  setFieldValue(field: string, value: any, shouldValidate?: boolean): void;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
  inputRef: React.RefObject<HTMLInputElement>;
}

export const SearchTextField = (props: FieldProps) => {
  const classes = useStyles();

  useEffect(() => {

    console.log('SearchTextField useEffect');

    // file が入力されたら、text を file.name に置き換える(色を変える)
    // text が入力されたら、file を null に置き換える
    if (props.values.file instanceof File) {
      props.setFieldValue("text", props.values.file.name);  
    }
  }, [props.values]);

  return (
    <InputBase
      id={props.id}
      type={props.type}
      name={props.name}
      className={classes.input}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      ref={props.inputRef}
    />
    // <Field
    //   as={InputBase}
    //   name="text"
    //   type="text"
    //   className={classes.input}
    //   placeholder="検索"
    // />
  );
};
