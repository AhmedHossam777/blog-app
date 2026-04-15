function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-4">Page Not Found</p>
        <a
          href="/"
          className="mt-6 inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

export default NotFound;
