import {
  Breadcrumb,
  Col,
  Form,
  Input,
  Layout,
  Popconfirm,
  Row,
  Select,
  Skeleton,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonComp,
  CardHeader,
  Gap,
  ModalComp,
  SelectSearchComp,
  TableComp,
} from "../../components";
import {
  createDepartement,
  editDepartement,
  filterDepartement,
  getDataArea,
  getDataDepartement,
  searchDepartement,
} from "../../redux/action";
import "./style.less";

const Departement = () => {
  const [optionArea, setOptionArea] = useState([]);
  const [departement, setDepartement] = useState([]);
  const { globalReducer, departementReducer, areaReducer } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const areaData = areaReducer.area;
  const valueDepartement = departementReducer.areaCreate;
  const valueSelected = globalReducer.selectedValue;
  const filterSelect = globalReducer.isTagFilter;

  const handleAreaData = () => {
    const newArr = areaData.map((item) => ({
      value: item.id,
      label: item.area_name,
    }));
    setOptionArea(newArr);
  };

  // Column Header Table
  const columns = [
    {
      title: "Area",
      dataIndex: "area_name",
      width: "40%",
    },
    {
      title: "Departement",
      dataIndex: "departement_name",
      width: "40%",
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (_, record) =>
        departementReducer.departement.length >= 1 ? (
          <Popconfirm
            title="Sure to edit?"
            onConfirm={() => handleEdit(record.id)}>
            <a>Edit</a>
          </Popconfirm>
        ) : null,
    },
  ];

  // Edit Modal
  const handleEdit = (key) => {
    const newData = departementReducer.departement.filter(
      (item) => item.id === key
    );
    setDepartement(newData);
    dispatch({
      type: "SET_DEPARTEMENT_ADD",
      value: newData[0].departement_name,
    });
    dispatch({ type: "SET_MODAL_EDIT", value: true });

    const data = {
      label: newData[0].area_name,
      value: newData[0].area_pk,
    };

    dispatch({ type: "SET_SELECTED", value: data });
  };

  useEffect(() => {
    dispatch(getDataDepartement());
    dispatch(getDataArea());
    handleAreaData();
  }, []);

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Departement</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          minHeight: 360,
        }}>
        {/* Title */}
        <Row>
          <Col span={12} order={4}>
            <h1>Master Departement</h1>
          </Col>
        </Row>
        <Gap height={"30px"} />
        {/* Card Header */}
        <CardHeader
          btnFilter={true}
          onClickFilter={() =>
            dispatch({ type: "SET_DEPARTEMENT_FILTER", value: true })
          }
          icon={"fluent:add-12-regular"}
          nameBtn={"Create New"}
          onClickBtn={() => dispatch({ type: "SET_MODAL", value: true })}
          onSearch={(e) =>
            dispatch(
              searchDepartement(e.target.value, departementReducer.departement)
            )
          }
        />
        <Gap height={"15px"} />
        {filterSelect?.departement && (
          <p>{`Filter for “${filterSelect?.departement}”`}</p>
        )}
        {/* Table */}
        <Row>
          <Col span={24} order={4}>
            {globalReducer.isLoading ? (
              <>
                {columns.map((index) => (
                  <>
                    <Skeleton.Input
                      active
                      style={{ width: "100%" }}
                      size="default"
                      block={true}
                    />
                    <Gap height={"10px"} />
                  </>
                ))}
              </>
            ) : (
              <TableComp
                data={departementReducer.departement}
                columns={columns}
              />
            )}
          </Col>
        </Row>
      </div>
      <ModalComp
        title="Create Master Departement"
        show={globalReducer.isModal}
        onClose={() => dispatch({ type: "SET_MODAL", value: false })}
        content={bodyModal(
          dispatch,
          globalReducer,
          optionArea,
          valueDepartement,
          valueSelected,
          departement
        )}
        widthModal="40%"
      />

      <ModalComp
        title="Edit Master Departement"
        show={globalReducer.isModalEdit}
        onClose={() => dispatch({ type: "SET_MODAL_EDIT", value: false })}
        content={bodyModalEdit(
          dispatch,
          globalReducer,
          optionArea,
          valueDepartement,
          valueSelected,
          departement
        )}
        widthModal="40%"
      />

      <ModalComp
        title="Filter Departement"
        show={departementReducer.isModalFilterDepartement}
        onClose={() =>
          dispatch({ type: "SET_DEPARTEMENT_FILTER", value: false })
        }
        content={bodyModalFilter(
          dispatch,
          optionArea,
          globalReducer,
          valueSelected
        )}
        widthModal="25%"
      />
    </>
  );
};

