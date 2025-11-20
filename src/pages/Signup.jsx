import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { login } = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const inputStyle =
    "bg-white/90 text-gray-800 placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500";

  const handleSignup = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = {
      firstName: formData.get("firstname"),
      lastName: formData.get("lastname"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      secretPassword: formData.get("secretPassword"),
    };

    try {
      setErrors([]);
      const res = await fetch("http://localhost:3000/api/auth/register-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors);
      } else {
        login(data.user, data.token);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen w-screen bg-linear-to-br from-blue-300 to-orange-300 flex justify-center items-center">
      <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-10 flex flex-col gap-6 text-center">
        <h2 className="text-3xl font-bold text-white drop-shadow-md">
          Admin Signup
        </h2>
        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-left">
            <ul className="list-disc list-inside space-y-1">
              {errors.map((err, i) => (
                <li key={i}>{err.msg}</li>
              ))}
            </ul>
          </div>
        )}
        <form className="flex flex-col gap-5" onSubmit={(e) => handleSignup(e)}>
          <div className="flex gap-4">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              className={`${inputStyle} flex-1`}
              minLength={1}
              maxLength={30}
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              className={`${inputStyle} flex-1`}
              minLength={1}
              maxLength={30}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={inputStyle}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className={inputStyle}
            minLength={4}
            maxLength={64}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={inputStyle}
            minLength={4}
            maxLength={64}
            required
          />
          <input
            type="password"
            name="secretPassword"
            placeholder="Secret Password"
            className={inputStyle}
            required
          />

          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 transition-all duration-200 rounded-xl py-3 text-white font-semibold shadow-md hover:shadow-lg cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-black text-sm font-medium">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline text-orange-600 hover:text-orange-800"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
