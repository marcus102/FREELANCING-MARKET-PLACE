import { Input, message, Tooltip } from "antd";
import axios from "axios";
import dynamic from "next/dynamic";
import React, { useReducer, useState } from "react";
import { notification } from "antd";
import { BsCheck2Square } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import useAuth from "../../hooks/useAuth";

const editorMood = {
  editor: null,
};
const controlReducer = (state, action) => {
  switch (action.type) {
    case "ABOUT_EDIT":
      return { editor: (state.editor = "ABOUT_EDIT") };
      break;
    case "SKILLS_EDIT":
      return { editor: (state.editor = "SKILLS_EDIT") };
      break;
    case "EDUCATION_EDIT":
      return { editor: (state.editor = "EDUCATION_EDIT") };
      break;
    case "CLOSE_EDITOR":
      return { editor: (state.editor = null) };
      break;
    default:
      return state;
      break;
  }
};
// this is text area for input
const { TextArea } = Input;

const About = ({ id, education, skills, aboutt, setThisUser }) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(controlReducer, editorMood);
  const [aboutBody, setAboutBody] = useState("");
  const [skillsBody, setSkillsBody] = useState("");
  const [educationBody, setEducationBody] = useState("");
  const configJson = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const handleAboutSubmit = (e) => {
    if (!aboutBody) {
      notification.error({
        message: "Error",
        description: "Please field about field",
        placement: "top",
        duration: 2,
        style: {
          width: 300,
          //   marginLeft: "calc(50% - 150px)",
          //   marginTop: "calc(50vh - 100px)",
          borderBottom: "6px solid #e83a3b",
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.4)",
        },
      });
      return;
    } else {
      axios
        .patch(`${process.env.NEXT_PUBLIC_API_URL}/users/about/${id}`, {
          about: aboutBody,
        })
        .then(function (response) {
          if (response.statusText === "OK") {
            setThisUser(response.data.result);
            notification.success({
              message: "Success",
              description: "About Update successfully!",
              placement: "top",
              duration: 2,
              style: {
                width: 300,
                //   marginLeft: "calc(50% - 150px)",
                //   marginTop: "calc(50vh - 100px)",
                borderBottom: "6px solid #3a3",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.4)",
              },
            });
            dispatch({ type: "CLOSE_EDITOR" });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const handleSkillsSubmit = (e) => {
    if (!skillsBody) {
      notification.error({
        message: "Error",
        description: "Please field-up your skills field",
        placement: "top",
        duration: 2,
        style: {
          width: 300,
          borderBottom: "6px solid #e83a3b",
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.4)",
        },
      });
      return;
    } else {
      axios
        .patch(`${process.env.NEXT_PUBLIC_API_URL}/users/skills/${id}`, {
          skills: skillsBody,
        })
        .then(function (response) {
          if (response.statusText === "OK") {
            setThisUser(response.data.result);
            notification.success({
              message: "Success",
              description: "Skills Update Successfully!",
              placement: "top",
              duration: 2,
              style: {
                width: 300,
                borderBottom: "6px solid #3a3",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.4)",
              },
            });
            dispatch({ type: "CLOSE_EDITOR" });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const handleEducationSubmit = (e) => {
    if (!educationBody) {
      notification.error({
        message: "Error",
        description: "Please field-up your education field",
        placement: "top",
        duration: 2,
        style: {
          width: 300,
          //   marginLeft: "calc(50% - 150px)",
          //   marginTop: "calc(50vh - 100px)",
          borderBottom: "6px solid #e83a3b",
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.4)",
        },
      });
      return;
    } else {
      axios
        .patch(`${process.env.NEXT_PUBLIC_API_URL}/users/education/${id}`, {
          education: educationBody,
        })
        .then(function (response) {
          if (response.statusText === "OK") {
            setThisUser(response.data.result);
            notification.success({
              message: "Success",
              description: "Education Update successfully!",
              placement: "top",
              duration: 2,
              style: {
                width: 300,
                borderBottom: "6px solid #3a3",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.4)",
              },
            });
            dispatch({ type: "CLOSE_EDITOR" });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <div className="profile_about mt-4">
      <div>
        <ul className="box_list_ul">
          <li className="box_list_li">
            <div>
              <h3 className="text-3xl text-gray-800 font-medium pb-2 flex items-end">
                About
                <span
                  className="text-lg pl-3 cursor-pointer text-[#e83a3b]"
                  onClick={() => dispatch({ type: "ABOUT_EDIT" })}
                >
                  <Tooltip title="Edit About box, add something your self!">
                    <FiEdit />
                  </Tooltip>
                </span>
              </h3>
            </div>
            <div className="pb-4">
              {/* {state.editor === null && (<div>Hello</div>)} */}
              {state.editor === "ABOUT_EDIT" ? (
                <div className="shadow-md p-4">
                  <TextArea
                    defaultValue={aboutt}
                    showCount
                    maxLength={500}
                    onChange={(e) => setAboutBody(e.target.value)}
                  />
                  <div>
                    <button
                      className="text-xl mr-3 mt-3"
                      onClick={() => dispatch({ type: "CLOSE_EDITOR" })}
                    >
                      <IoMdClose />
                    </button>
                    <button
                      onClick={handleAboutSubmit}
                      className="text-xl mr-3 mt-3"
                    >
                      <BsCheck2Square />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pl-3 html_parser_in_profile_about">
                  <p>{aboutt}</p>
                </div>
              )}
            </div>
          </li>
          <li className="box_list_li">
            <div>
              <h3 className="text-3xl text-gray-800 font-medium py-2 flex items-end">
                Skills{" "}
                <span
                  className="text-lg pl-3 cursor-pointer text-[#e83a3b]"
                  onClick={() => dispatch({ type: "SKILLS_EDIT" })}
                >
                  <Tooltip title="Edit Skills box, add something your skills self!">
                    <FiEdit />
                  </Tooltip>
                </span>
              </h3>
            </div>
            <div className="pb-4">
              {/* {state.editor === null && (<div>Hello</div>)} */}
              {state.editor === "SKILLS_EDIT" ? (
                <div className="shadow-md p-4">
                  <TextArea
                    showCount
                    maxLength={500}
                    defaultValue={skills}
                    onChange={(e) => setSkillsBody(e.target.value)}
                  />
                  <div>
                    <button
                      className="text-xl mr-3 mt-3"
                      onClick={() => dispatch({ type: "CLOSE_EDITOR" })}
                    >
                      <IoMdClose />
                    </button>
                    <button
                      onClick={handleSkillsSubmit}
                      className="text-xl mr-3 mt-3"
                    >
                      <BsCheck2Square />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pl-3 html_parser_in_profile_about">
                  <p>{skills}</p>
                </div>
              )}
            </div>
          </li>
          <li className="box_list_li">
            <div>
              <h3 className="text-3xl text-gray-800 font-medium py-2 flex items-end">
                Eduction{" "}
                <span
                  className="text-lg pl-3 cursor-pointer text-[#e83a3b]"
                  onClick={() => dispatch({ type: "EDUCATION_EDIT" })}
                >
                  <Tooltip title="Edit Education box, add something your eduction background self!">
                    <FiEdit />
                  </Tooltip>
                </span>
              </h3>
            </div>
            <div className="pb-4">
              {/* {state.editor === null && (<div>Hello</div>)} */}
              {state.editor === "EDUCATION_EDIT" ? (
                <div>
                  <TextArea
                    showCount
                    maxLength={500}
                    defaultValue={education}
                    onChange={(e) => setEducationBody(e.target.value)}
                  />
                  <div className="shadow-md p-4">
                    <button
                      className="text-xl mr-3 mt-3"
                      onClick={() => dispatch({ type: "CLOSE_EDITOR" })}
                    >
                      <IoMdClose />
                    </button>
                    <button
                      onClick={handleEducationSubmit}
                      className="text-xl mr-3 mt-3"
                    >
                      <BsCheck2Square />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pl-3 html_parser_in_profile_about">
                  <p>{education}</p>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
