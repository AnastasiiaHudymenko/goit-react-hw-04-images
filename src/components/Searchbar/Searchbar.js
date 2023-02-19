import React from 'react';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { FcSearch } from 'react-icons/fc';
import { Formik, Form, Field, ErrorMessage } from 'formik';

let initialValues = { search: '' };

let userSchema = object({
  search: string().min(2, 'Too Short!').max(70, 'Too Long!').required(),
});

export const Searchbar = ({ onSubmit }) => {
  const handlSubmit = values => {
    initialValues = values;
    return onSubmit(values);
  };

  return (
    <header className="Searchbar">
      <Formik
        validationSchema={userSchema}
        initialValues={initialValues}
        onSubmit={handlSubmit}
      >
        <Form className="SearchForm">
          <Field
            className="SearchForm-input"
            name="search"
            type="text"
            placeholder="Search images and photos"
          />

          <ErrorMessage className="Error" component="div" name="search" />
          <button className="SearchForm-button" type="submit">
            <FcSearch size={36} />
          </button>
        </Form>
      </Formik>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
