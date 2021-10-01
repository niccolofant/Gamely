import { BrowserRouter as Router, Route } from "react-router-dom";

import GamelyApp from "./components/GamelyApp";
import Layout from "./components/Layout";
import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Route path="/app" component={GamelyApp} />
      </Layout>
    </Router>
  );
}

export default App;
