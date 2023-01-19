import { Form, Input, Row, Col, DatePicker } from "antd";
import React from "react";
import Select from "react-select";
import { ButtonComp, Gap } from "../../components";
import { createOrUpdateLocation, filterReport } from "../../redux/action";
import "./style.less";
import CreatableSelect from "react-select/creatable";
import "./style.less";

// Comp Modal Edit Location
const bodyModal = (
  dispatch,
  createdLocation,
  optionLocation,
  selectedLocation,
  selectedFromOption,
  selectedReport
) => (
  <>
    <div className="content-wrapper">
      <Form layout="vertical">
        <Form.Item label="Location">
          <Input
            placeholder="Location"
            defaultValue={`${selectedLocation?.category}`}
            disabled
          />
        </Form.Item>
        <Form.Item label="Name 1">
          <Input
            placeholder="Name 1"
            defaultValue={`${selectedLocation?.location}`}
            disabled
            style={{ backgroundColor: "white", color: "#434343" }}
          />
        </Form.Item>
        <Form.Item label="Name 2">
          <CreatableSelect
            options={optionLocation}
            onChange={(e) => {
              // Check if new location
              if (e?.__isNew__) {
                console.log(e, "createad");
                dispatch({ type: "SET_SELECTED_OPT_LOCATION", value: e });
                return;
              }
              // Check if selected location
              console.log(e, "selected");
              dispatch({ type: "SET_SELECTED_OPT_LOCATION", value: e });
            }}
            isClearable
            onInputChange={(e) => {
              dispatch({ type: "SET_REPORT_LOCATION_CREATE", value: e });
            }}
          />
        </Form.Item>
        <Gap height={"80px"} />
        <div className="button-wrapper">
          <ButtonComp
            btnstyle="btn-danger"
            name="Cancel"
            style={{ width: "30%" }}
            onClickBtn={() =>
              dispatch({ type: "SET_REPORT_LOCATION", value: false })
            }
          />

          <Gap width={"80px"} />
          <ButtonComp
            name="Submit"
            style={{ width: "30%" }}
            onClickBtn={() => {
              dispatch(
                createOrUpdateLocation(
                  selectedFromOption,
                  selectedReport,
                  selectedLocation
                )
              );
            }}
          />
        </div>
      </Form>
    </div>
  </>
);

// const checkedLocation = () => {
//   var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
//   console.log(checkboxes);
// };

// const onChangeStart = (date, dateString, dispatch) => {
//   dispatch({ type: "SET_REPORT_DATE_FROM", value: date });
// };
const onChangeEnd = (date, dateString) => {
  console.log(date, dateString);
};

const bodyModalFilter = (
  dispatch,
  areaOption,
  departementOption,
  carOption,
  areaSelected,
  departementSelected,
  carSelected,
  dateFrom,
  dateTo
) => (
  <>
    <div className="content-wrapper">
      <Form layout="vertical">
        <Form.Item label="Area">
          <Select
            options={areaOption}
            isClearable={true}
            onChange={(e) =>
              dispatch({ type: "SET_REPORT_AREA_OPT_SELECTED", value: e })
            }
          />
        </Form.Item>
        <Form.Item label="Departement">
          <Select
            options={departementOption}
            isClearable={true}
            onChange={(e) =>
              dispatch({ type: "SET_REPORT_DEPART_OPT_SELECTED", value: e })
            }
          />
        </Form.Item>
        <Form.Item label="Car">
          <Select
            options={carOption}
            isClearable={true}
            onChange={(e) =>
              dispatch({ type: "SET_REPORT_CAR_OPT_SELECTED", value: e })
            }
          />
        </Form.Item>
        <Row>
          <Col xs={12}>
            <Form.Item label="From Date">
              <DatePicker
                onChange={(date) => {
                  dispatch({ type: "SET_REPORT_DATE_FROM", value: date._d });
                }}
                getPopupContainer={(triggerNode) => {
                  return triggerNode.parentNode;
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item label="To Date">
              <DatePicker
                onChange={(date) => {
                  dispatch({ type: "SET_REPORT_DATE_TO", value: date._d });
                }}
                getPopupContainer={(triggerNode) => {
                  return triggerNode.parentNode;
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Col span={16}>
          <div className="wrapper-checkbox">
            <div className="inputGroup">
              <input id={`option`} name="optionmenu" type="checkbox" />
              <label htmlFor={`option`}>New Location</label>
            </div>
          </div>
        </Col>
      </Form>
    </div>
    <div className="button-wrapper">
      <ButtonComp
        btnstyle="btn-danger"
        name="Cancel"
        style={{ width: "30%" }}
        onClickBtn={() => dispatch({ type: "SET_REPORT_FILTER", value: false })}
      />
      <Gap width={"80px"} />
      <ButtonComp
        name="Filter"
        style={{ width: "30%" }}
        onClickBtn={() => {
          dispatch(
            filterReport(
              areaSelected,
              departementSelected,
              carSelected,
              dateFrom,
              dateTo
            )
          );
        }}
      />
      <Gap width={"20px"} />
    </div>
  </>
);

export { bodyModalFilter, bodyModal };
