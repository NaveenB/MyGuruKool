import React, { Component, Fragment } from "react";
import Student from "./microsoft/Student";
import GoogleStudent from "./google/Student";
import axios from "axios";
import * as _constants from "./util/constants";

export default class Classwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentData: null,
    };
    this.handleStudentDataFromProvider = this.handleStudentDataFromProvider.bind(
      this
    );
  }

  handleStudentDataFromProvider = (studentData) => {
    this.props.studentData(studentData);
  };

  componentDidMount() {
    axios
      .get(
        // "https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/notebooks/1-9e7210a1-77c7-4b10-8a1b-ab0fb4a9f4dd/sectionGroups"
        "https://www.googleapis.com/auth/userinfo.profile",
        {
          params: {},
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem(
              _constants.ACCESS_TOKEN
            )}`,
          },
        }
      )
      .then((response) => {
        this.setState({
          studentData: response.data,
        });
      });
  }

  render() {
    return sessionStorage.getItem(_constants.LOGIN_PROVIDER) ===
      _constants.MICROSOFT ? (
      <Student studentData={this.handleStudentDataFromProvider} />
    ) : (
      <GoogleStudent />
    );
  }
}
