import { Form, Input } from "antd";
import React from "react";
import { ButtonComp, Gap } from "../../components";
import { createArea, editArea } from "../../redux/action/area";
import "./style.less";

// Comp Modal Create
const bodyModal = (dispatch, valueArea, globalReducer) => (
  <>
    <div className="content-wrapper">
      <Form layout="vertical">
        <Form.Item label="Area" required>
          <Input
            style={{
              ...(globalReducer.isError?.area_name && {
                border: "1px solid red",
              }),
            }}
            placeholder="Area Name"
            onChange={(e) =>
              dispatch({ type: "SET_AREA_ADD", value: e.target.value })
            }
          />
          {/* Validation */}
          {globalReducer.isError && (
            <>
              <Gap height={"8px"} />
              <p style={{ marginLeft: "2px", color: "red" }}>
                {globalReducer.isError?.area_name}
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
            onClickBtn={() => dispatch(createArea(valueArea))}
          />
        </div>
      </Form>
    </div>
  </>
);

// Comp Modal Edit
const bodyModalEdit = (dispatch, area, valueArea, globalReducer) => (
  <>
    <div className="content-wrapper">
      <Form layout="vertical">
        <Form.Item label="Area" required>
          <Input
            style={{
              ...(globalReducer.isError && { border: "1px solid red" }),
            }}
            placeholder="Area Name"
            value={valueArea}
            onChange={(e) =>
              dispatch({ type: "SET_AREA_ADD", value: e.target.value })
            }
          />
          {globalReducer.isError && (
            <>
              <Gap height={"8px"} />
              <p style={{ marginLeft: "2px", color: "red" }}>
                {globalReducer.isError?.area_name}
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
            onClickBtn={() =>
              dispatch({ type: "SET_MODAL_EDIT", value: false })
            }
          />
          <Gap width={"80px"} />
          <ButtonComp
            name="Edit"
            style={{ width: "30%" }}
            onClickBtn={() => dispatch(editArea(valueArea, area[0].key))}
          />
        </div>
      </Form>
    </div>
  </>
);

export { bodyModal, bodyModalEdit };
