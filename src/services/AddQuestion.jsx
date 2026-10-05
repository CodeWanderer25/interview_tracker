import React, { useState } from "react";
import { X } from "lucide-react";
import Button from "../Utils/Button";

const AddQuestion = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    question: "",
    category: "DSA",
    difficulty: "Easy",
    status: "In Progress",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

      {/* Modal */}
      <div className="w-105 bg-white rounded-xl shadow-xl border border-gray-200">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Add Question
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Add a new question to your interview tracker.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700"
          >
            <X size={18} />
          </button>

        </div>


        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">

          {/* Question */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Question
            </label>

            <input
              type="text"
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="Enter question"
              required
              className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>


          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="DSA">DSA</option>
              <option value="Git">Git</option>
              <option value="Technical">Technical</option>
            </select>
          </div>


          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Difficulty
            </label>

            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>


          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>


          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>

            <Button type="submit">
              Add Question
            </Button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default AddQuestion;