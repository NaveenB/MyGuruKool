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

// Demo styles, see 'Styles' section below for some notes on use.
// import "react-accessible-accordion/dist/fancy-example.css";

// let student = {
//   name,
//   group: { name, id },
//   subjects: { exercises: { exerciseTitle, exercisedata, submissionDate } },
// };
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
let isLoading = false;
export default class Student extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    isLoading = true;
  }
  render() {
    let data;
    let vidData = {
      youtubelink: "https://www.youtube.com/watch?v=DuDCZRuApXI",
      youtubename: "React CommentBox Tutorial Example",
    };
    let classwork = [
      {
        name: "Mathematics",
        assignments: [
          {
            title: "Addition",
            submissionDate: "21.12.2020",
            content: "Math Addition Content",
            vidData: {
              youtubelink: "https://www.youtube.com/watch?v=DuDCZRuApXI",
              youtubename: "React CommentBox Tutorial Example",
            },
          },
          {
            title: "Substraction",
            submissionDate: "21.12.2020",
            content: "Math Substraction Content",
          },
        ],
      },
      {
        name: "German",
        assignments: [
          {
            title: "Grammar",
            submissionDate: "21.12.2020",
            content: "Grammar Content",
          },
        ],
      },
    ];

    return (
      <Fragment>
        <div className="container">
          <Tabs>
            <div className="row">
              <div className="row sub-excer-section">
                <div className="col-12">
                  <ul
                    className="nav nav-pills mb-3 sub-nav"
                    id="pills-tab"
                    role="tablist"
                  >
                    <TabList>
                      {classwork.map((classwork) => (
                        <Tab>
                          <div className="column">{classwork.name}</div>
                          <div className="column">
                            <img
                              src={_util.loadIconBySubject(classwork.name)}
                              className="subjectIcon"
                            />
                          </div>
                        </Tab>
                      ))}
                    </TabList>
                  </ul>
                </div>
              </div>
            </div>
            <div className="tabcontent col-12">
              {/* <ClipLoader
                css={override}
                size={30}
                color={"#D77F36"}
                loading={this.state.isLoading}
              /> */}
              <Accordion allowZeroExpanded={true}>
                {classwork.map((items) => (
                  <Fragment>
                    <TabPanel>
                      {items.assignments.map((assignment) => (
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              <div className="row">
                                <div className="float-left col-12 exercisetitle">
                                  {assignment.title
                                    ? assignment.title
                                    : "No Exercise Data"}
                                  <small className="text-muted float-right">
                                    {assignment.submissionDate
                                      ? assignment.submissionDate
                                      : ""}
                                  </small>
                                </div>
                              </div>
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <div className="card-body">
                              <div className="row">
                                {/* <div className="row testing-color-yellow"> */}
                                <div className="col-8">
                                  <b>Exercise Instructions</b>

                                  <ul

                                  // dangerouslySetInnerHTML={{
                                  //   __html: exe.content
                                  //     ? exe.content.instructions
                                  //     : "",
                                  // }}
                                  >
                                    {assignment.content}
                                  </ul>
                                </div>
                                <div className="col-4">
                                  <button
                                    type="button"
                                    className="btn btn-primary turnin"
                                  >
                                    <i className="fas fa-check"></i> Turn In
                                  </button>
                                </div>
                                <div className="col-12">
                                  <b>Exercise Audio/ Video Explanation</b>
                                  <ul>
                                    {/* {vidData.youtubelink} */}
                                    {/* {exe.content && exe.content.youtubelink ? ( */}
                                    <Video vidData={vidData} />
                                    {/* ) : (
                                      ""
                                    )} */}
                                  </ul>
                                </div>
                              </div>

                              <div className="card card-body fileblock row">
                                <div className="col-12">
                                  {/* {exe.content ? ( */}
                                  <FileUpload
                                    exerciesDetails="{exe.content}"
                                    groupData="{this.state.groupDetails.id}"
                                    subjectName="{this.state.currentView}"
                                    title="{exe.title}"
                                    studentDetails="{this.state.studentData}"
                                  />
                                  {/* ) : (
                                    ""
                                  )} */}
                                </div>
                                <div className="col-12">
                                  {/* {this.state.formUpload} */}
                                </div>
                              </div>
                            </div>
                          </AccordionItemPanel>
                        </AccordionItem>
                      ))}
                    </TabPanel>
                  </Fragment>
                ))}
              </Accordion>
            </div>
          </Tabs>
        </div>
      </Fragment>
    );
  }
}
