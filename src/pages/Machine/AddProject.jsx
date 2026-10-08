import React, { useState } from "react";
import { X } from "lucide-react";
import Button from "../../Utils/Button";

const AddProject = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    difficulty: "Easy",
    status: "In Progress",
    technologies: [],
    date: "",
  });

  const [technologyInput, setTechnologyInput] = useState("");

  // Handle normal inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add technology
  const handleAddTechnology = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const technology = technologyInput.trim();

      if (!technology) return;

      if (!formData.technologies.includes(technology)) {
        setFormData((prev) => ({
          ...prev,
          technologies: [...prev.technologies, technology],
        }));
      }

      setTechnologyInput("");
    }
  };

  // Remove technology
  const removeTechnology = (technologyToRemove) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter(
        (technology) => technology !== technologyToRemove,
      ),
    }));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onAdd(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      {/* Modal */}
      <div className="w-full max-w-[520px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-[16px] font-semibold text-gray-900">
              Add Machine Coding Project
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Log a new coding challenge or component specification
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={17} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {/* Project Name */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">
              Project Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter project name"
              required
              className="
                h-10 w-full rounded-lg
                border border-gray-200
                bg-white px-3
                text-sm text-gray-800
                outline-none
                placeholder:text-gray-400
                transition
                focus:border-blue-400
                focus:ring-2
                focus:ring-blue-100
              "
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">
              Short Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a short description"
              required
              rows={3}
              className="
                w-full resize-none rounded-lg
                border border-gray-200
                bg-white px-3 py-2
                text-sm text-gray-800
                outline-none
                placeholder:text-gray-400
                transition
                focus:border-blue-400
                focus:ring-2
                focus:ring-blue-100
              "
            />
          </div>

          {/* Difficulty + Status */}
          <div className="grid grid-cols-2 gap-3">
            {/* Difficulty */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                Difficulty
              </label>

              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="
                  h-10 w-full rounded-lg
                  border border-gray-200
                  bg-white px-3
                  text-sm text-gray-700
                  outline-none
                  transition
                  focus:border-blue-400
                  focus:ring-2
                  focus:ring-blue-100
                "
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="
                  h-10 w-full rounded-lg
                  border border-gray-200
                  bg-white px-3
                  text-sm text-gray-700
                  outline-none
                  transition
                  focus:border-blue-400
                  focus:ring-2
                  focus:ring-blue-100
                "
              >
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="
                h-10 w-full rounded-lg
                border border-gray-200
                bg-white px-3
                text-sm text-gray-700
                outline-none
                transition
                focus:border-blue-400
                focus:ring-2
                focus:ring-blue-100
              "
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">
              Technologies
            </label>

            <div
              className="
                        min-h-10 w-full rounded-lg
                        border border-gray-200
                        bg-white px-2 py-1.5
                        flex flex-wrap items-center gap-1.5
                        focus-within:border-blue-400
                        focus-within:ring-2
                        focus-within:ring-blue-100
    "
            >
              {/* Technology Tags */}
              {formData.technologies.map((technology) => (
                <span
                  key={technology}
                  className="
          inline-flex items-center gap-1
          rounded-md
          bg-blue-50
          px-2 py-1
          text-[11px]
          font-medium
          text-blue-600
        "
                >
                  {technology}

                  <button
                    type="button"
                    onClick={() => removeTechnology(technology)}
                    className="text-blue-400 hover:text-blue-700"
                  >
                    ×
                  </button>
                </span>
              ))}

              {/* Input */}
              <input
                type="text"
                value={technologyInput}
                onChange={(e) => setTechnologyInput(e.target.value)}
                onKeyDown={handleAddTechnology}
                placeholder={
                  formData.technologies.length === 0
                    ? "Type technology and press Enter"
                    : "Add technology..."
                }
                className="
        min-w-[120px]
        flex-1
        border-none
        bg-transparent
        px-1
        py-1
        text-sm
        text-gray-800
        outline-none
        placeholder:text-gray-400
      "
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="
                rounded-lg
                border border-gray-200
                px-4 py-2
                text-xs font-medium
                text-gray-600
                transition
                hover:bg-gray-50
              "
            >
              Cancel
            </button>

            <Button type="submit">Add Project</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
