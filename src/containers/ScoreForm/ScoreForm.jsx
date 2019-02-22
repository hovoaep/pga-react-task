import React, { Component } from "react";
import { TextFieldGroup, Button } from "components";
import { scoreFormValidation, LocaleStorageUtils } from "utils";

export class ScoreForm extends Component {
  state = {
    fields: {
      name: "",
      surname: "",
      score: "",
    },
    errors: {},
    touched: {},
  };

  onChange = e => {
    const {
      target: { name, value },
    } = e;
    const { validateForm } = this;
    this.setState(
      ({ fields }) => ({ fields: { ...fields, [name]: value } }),
      () => {
        validateForm();
      }
    );
  };

  onFocus = e => {
    const {
      target: { name },
    } = e;
    const {
      state: { touched },
    } = this;
    if (!touched[name]) {
      this.setState(() => ({
        touched: { ...touched, [name]: true },
      }));
    }
  };

  touchAllFields = () => {
    const {
      state: { fields },
    } = this;
    Object.keys(fields).forEach(field =>
      this.setState(({ touched }) => ({
        touched: { ...touched, [field]: true },
      }))
    );
  };

  validateForm = () => {
    this.setState(({ fields, touched }) => ({
      errors: scoreFormValidation({ ...fields, touched }),
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      touchAllFields,
      validateForm,
      state: { errors, fields },
    } = this;
    const { LSget, LSupdate } = LocaleStorageUtils;
    touchAllFields();
    validateForm();
    if (Object.keys(errors).length !== 0) {
      return false;
    }
    fields.id = Date.now();
    // console.log(LSget("scoreboard"));
    // const data = LSget("scoreboard")
    //   ? JSON.parse(LSget("scoreboard")).push(fields)
    //   : [fields];
    // LSupdate("scoreboard", JSON.stringify(data));
  };

  render() {
    const {
      onChange,
      onFocus,
      onSubmit,
      validateForm,
      state: {
        fields: { name, surname, score },
        errors,
      },
    } = this;
    return (
      <div>
        <form onSubmit={onSubmit}>
          <TextFieldGroup
            name="name"
            value={name}
            onChange={onChange}
            error={errors.name}
            onFocus={onFocus}
            onBlur={validateForm}
          />
          <TextFieldGroup
            name="surname"
            value={surname}
            onChange={onChange}
            error={errors.surname}
            onFocus={onFocus}
            onBlur={validateForm}
          />
          <TextFieldGroup
            name="score"
            type="number"
            value={score}
            onChange={onChange}
            error={errors.score}
            onFocus={onFocus}
            onBlur={validateForm}
          />
          <Button buttonType="submit" text="Add new score" />
        </form>
      </div>
    );
  }
}
