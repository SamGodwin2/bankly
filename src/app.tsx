import "./app.css";
import { Home } from "./views/home";

const App = () => (
  <>
    <header className="app__row">
      <a
        href="https://www.thisisbud.com/"
        target="_blank"
        rel="noreferrer"
        className="logo"
      >
        <img src="/bankly.svg" alt="Bud logo" />
      </a>
    </header>
    <div className="app">
      <Home />
    </div>
  </>
);

export default App;
