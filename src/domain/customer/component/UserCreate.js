import * as React from "react";
import {
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  SaveButton,
  useMutation,
  required,
} from "react-admin";

export const UserCreate = (props) => {
  // const [mutate] = useMutation();
  // const save = React.useCallback(
  //   async (values) => {
  //     try {
  //       // await mutate(
  //       //   {
  //       //     type: "create",
  //       //     resource: "users",
  //       //     payload: { data: values },
  //       //   },
  //       //   { returnPromise: true }
  //       // );
  //       console.log(values, "valuessssssssss");
  //     } catch (error) {
  //       if (error.body.errors) {
  //         return error.body.errors;
  //       }
  //     }
  //   },
  //   [mutate]
  // );

  return (
    <Create {...props}>
      <SimpleForm redirect="show">
        <TextInput validate={[required()]} source="name" />
        <TextInput validate={[required()]} source="email" />
        {/* <SelectInput
          validate={[required()]}
          source="configuration"
          choices={[
            { id: "imageSearch", name: "imageSearch" },
            { id: "analysis", name: "analysis" },
            { id: "reducer", name: "reducer" },
            { id: "labelreader", name: "labelreader" },
            { id: "classifier", name: "classifier" },
          ]}
        /> */}
      </SimpleForm>
    </Create>
  );
};
