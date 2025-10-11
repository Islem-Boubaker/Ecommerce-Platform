import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <AppRoutes />
    </Router>
  );
}

export default App;
