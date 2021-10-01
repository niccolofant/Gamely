import { BrowserRouter as Router, Route } from "react-router-dom";
import GamelyApp from "./components/GamelyApp";
import Layout from "./components/Layout";
import MainPage from "./components/MainPage";

function App() {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={MainPage} />
        <Route path="/app" component={GamelyApp} />
      </Layout>
    </Router>
  );
}

export default App;
