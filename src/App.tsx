import BlogList from "./features/blog/components/BlogList";
import BolgPage from "./features/blog/components/BolgPage";
import Header from "./layout/Header";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BolgPage />} />
      </Routes>
    </div>
  );
}

export default App;
