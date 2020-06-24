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

export default class Student extends Component {
  constructor(props) {
    super(props);
    // alert("Student.constructor");

    this.state = {
      studentData: null,
      displayName: "",
      sections: "", //Subjects
      tabIndex: 0,
      exercise: "",
      exercisedata: "",
      isLoading: false,
      formUpload: "",
      currentView: "",
      isOpen: false,
      vidId: "",
      exerciseTitle: "",
      groupDetails: "",
      subjectIcon: "",
      expand: true,
      openedItems: [],
      showNotebook: false,
      showVideoConference: false,
    };
    this.displaySubjectIconByName = this.displaySubjectIconByName.bind(this);
    this.handleStudentDataFetch = this.handleStudentDataFetch.bind(this);
  }

  handleStudentDataFetch() {
    this.props.studentData(this.state.studentData);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    //Fetch user Profile
    _apiUtils.userProfile().then((response) => {
      this.setState({
        studentData: response.data,
      });

      //Pushing StudentData to Home
      this.handleStudentDataFetch();

      //Profile department is translated to GroupName
      _apiUtils.loadSite(this.state.studentData.department).then((response) => {
        this.setState({ groupDetails: response.data });

        //load subjects
        _apiUtils
          .loadSubjects(
            this.state.groupDetails.id,
            this.state.studentData.displayName //studentData.displayName => StudentName
          )
          .then((response) => {
            this.setState({ isLoading: false });
            //Sections <=> Subjects
            this.setState({ sections: response.data.value });

            // // ******commented currentView: no default selection on landingpage******
            // this.setState({
            //   currentView: this.state.sections[0].displayName,
            // });
            // // ******commented out the code as loading assignments are done also upon *handleclick* ******
            // // load assignments
            // _apiUtils
            //   .loadAssignments(
            //     this.state.groupDetails.id,
            //     this.state.sections[0].id
            //   )
            //   .then((response) => {
            //     this.setState({
            //       currentView: this.state.sections[0].displayName,
            //     });
            //     this.setState({
            //       exercise: response.data,
            //       exercisedata: this.state.exercise,
            //     });
            //   });
          });
      });
    });
  }

  handleClick = (event) => {
    this.setState({ showVideoConference: false });
    this.setState({ showNotebook: false });
    console.log(this.state.expand);
    this.setState({ expand: false, openedItems: [] });
    this.setState({ currentView: event.target.text });
    this.setState({ isLoading: true });
    // _apiUtils
    //   .loadAssignments(student.group.id, event.target.id)
    _apiUtils
      .loadAssignments(this.state.groupDetails.id, event.target.id)
      .then((response) => {
        this.setState({ isLoading: false });
        this.setState({ exercise: response.data }); //***VISIT HERE
        /*Sort by due date */
        {
          let sortedExercises =
            response.data &&
            response.data.value.sort((a, b) => {
              return (
                new Date(a.submissionDate).getTime() -
                new Date(b.submissionDate).getTime()
              );
            });
          console.log("sortedExercises: " + sortedExercises);
        }

        this.state.exercise &&
          this.state.exercise.value.map((exe, i) =>
            _apiUtils.loadAssignmentPage(exe.contentUrl).then((response) => {
              this.state.exercise.value[i].content = _util.parseOneNotePage(
                response
              );
              this.setState({ exercisedata: this.state.exercise });
            })
          );
      });
    return false;
  };

  displaySubjectIconByName(subjectName, targetId) {
    let subjectIcon = _util.loadIconBySubject(subjectName);
    //if iconFound
    if (subjectIcon.trim() !== "") {
      return (
        <img
          src={subjectIcon}
          id={targetId}
          className="subjectIcon"
          onClick={this.handleClick}
        />
      );
    }
  }

  render() {
    //console.log(this.state.openedItems);
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="row sub-excer-section">
              <div className="col-12">
                <ul
                  className="nav nav-pills mb-3 sub-nav"
                  id="pills-tab"
                  role="tablist"
                >
                  {this.state.sections &&
                    this.state.sections.map((key, i) => (
                      <li key={key.id} className="nav-item">
                        <a
                          className={
                            this.state.currentView === key.displayName
                              ? "active nav-link"
                              : "nav-link"
                          }
                          id={key.id}
                          data-toggle="pill"
                          href="#?"
                          onClick={this.handleClick}
                        >
                          {/* Exercise Name */}
                          {key.displayName}
                          <br />
                          {this.displaySubjectIconByName(
                            key.displayName,
                            key.id
                          )}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="tabcontent col-12">
            <ClipLoader
              css={override}
              size={30}
              color={"#D77F36"}
              loading={this.state.isLoading}
            />
            {/* <Accordion allowZeroExpanded={true} className="testing-color-green"> */}
            <Accordion
              allowZeroExpanded={true}
              onChange={(e) => this.setState({ openedItems: e })} //
              preExpanded={this.state.openedItems}
            >
              <Fragment>
                {this.state.exercisedata &&
                  this.state.exercisedata.value.map((exe, i) => (
                    <AccordionItem key={exe.id} uuid={exe.id}>
                      {exe.title ? (
                        <Fragment>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              <div className="row">
                                <div className="float-left col-12 exercisetitle">
                                  {exe.title
                                    ? (this.state.exerciseTitle = exe.title)
                                    : "No Exercise Data"}
                                  <small className="text-muted float-right">
                                    {exe.content && exe.content.submissionDate
                                      ? exe.content.submissionDate
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
                                    dangerouslySetInnerHTML={{
                                      __html: exe.content
                                        ? exe.content.instructions
                                        : "",
                                    }}
                                  ></ul>
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
                                    {exe.content && exe.content.youtubelink ? (
                                      <Video vidData={exe.content} />
                                    ) : (
                                      ""
                                    )}
                                  </ul>
                                </div>
                              </div>

                              <div className="card card-body fileblock row">
                                <div className="col-12">
                                  <div></div>
                                  {exe.content ? (
                                    <FileUpload
                                      exerciesDetails={exe.content}
                                      groupData={this.state.groupDetails.id}
                                      subjectName={this.state.currentView}
                                      title={exe.title}
                                      studentDetails={this.state.studentData}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="col-12">
                                  {this.state.formUpload}
                                </div>
                              </div>
                            </div>
                          </AccordionItemPanel>
                        </Fragment>
                      ) : (
                        <h5>
                          Hurrayyy! You have finished all your assignments of
                          this subject
                        </h5>
                      )}
                    </AccordionItem>
                  ))}
              </Fragment>
            </Accordion>
          </div>
        </div>
      </Fragment>
    );
  }
}
