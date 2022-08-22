import React from "react";
import { Col, Row, Card, Form, Input, Button } from "antd";
import logoIT from "../../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import "./style.less";
import useForm from "../../utils/useForm";
import { setToken } from "../../redux/action";
import { Gap, MessageComp } from "../../components";

const LoginPage = () => {
  // let navigate = useNavigate();
  const dispatch = useDispatch();
  const { globalReducer } = useSelector((state) => state);
  const [form, setForm] = useForm({
    username: "",
    password: "",
  });

  const loginSubmit = (e) => {
    e.preventDefault();

    if (form.username === "" || form.password === "")
      return MessageComp("Please Fill Form", "warning");
    dispatch(setToken(form));
  };

  return (
    <>
      <Row>
        <Col span={24} className="container-login">
          <div className="container-card">
            <img className="logo-img" src={logoIT} alt="Logo" width="300px" />
            <Card bordered={true} className="card-width">
              <h1 className="title-card">Login for GA Department!</h1>
              <br />
              <Form layout="vertical">
                <Form.Item label="Username" required>
                  <Input
                    placeholder="Username"
                    onChange={(value) => setForm("username", value)}
                  />
                </Form.Item>
                <Form.Item label="Password" required>
                  <Input.Password
                    placeholder="Password"
                    onChange={(value) => setForm("password", value)}
                  />
                </Form.Item>
                <Row>
                  <Col span={14} offset={5}>
                    <Form.Item>
                      <Gap height="50px" />
                      <Button
                        type="submit"
                        className="btn-flat"
                        disabled={globalReducer.isLoading ? true : false}
                        onClick={loginSubmit}>
                        Login
                        {globalReducer.isLoading && (
                          <span className="ant-spin-dot ant-spin-dot-spin">
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                          </span>
                        )}
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
