const Login = () => {
  const login = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);
  };
  return (
    <div className="h-screen w-screen bg-linear-to-br from-blue-300 to-orange-300 flex justify-center items-center">
      <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-md flex flex-col gap-6 text-center">
        <h2 className="text-3xl font-bold text-white drop-shadow-md">
          Admin Login
        </h2>

        <form className="flex flex-col gap-5" onSubmit={(e) => login(e)}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-white/90 text-gray-800 placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-white/90 text-gray-800 placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 transition-all duration-200 rounded-xl py-3 text-white font-semibold shadow-md hover:shadow-lg cursor-pointer"
          >
            Log In
          </button>
        </form>

        <p className="text-black text-sm font-medium">
          No account?{" "}
          <a
            href="/signup"
            className="underline text-orange-600 hover:text-orange-800"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
