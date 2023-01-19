import { Form, Input } from "antd";
import React from "react";
import { ButtonComp, Gap, SelectSearchComp } from "../../components";
import { createNewlocation, filterLocation } from "../../redux/action";
import "./style.less";

// Comp Modal Create
const bodyModal = (
  dispatch,
  locationType,
  globalReducer,
  valueSelected,
  locationName
) => (
  <>
    <div className="content-wrapper">
      <Form layout="vertical">
        <Form.Item label="Location" required>
          <SelectSearchComp option={locationType} isSearchable={false} />
          {/* Validation */}
          {globalReducer.isError && (
            <>
              <Gap height={"8px"} />
              <p style={{ marginLeft: "2px", color: "red" }}>
                {globalReducer.isError?.type_loc}
              </p>
            </>
          )}
        </Form.Item>
        <Gap height={"8px"} />
        <Form.Item label="Name" required>
          <Input
            value={locationName}
            style={{
              ...(globalReducer.isError?.location_name && {
                border: "1px solid red",
              }),
            }}
            onChange={(e) =>
              dispatch({ type: "SET_LOCATION_NAME", value: e.target.value })
            }
            placeholder="Location Name"
          />
          {/* Validation */}
          {globalReducer.isError && (
            <>
              <Gap height={"8px"} />
              <p style={{ marginLeft: "2px", color: "red" }}>
                {globalReducer.isError?.location_name}
              </p>
            </>
          )}
        </Form.Item>
        <Gap height={"80px"} />
        <div className="button-wrapper">
          <ButtonComp
            btnstyle="btn-danger"
            name="Cancel"
            style={{ width: "30%" }}
            onClickBtn={() => dispatch({ type: "SET_MODAL", value: false })}
          />
          <Gap width={"80px"} />
          <ButtonComp
            name="Submit"
            style={{ width: "30%" }}
            onClickBtn={() =>
              dispatch(createNewlocation(locationName, valueSelected))
            }
          />
        </div>
      </Form>
    </div>
  </>
);

// Comp Modal Filter
const bodyModalFilter = (dispatch, locationType, valueSelected) => (
  <>
    <div className="content-wrapper">
      <Form layout="vertical">
        <Form.Item label="Location">
          <SelectSearchComp option={locationType} isClearable={true} />
        </Form.Item>
        <Gap height={"80px"} />
        <div className="button-wrapper">
          <ButtonComp
            btnstyle="btn-danger"
            name="Cancel"
            style={{ width: "30%" }}
            onClickBtn={() =>
              dispatch({ type: "SET_FILTER_LOCATION", value: false })
            }
          />
          <Gap width={"80px"} />
          <ButtonComp
            name="Filter"
            style={{ width: "30%" }}
            onClickBtn={() => dispatch(filterLocation(valueSelected))}
          />
        </div>
      </Form>
    </div>
  </>
);

export { bodyModal, bodyModalFilter };
