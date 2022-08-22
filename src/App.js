import React from "react";
// import "./App.less";
import { Provider } from "react-redux";
import Cookies from "universal-cookie";
import { Sidebar } from "./components";
import { LoginPage } from "./pages";
import store from "./redux/";
const cookies = new Cookies();

const authToken = cookies.get("token");

function App() {
  return (
    <>
      {/* <BrowserRouter>
        <Router />
      </BrowserRouter> */}
      <Provider store={store}>
        {!authToken ? <LoginPage /> : <Sidebar />}
        {/* {isLoadingPage && <Loading />} */}
      </Provider>
      {/* <LoginPage /> */}
    </>
  );
}

export default App;
