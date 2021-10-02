import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";
import GamelyApp from "./components/GamelyApp";
import Layout from "./components/Layout";
import MainPage from "./components/MainPage";
import authContext from "./components/authContext";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <authContext.Provider value={{ authenticated, setAuthenticated }}>
      <Router>
        <Layout>
          <Route exact path="/" component={MainPage} />
          <Route path="/app" component={GamelyApp} />
        </Layout>
      </Router>
    </authContext.Provider>
  );
}

export default App;
