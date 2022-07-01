import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthRoute from "./components/AuthRoute";
import Canvas from "./pages/Canvas";
import Home from "./pages/Home";

import "./styles/globals.scss";
import "./components/UI/CustomSelect/customSelect.scss";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/mini-paint"
          element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          }
        ></Route>
        <Route
          path="/mini-paint/draw"
          element={
            <AuthRoute>
              <Canvas />
            </AuthRoute>
          }
        ></Route>
        {/* <Route path='/signin' element={<SignIn />}></Route>
				<Route path='/signup' element={<SignUp />}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
