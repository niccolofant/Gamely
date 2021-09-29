import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./components/About";
import GamelyApp from "./components/GamelyApp";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Route path="/about" component={About} />
        <Route path="/app" component={GamelyApp} />
      </Layout>
    </Router>
  );
}

export default App;
