import React, { Component } from "react";
import { TextFieldGroup, Button } from "components";
import { scoreFormValidation, LocaleStorageUtils } from "utils";
import { LSKey } from "_constants";
import "./ScoreForm.scss";

export class ScoreForm extends Component {
  state = {
    fields: {
      name: "",
      surname: "",
      score: "",
      id: "",
    },
    errors: {},
    touched: {},
  };
  static getDerivedStateFromProps(props, state) {
    if (
      Object.keys(props.initialValues).length &&
      state.fields.id !== props.initialValues.id
    ) {
      return {
        fields: props.initialValues,
      };
    }
    return null;
  }
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

  resetForm = () => {
    const {
      state: { fields },
      props: { edit, clearInitialValues },
    } = this;
    if (edit) {
      clearInitialValues();
    }
    Object.keys(fields).forEach(field =>
      this.setState(({ fields, touched }) => ({
        fields: { ...fields, [field]: "" },
        touched: { ...touched, [field]: false },
      }))
    );
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
      resetForm,
      state: { errors, fields },
      props: { updateScoreData, edit },
    } = this;
    const { LSget, LSupdate } = LocaleStorageUtils;
    touchAllFields();
    validateForm();
    if (Object.keys(errors).length !== 0) {
      return false;
    }
    if (!edit) {
      fields.id = Date.now();
    }
    let scoreBoardData = LSget(LSKey);
    if (scoreBoardData) {
      if (edit) {
        scoreBoardData = JSON.parse(scoreBoardData).map(score => {
          if (score.id === fields.id) {
            return fields;
          }
          return score;
        });
      } else {
        scoreBoardData = [...JSON.parse(scoreBoardData), fields];
      }
    } else {
      scoreBoardData = [fields];
    }
    LSupdate(LSKey, JSON.stringify(scoreBoardData));
    updateScoreData(fields);
    resetForm();
  };

  render() {
    const {
      onChange,
      onFocus,
      onSubmit,
      resetForm,
      validateForm,
      state: {
        fields: { name, surname, score },
        errors,
      },
      props: { initialValues, edit },
    } = this;
    return (
      <div>
        <h2 className="text-center mb-4">Add new player</h2>
        <form onSubmit={onSubmit}>
          <TextFieldGroup
            name="name"
            placeholder="Name"
            value={name}
            onChange={onChange}
            error={errors.name}
            onFocus={onFocus}
            onBlur={validateForm}
          />
          <TextFieldGroup
            name="surname"
            placeholder="Surname"
            value={surname}
            onChange={onChange}
            error={errors.surname}
            onFocus={onFocus}
            onBlur={validateForm}
          />
          <TextFieldGroup
            name="score"
            type="number"
            placeholder="Score"
            value={score}
            onChange={onChange}
            error={errors.score}
            onFocus={onFocus}
            onBlur={validateForm}
          />
          <div className="form-actions">
            <Button
              buttonType="button"
              type="secondary"
              text="Reset form"
              onClick={resetForm}
            />
            <Button
              buttonType="submit"
              type="success"
              text={edit ? "Edit score" : "Add new score"}
            />
          </div>
        </form>
      </div>
    );
  }
}
