import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import BlogList from "./features/blog/components/BlogList";
import BolgPage from "./features/blog/components/BolgPage";
import CreateBlog from "./features/blog/components/CreateBlog";
import Profile from "./features/profile/Profile";
import Header from "./layout/Header";
import { Route, Routes } from "react-router";
import NotFound from "./layout/NotFound";
import UpdateBlog from "./features/blog/components/UpdateBlog";

function App() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Header />
      <main className="min-h-[calc(100vh-4rem)]">
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BolgPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-blog/:id" element={<UpdateBlog />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
