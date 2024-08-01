import React, { useState } from "react";
import axios from "axios";
import ColorsTable from "./ColorsTable";

const UpdateColor = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:5000/colors/${id}`, { name })
      .then(() => {
        setId("");
        setName("");
        alert("Color updated successfully");
      })
      .catch((error) => console.error("Error updating color:", error));
  };

  return (
    <div className="container mx-auto p-4 text-start">
      <h2 className="text-2xl font-semibold mb-4">Update Color</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2">
          ID:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Update Color
        </button>
      </form>
      <ColorsTable />
    </div>
  );
};

export default UpdateColor;
