
import React from "react";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { createGroup } from "../../store/groupsSlice";
const initialValues = {
  name: "",
  image: "",//забираємо в multer/groupRouter-key 'image'
};
const GroupForm = () => {
  const dispatch = useDispatch();
  const onSubmit = (values, formikBag) => {
    values.userId = 1; //1 -> state.authUser.id повинні знати, окремий стейт для зареестрованого користувача, створити в сторі окремий слайс для авторизованого юзера, перевірили його і він може щось робити і знаемо його userId і вже зможемо робити від його імені запити...
    console.log(values);
    dispatch(createGroup(values));// dispatch => target.files[0] 
    //formikBag.resetForm();
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formikProps) => {
        return (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              width: "400px",
              margin: "auto",
            }} 
          >
            <Field type="text" name="name" placeholder="name" />
            <label>
              <input
                type="file" name="image"
                onChange={({ target }) =>
                //setFieldValue-дістає самий файл target.files[0] 
                // console.log(target.files[0])
                  formikProps.setFieldValue("image", target.files[0])
                }
              />
            </label>
            <button type="submit">add new group</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default GroupForm;
