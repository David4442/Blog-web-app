import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
function CreatePost() {
  const initialValues = {
    title: "",
    postText: "",
  };
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
  }, []);
  const { authState } = useContext(AuthContext);
  let history = useHistory();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title!"),
    postText: Yup.string().required(),
  });
  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((data) => {
        history.push("/");
      });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <ErrorMessage name="title" component="span" />
          <label for="">Title: </label>
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="Enter title"
          />
          <ErrorMessage name="postText" component="span" />
          <label for="">Post: </label>
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="Enter text"
          />

          <button type="submit">Create post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