// Comp Modal Create
const bodyModal = (
  dispatch,
  globalReducer,
  optionArea,
  valueDepartement,
  valueSelected
) => (
  <>
    <div className="content-wrapper">
      <Form layout="vertical">
        <Form.Item label="Area" required>
          <SelectSearchComp option={optionArea} />
        </Form.Item>
        <Gap height={"28px"} />
        <Form.Item label="Departement" required>
          <Input
            style={{
              ...(globalReducer.isError?.departement_name && {
                border: "1px solid red",
              }),
            }}
            placeholder="Departement Name"
            onChange={(e) =>
              dispatch({ type: "SET_DEPARTEMENT_ADD", value: e.target.value })
            }
          />
          {/* Validation */}

          {globalReducer.isError?.departement_name && (
            <>
              <Gap height={"8px"} />
              <p style={{ marginLeft: "2px", color: "red" }}>
                {globalReducer.isError?.departement_name}
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
              dispatch(createDepartement(valueDepartement, valueSelected))
            }
          />
        </div>
      </Form>
    </div>
  </>
);

// Comp Modal Edit
const bodyModalEdit = (
  dispatch,
  globalReducer,
  optionArea,
  valueDepartement,
  valueSelected,
  departement
) => (
  <>
    <div className="content-wrapper">
      <Form layout="vertical">
        <Form.Item label="Area" required>
          <SelectSearchComp option={optionArea} />
        </Form.Item>
        <Gap height={"28px"} />
        <Form.Item label="Departement" required>
          <Input
            style={{
              ...(globalReducer.isError?.departement_name && {
                border: "1px solid red",
              }),
            }}
            placeholder="Departement Name"
            value={valueDepartement}
            onChange={(e) =>
              dispatch({ type: "SET_DEPARTEMENT_ADD", value: e.target.value })
            }
          />
          {/* Validation */}
          {globalReducer.isError?.departement_name && (
            <>
              <Gap height={"8px"} />
              <p style={{ marginLeft: "2px", color: "red" }}>
                {globalReducer.isError?.departement_name}
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
            onClickBtn={() =>
              dispatch(
                editDepartement(
                  valueDepartement,
                  valueSelected,
                  departement[0].id
                )
              )
            }
          />
        </div>
      </Form>
    </div>
  </>
);

const bodyModalFilter = (dispatch, optionArea, valueSelected) => (
  <>
    <div className="content-wrapper">
      <Form layout="vertical">
        <Form.Item label="Area" required>
          <SelectSearchComp option={optionArea} />
        </Form.Item>
        <Gap height={"80px"} />
        <div className="button-wrapper">
          <ButtonComp
            btnstyle="btn-danger"
            name="Cancel"
            style={{ width: "30%" }}
            onClickBtn={() =>
              dispatch({ type: "SET_DEPARTEMENT_FILTER", value: false })
            }
          />
          <Gap width={"80px"} />
          <ButtonComp
            name="Filter"
            style={{ width: "30%" }}
            onClickBtn={() =>
              dispatch(filterDepartement(valueSelected.selectedValue))
            }
          />
        </div>
      </Form>
    </div>
  </>
);

export default Departement;
