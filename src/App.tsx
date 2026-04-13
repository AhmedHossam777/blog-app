import BlogCard from "./components/BlogCard";
import Comment from "./components/Comment";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <BlogCard
        title="My Blog Post"
        description="This is a simple blog post. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        imageUrl="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        author="John Doe"
        date="2023-01-01"
      />

      <Comment
        text="This is a simple comment."
        username="Jane Smith"
        date="2023-01-01"
        likes={12}
      />
    </div>
  );
}

export default App;
