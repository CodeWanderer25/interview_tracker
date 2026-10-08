import React, { useEffect, useState } from "react";
import {
  MoreVertical,
  FolderKanban,
  CheckCircle2,
  Clock3,
  CircleCheck,
} from "lucide-react";
import Button from "../../Utils/Button";
import AddProject from "./AddProject";
import useActionMenu from "../../hooks/useActionMenu";
import { useProjects } from "../../context/ProjectContext";

const MachineCoding = () => {
  const [open, setOpen] = useState(false);
  const { openMenu, toggleMenu, closeMenu } = useActionMenu();

  const { projectData, setProjectData } = useProjects();

  // Add project
  const handleAddProject = (formData) => {
    setProjectData((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...formData,
      },
    ]);

    setOpen(false);
  };

  // Statistics
  const totalProjects = projectData.length;

  const completedProjects = projectData.filter(
    (project) => project.status === "Completed",
  ).length;

  const inProgressProjects = projectData.filter(
    (project) => project.status === "In Progress",
  ).length;

  const completionPercentage = totalProjects
    ? Math.round((completedProjects / totalProjects) * 100)
    : 0;

  const handleStatusChange = (id, status) => {
    setProjectData((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, status } : project,
      ),
    );

    closeMenu();
  };

  const handleDelete = (id) => {
    setProjectData((prev) => prev.filter((project) => project.id !== id));

    closeMenu();
  };

  const handleEdit = (project) => {
    console.log("Edit project:", project);
    closeMenu();
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] p-6">
      {/* ================= HEADER ================= */}
      <div className="mb-7 flex items-center justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-[11px] font-medium text-gray-400">
            <span>Practice Tracker</span>
            <span>/</span>
            <span>Machine Coding</span>
          </div>

          <h1 className="text-[22px] font-semibold tracking-tight text-gray-900">
            Machine Coding
          </h1>

          <p className="mt-1 text-[13px] text-gray-500">
            Track your hands-on implementation practice.
          </p>
        </div>

        <Button onClick={() => setOpen(true)} className="shadow-sm">
          + Add Project
        </Button>
      </div>

      {/* ================= STATS ================= */}
      <div className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {/* Total */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-gray-400">
                Total Projects
              </p>

              <p className="mt-1 text-[25px] font-semibold text-gray-900">
                {totalProjects}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
              <FolderKanban size={17} className="text-blue-500" />
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-gray-400">Completed</p>

              <p className="mt-1 text-[25px] font-semibold text-emerald-600">
                {completedProjects}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
              <CheckCircle2 size={17} className="text-emerald-500" />
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-gray-400">
                In Progress
              </p>

              <p className="mt-1 text-[25px] font-semibold text-blue-600">
                {inProgressProjects}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
              <Clock3 size={17} className="text-blue-500" />
            </div>
          </div>
        </div>

        {/* Completion */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-gray-400">
                Completion
              </p>

              <p className="mt-1 text-[25px] font-semibold text-violet-600">
                {completionPercentage}%
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50">
              <CircleCheck size={17} className="text-violet-500" />
            </div>
          </div>

          {/* Progress */}
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-violet-500 transition-all duration-300"
              style={{
                width: `${completionPercentage}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* ================= SECTION HEADER ================= */}
      {projectData.length > 0 && (
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-[15px] font-semibold text-gray-900">
              Your Projects
            </h2>

            <p className="mt-0.5 text-[11px] text-gray-400">
              {totalProjects} {totalProjects === 1 ? "project" : "projects"}{" "}
              added
            </p>
          </div>
        </div>
      )}

      {/* ================= PROJECTS ================= */}
      {projectData.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
            <FolderKanban size={20} className="text-blue-500" />
          </div>

          <h2 className="mt-4 text-sm font-semibold text-gray-900">
            No projects yet
          </h2>

          <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-gray-400">
            Start tracking your machine coding practice by adding your first
            project.
          </p>

          <Button className="mt-4" onClick={() => setOpen(true)}>
            + Add Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projectData.map((project) => (
            <div
              key={project.id}
              className="
    group
    relative
    rounded-xl
    border border-gray-200
    bg-white
    p-4
    shadow-[0_1px_3px_rgba(0,0,0,0.03)]
    transition
    duration-200
    hover:-translate-y-[1px]
    hover:border-gray-300
    hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]
  "
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  {/* Increased from 14px → 16px */}
                  <h3 className="truncate text-[16px] font-semibold text-gray-900">
                    {project.name}
                  </h3>

                  {/* Increased from 10px → 11px */}
                  <p className="mt-1 text-[11px] text-gray-400">
                    Created{" "}
                    {project.date
                      ? new Date(project.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      : "Today"}
                  </p>
                </div>

                <button
                  onClick={() => toggleMenu(project.id)}
                  type="button"
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
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
              </div>

              {/* Badges */}
              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`
                    rounded-md
                    px-2
                    py-1
                    text-[11px]
                    font-medium
                    ${
                      project.difficulty === "Easy"
                        ? "bg-emerald-50 text-emerald-600"
                        : project.difficulty === "Medium"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-red-50 text-red-600"
                    }
                  `}
                >
                  {project.difficulty}
                </span>

                <span
                  className={`
                    rounded-md
                    px-2
                    py-1
                    text-[11px]
                    font-medium
                    ${
                      project.status === "Completed"
                        ? "bg-emerald-50 text-emerald-600"
                        : project.status === "In Progress"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-gray-100 text-gray-500"
                    }
                  `}
                >
                  {project.status}
                </span>
              </div>

              {/* Description */}
              <p className="mt-3 min-h-[44px] line-clamp-2 text-[15px] leading-[19px] text-gray-500">
                {project.description}
              </p>

              {/* Technologies */}
              {project.technologies?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="
                        rounded-md
                        border border-gray-100
                        bg-gray-50
                        px-2
                        py-1
                        text-[10px]
                        font-medium
                        text-gray-500
                      "
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              )}

              {/* View Details */}
              <button
                type="button"
                className="
                  mt-4
                  flex
                  h-9
                  w-full
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#f0f4ff]
                  text-[11px]
                  font-medium
                  text-blue-600
                  transition
                  hover:bg-[#e6edff]
                "
              >
                View Details
              </button>

              {openMenu === project.id && (
                <div className="absolute right-0 top-8 z-50 w-44 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
                  <button
                    onClick={() => {
                      handleStatusChange(project.id, "Completed");
                      closeMenu();
                    }}
                    className="w-full rounded-md px-3 py-2 text-left text-xs text-gray-600 hover:bg-gray-50"
                  >
                    Mark as Completed
                  </button>

                  <button
                    onClick={() => {
                      handleStatusChange(project.id, "In Progress");
                      closeMenu();
                    }}
                    className="w-full rounded-md px-3 py-2 text-left text-xs text-gray-600 hover:bg-gray-50"
                  >
                    Set In Progress
                  </button>

                  <button
                    onClick={() => {
                      handleEdit(project);
                      closeMenu();
                    }}
                    className="w-full rounded-md px-3 py-2 text-left text-xs text-gray-600 hover:bg-gray-50"
                  >
                    Edit Project
                  </button>

                  <button
                    onClick={() => {
                      handleDelete(project.id);
                      closeMenu();
                    }}
                    className="w-full rounded-md px-3 py-2 text-left text-xs text-red-500 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ================= ADD PROJECT ================= */}
      {open && (
        <AddProject onClose={() => setOpen(false)} onAdd={handleAddProject} />
      )}
    </div>
  );
};

export default MachineCoding;
