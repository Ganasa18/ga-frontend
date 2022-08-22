import React from "react";
import { Row, Col } from "antd";
import "./style.less";
import SearchForm from "../SearchForm";
import FilterBtn from "../FilterButton";
import ButtonComp from "../Button";

const CardHeader = ({
  nameBtn,
  onClickBtn,
  icon,
  btnFilter = false,
  onClickFilter,
  onSearch,
}) => {
  return (
    <>
      <Row>
        <Col
          span={24}
          xs={{ order: 1 }}
          sm={{ order: 2 }}
          md={{ order: 3 }}
          lg={{ order: 4 }}>
          <div className="card-wrapper">
            <Row>
              <Col
                span={9}
                xs={{ order: 1 }}
                sm={{ order: 2 }}
                md={{ order: 3 }}
                lg={{ order: 4 }}>
                <SearchForm onChange={onSearch} />
              </Col>
              <Col
                span={3}
                xs={{ order: 1 }}
                sm={{ order: 2 }}
                md={{ order: 3 }}
                lg={{ order: 4 }}>
                {btnFilter === true ? (
                  <FilterBtn onClick={onClickFilter} />
                ) : null}
              </Col>
              <Col
                span={4}
                offset={8}
                xs={{ order: 1 }}
                sm={{ order: 2 }}
                md={{ order: 3 }}
                lg={{ order: 4 }}>
                {nameBtn && (
                  <ButtonComp
                    name={nameBtn}
                    onClickBtn={onClickBtn}
                    icon={icon}
                  />
                )}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CardHeader;
