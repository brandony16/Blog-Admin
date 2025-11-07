import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { jwtDecode } from "jwt-decode";
import Alert from "../components/Alert.jsx";

const CreateArticle = () => {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saveType, setSaveType] = useState("Draft");
  const [errors, setErrors] = useState([]);
  const [notif, setNotif] = useState(null);

  const handleSave = async () => {
    try {
      setErrors([]);
      console.log(token);
      console.log(jwtDecode(token));
      const res = await fetch("http://localhost:3000/api/articles/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          body,
          publishArticle: saveType === "Publish",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          setErrors([{ msg: data.message }]);
        } else {
          setErrors(data.errors);
        }
      } else {
        setTitle("");
        setBody("");
        setSaveType("");
        setNotif(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 flex flex-col gap-6 max-w-[1200px]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-800">Create New Article</h1>
        <div className="flex gap-3">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition cursor-pointer">
            Save Draft
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition cursor-pointer">
            Publish
          </button>
        </div>
      </div>
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
        <input
          type="text"
          placeholder="Article Title"
          className="text-2xl font-semibold border-b-2 border-gray-200 focus:border-blue-500 outline-none p-2"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name="title"
          required
          minLength={1}
          maxLength={50}
        />

        <textarea
          placeholder="Write your article content here..."
          className="min-h-[400px] border border-gray-200 rounded-lg p-4 focus:border-blue-500 outline-none resize-y"
          onChange={(e) => setBody(e.target.value)}
          value={body}
          name="body"
          required
          minLength={10}
        />
        <p className="italic text-gray-600 self-end">
          Characters: {body.length}
        </p>
        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-left">
            <ul className="list-disc list-inside space-y-1">
              {errors.map((err, i) => (
                <li key={i}>{err.msg}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex gap-3 w-full">
          <select
            name="saveType"
            className="border border-gray-200 rounded-lg px-3 py-2 w-40 focus:border-blue-500 outline-none"
            onChange={(e) => setSaveType(e.target.value)}
            value={saveType}
          >
            <option>Draft</option>
            <option>Publish</option>
          </select>
          <button
            onClick={handleSave}
            className="bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition w-full cursor-pointer"
          >
            Save Article
          </button>
        </div>
      </div>
      {notif && (
        <Alert
          message={notif}
          type={notif.type}
          onClose={() => setNotif(null)}
        />
      )}
    </div>
  );
};

export default CreateArticle;
