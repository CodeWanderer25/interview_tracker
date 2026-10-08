import { MoreVertical, Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import Button from "../../Utils/Button";
import AddQuestion from "../../services/AddQuestion";
import useActionMenu from "../../hooks/useActionMenu";

const Question = () => {
  const [questions, setQuestions] = useState(() => {
    const savedQuestion = localStorage.getItem("questions");

    if (savedQuestion) {
      return JSON.parse(savedQuestion);
    }

    return [];
  });

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [difficulty, setDifficulty] = useState("All Difficulties");

  const { openMenu, toggleMenu, closeMenu } = useActionMenu();

  // Save questions
  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  // Change status
  const handleStatusChange = (id, status) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === id
          ? {
              ...question,
              status,
            }
          : question,
      ),
    );

    closeMenu();
  };

  // Delete question
  const handleDelete = (id) => {
    setQuestions((prev) => prev.filter((question) => question.id !== id));

    closeMenu();
  };

  // Edit question
  const handleEdit = (question) => {
    console.log("Edit question:", question);

    closeMenu();
  };

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      // Search
      const matchesSearch = question.question
        ?.toLowerCase()
        .includes(search.toLowerCase());

      // Category
      const matchesCategory =
        category === "All Categories" || question.category === category;

      // Status
      const matchesStatus =
        status === "All Status" || question.status === status;

      // Difficulty
      const matchesDifficulty =
        difficulty === "All Difficulties" || question.difficulty === difficulty;

      return (
        matchesSearch && matchesCategory && matchesStatus && matchesDifficulty
      );
    });
  }, [questions, search, category, status, difficulty]);

  return (
    <div className="min-h-screen w-full bg-[#f5f7ff] px-6 py-5">
      {/* ================= HEADER ================= */}
      <div className="mb-5">
        <h1 className="text-2xl font-semibold text-gray-900">
          Question Tracker
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your DSA, Git and technical interview preparation.
        </p>
      </div>

      {/* ================= SEARCH + FILTER ================= */}
      <div className="rounded-xl border border-gray-200 bg-white p-3">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="
    h-10
    w-full
    rounded-lg
    border
    border-gray-200
    pl-9
    pr-3
    text-sm
    outline-none
    focus:border-blue-500
    focus:ring-1
    focus:ring-blue-100
  "
            />
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="
    h-10
    rounded-lg
    border
    border-gray-200
    bg-white
    px-4
    text-sm
    text-gray-600
    outline-none
    focus:border-blue-500
  "
          >
            <option value="All Categories">All Categories</option>
            <option value="DSA">DSA</option>
            <option value="Git">Git</option>
            <option value="Technical">Technical</option>
            <option value="Machine Coding">Machine Coding</option>
            <option value="Interview QA">Interview QA</option>
          </select>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
    h-10
    rounded-lg
    border
    border-gray-200
    bg-white
    px-4
    text-sm
    text-gray-600
    outline-none
    focus:border-blue-500
  "
          >
            <option value="All Status">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Difficulty */}
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="
    h-10
    rounded-lg
    border
    border-gray-200
    bg-white
    px-4
    text-sm
    text-gray-600
    outline-none
    focus:border-blue-500
  "
          >
            <option value="All Difficulties">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setCategory("All Categories");
              setStatus("All Status");
              setDifficulty("All Difficulties");
            }}
            className="text-xs font-medium text-blue-600 hover:underline"
          >
            Clear Filters
          </button>

          {/* Add Question */}
          <Button onClick={() => setOpen(true)}>Add Question</Button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="mt-5 overflow-visible rounded-xl border border-gray-200 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-500">
                QUESTION
              </th>

              <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-500">
                CATEGORY
              </th>

              <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-500">
                DIFFICULTY
              </th>

              <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-500">
                STATUS
              </th>

              <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-500">
                ACTION
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredQuestions.map((item) => (
              <tr
                key={item.id}
                className="
                  border-b
                  border-gray-100
                  last:border-0
                  hover:bg-gray-50
                "
              >
                {/* Question */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 cursor-pointer rounded-full border-2 border-gray-300" />

                    <span className="text-sm text-gray-800">
                      {item.question}
                    </span>
                  </div>
                </td>

                {/* Category */}
                <td className="px-4 py-4">
                  <span className="rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-600">
                    {item.category}
                  </span>
                </td>

                {/* Difficulty */}
                <td className="px-4 py-4">
                  <span className="text-sm text-gray-700">
                    {item.difficulty}
                  </span>
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <span
                    className={`
                      rounded-md
                      px-2
                      py-1
                      text-xs
                      font-medium
                      ${
                        item.status === "Completed"
                          ? "bg-emerald-50 text-emerald-600"
                          : item.status === "In Progress"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Action */}
                <td className="px-4 py-4">
                  <div className="relative flex justify-start">
                    {/* Three dots */}
                    <button
                      onClick={() => toggleMenu(item.id)}
                      type="button"
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-md
                        text-gray-400
                        transition
                        hover:bg-gray-100
                        hover:text-gray-700
                      "
                    >
                      <MoreVertical size={15} />
                    </button>

                    {/* Dropdown */}
                    {openMenu === item.id && (
                      <div
                        className="
                          absolute
                          right-0
                          top-8
                          z-50
                          w-44
                          rounded-lg
                          border
                          border-gray-200
                          bg-white
                          p-1
                          shadow-lg
                        "
                      >
                        {/* Completed */}
                        <button
                          onClick={() =>
                            handleStatusChange(item.id, "Completed")
                          }
                          className="
                            w-full
                            rounded-md
                            px-3
                            py-2
                            text-left
                            text-xs
                            text-gray-600
                            hover:bg-gray-50
                          "
                        >
                          Mark as Completed
                        </button>

                        {/* In Progress */}
                        <button
                          onClick={() =>
                            handleStatusChange(item.id, "In Progress")
                          }
                          className="
                            w-full
                            rounded-md
                            px-3
                            py-2
                            text-left
                            text-xs
                            text-gray-600
                            hover:bg-gray-50
                          "
                        >
                          Set In Progress
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => handleEdit(item)}
                          className="
                            w-full
                            rounded-md
                            px-3
                            py-2
                            text-left
                            text-xs
                            text-gray-600
                            hover:bg-gray-50
                          "
                        >
                          Edit Question
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="
                            w-full
                            rounded-md
                            px-3
                            py-2
                            text-left
                            text-xs
                            text-red-500
                            hover:bg-red-50
                          "
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= ADD QUESTION MODAL ================= */}
      {open && (
        <AddQuestion
          onClose={() => setOpen(false)}
          onAdd={(newQuestion) => {
            setQuestions((prev) => [
              ...prev,
              {
                id: Date.now(),
                ...newQuestion,
              },
            ]);

            setOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Question;
