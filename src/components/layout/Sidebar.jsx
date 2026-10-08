import {
  Code2,
  LayoutDashboard,
  CircleHelp,
  SquareTerminal,
} from "lucide-react";

import { NavLink } from "react-router";

const Sidebar = () => {
  return (
    <div className="w-[16%] min-h-screen bg-white border-r border-gray-200 flex flex-col px-3 py-4">


      <div className="flex items-center gap-2 px-1 mb-8">
        <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
          <Code2 size={15} className="text-white" />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[15px] font-bold text-gray-800">
            Interview Tracker
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="space-y-1">

   
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-2.5 py-2 rounded-md cursor-pointer ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <LayoutDashboard size={15} />

          <span className="text-[14px] font-medium">
            Dashboard
          </span>
        </NavLink>


        {/* Questions */}
        <NavLink
          to="/questions"
          className={({ isActive }) =>
            `flex items-center gap-3 px-2.5 py-2 rounded-md cursor-pointer ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <CircleHelp size={15} />

          <span className="text-[14px] font-medium">
            Questions
          </span>
        </NavLink>


        {/* Machine Coding */}
        <NavLink
          to="/machine-coding"
          className={({ isActive }) =>
            `flex items-center gap-3 px-2.5 py-2 rounded-md cursor-pointer ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <SquareTerminal size={15} />

          <span className="text-[14px] font-medium">
            Machine Coding
          </span>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;