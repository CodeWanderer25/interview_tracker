import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import Button from "../../Utils/Button";
import AddQuestion from "../../services/AddQuestion";

const Question = () => {
    const [questions, setQuestions] = useState(() => {
        const savedQuestion = JSON.parse(localStorage.getItem("questions")) || null
        
        if (savedQuestion) {
            return savedQuestion
        }
        []
  });

    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        localStorage.setItem("questions" , JSON.stringify(questions))
    },[questions])

  return (
    <div className="bg-[#f5f7ff] px-6 py-5 w-full min-h-screen">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-semibold text-gray-900">
          Question Tracker
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Manage your DSA, Git and technical interview preparation.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-3">
        <div className="flex items-center gap-10">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search questions..."
              className="w-[90%] h-10 border border-gray-200 rounded-lg pl-9 pr-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <select className="h-10 border border-gray-200 rounded-lg px-7 text-md text-gray-600 bg-white">
            <option>All Categories</option>
            <option>DSA</option>
            <option>Git</option>
            <option>Technical</option>
          </select>

          <select className="h-10 border border-gray-200 rounded-lg px-7 text-md text-gray-600 bg-white">
            <option>All Status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <select className="h-10 border border-gray-200 rounded-lg px-7 text-md text-gray-600 bg-white">
            <option>All Difficulties</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          {/* IMPORTANT */}
          <Button onClick={() => setOpen(true)}>Add Question</Button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-5 bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500">
                QUESTION
              </th>

              <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500">
                CATEGORY
              </th>

              <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500">
                DIFFICULTY
              </th>

              <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500">
                STATUS
              </th>

              <th className="text-center px-4 py-3 text-[11px] font-semibold text-gray-500">
                ACTION
              </th>
            </tr>
          </thead>

          <tbody>
            {questions.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border-2 border-gray-300 cursor-pointer" />

                    <span className="text-sm text-gray-800">
                      {item.question}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-600 text-sm">
                    {item.category}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <span className="text-sm">{item.difficulty}</span>
                </td>

                <td className="px-4 py-4">
                  <span className="text-sm">{item.status}</span>
                </td>

                <td className="px-4 py-4 text-center">
                  <button className="text-gray-500 hover:text-gray-800 cursor-pointer">
                    ⋮
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD QUESTION MODAL */}
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
