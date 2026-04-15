import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import BlogList from "./features/blog/components/BlogList";
import BolgPage from "./features/blog/components/BolgPage";
import CreateBlog from "./features/blog/components/CreateBlog";
import Header from "./layout/Header";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BolgPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-blog" element={<CreateBlog />} />
      </Routes>
    </div>
  );
}

export default App;
