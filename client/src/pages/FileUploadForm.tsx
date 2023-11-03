import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FileUploadForm = () => {
  const initialValues = { files: [] };

  const validationSchema = Yup.object().shape({
    files: Yup.array().required('Files are required'),
  });

  const handleSubmit = async (values) => {
    const formData = new FormData();
    values.files.forEach((file) => {
      formData.append('files', file);
    });
    console.log(formData)

  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <Field name="files" type="file" multiple />
          <ErrorMessage name="files" component="div" className="error" />
        </div>
        <button type="submit">Upload</button>
      </Form>
    </Formik>
  );
};

export default FileUploadForm;
