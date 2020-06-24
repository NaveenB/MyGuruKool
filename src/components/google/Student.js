import React, { Component, Fragment } from "react";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FileUpload from "../FileUpload";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/HashLoader";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
// import AudioVideo from "./AudioVideo";
import Video from "../Video";
import * as _util from "../util/utils";
import * as _apiUtils from "../util/AxiosUtil";
import * as _constants from "../util/constants";
import "@fortawesome/fontawesome-free/css/all.css";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

// let student = {
//   name,
//   group: { name, id },
//   subjects: { exercises: { exerciseTitle, exercisedata, submissionDate } },
// };

export default class Student extends Component {
  constructor(props) {
    super(props);
  }

  render() {}
}
