import React, { useMemo, useState } from "react";
import {
  CheckCircle2,
  Circle,
  Clock3,
  ArrowRight,
  Filter,
  FileQuestion,
} from "lucide-react";

const RecentActivity = ({ questions = [] }) => {
    console.log(questions)
  const [filter, setFilter] = useState("All");

  // Get latest 5 activities

  const recentQuestions = useMemo(() => {
    return [...questions]
      .sort(
        (a, b) =>
          new Date(b.updatedAt || b.createdAt) -
          new Date(a.updatedAt || a.createdAt)
      )
      .slice(0, 5);
  }, [questions]);

  // Filter activities

  const filteredQuestions = useMemo(() => {
    if (filter === "Solved") {
      return recentQuestions.filter(
        (question) => question.status === "Completed"
      );
    }

    if (filter === "Pending") {
      return recentQuestions.filter(
        (question) =>
          question.status === "Pending" ||
          question.status === "In Progress"
      );
    }

    return recentQuestions;
  }, [recentQuestions, filter]);

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/*  HEADER  */}
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <Clock3 size={17} className="text-blue-600" />
            </div>

            <h2 className="text-base font-semibold text-slate-800">
              Recent Activity
            </h2>

          </div>

          <p className="mt-1 ml-10 text-xs text-slate-400">
            Your latest interview preparation activity
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">

          <Filter size={13} className="ml-2 mr-1 text-slate-400" />

          {["All", "Solved", "Pending"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-md px-3 py-1.5 text-[11px] font-medium transition-all ${
                filter === item
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:bg-white hover:text-slate-700"
              }`}
            >
              {item}
            </button>
          ))}

        </div>
      </div>


      {/*  ACTIVITY LIST  */}
      <div className="p-5">

        {filteredQuestions.length > 0 ? (
          <div className="space-y-1">

            {filteredQuestions.map((question) => (
              <ActivityItem
                key={question.id}
                question={question}
              />
            ))}

          </div>
        ) : (
          <EmptyState filter={filter} />
        )}

      </div>


      {/*  FOOTER  */}
      {questions.length > 0 && (
        <div className="border-t border-slate-100 px-5 py-3">

          <button
            className="
              group
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              py-2
              text-xs
              font-semibold
              text-blue-600
              transition
              hover:bg-blue-50
            "
          >
            View all {questions.length} activity logs

            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

        </div>
      )}

    </div>
  );
};


// ACTIVITY ITEM


const ActivityItem = ({ question }) => {

  const getStatusConfig = () => {

    switch (question.status) {

      case "Completed":
        return {
          icon: CheckCircle2,
          iconColor: "text-emerald-500",
          iconBg: "bg-emerald-50",
          badge: "bg-emerald-50 text-emerald-600",
        };

      case "In Progress":
        return {
          icon: Circle,
          iconColor: "text-blue-500",
          iconBg: "bg-blue-50",
          badge: "bg-blue-50 text-blue-600",
        };

      case "Pending":
      default:
        return {
          icon: Circle,
          iconColor: "text-slate-400",
          iconBg: "bg-slate-100",
          badge: "bg-slate-100 text-slate-600",
        };
    }
  };


  const getCategoryStyle = () => {

    switch (question.category) {

      case "DSA":
        return "bg-emerald-50 text-emerald-600";

      case "Machine Coding":
        return "bg-orange-50 text-orange-600";

      case "Git":
        return "bg-blue-50 text-blue-600";

      case "Technical":
        return "bg-purple-50 text-purple-600";

      case "React":
        return "bg-cyan-50 text-cyan-600";

      case "JavaScript":
        return "bg-yellow-50 text-yellow-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };


  const getTimeAgo = (date) => {

    if (!date) return "";

    const now = new Date();
    const activityDate = new Date(date);

    const difference = Math.floor(
      (now - activityDate) / (1000 * 60)
    );

    if (difference < 1) {
      return "Just now";
    }

    if (difference < 60) {
      return `${difference}m ago`;
    }

    const hours = Math.floor(difference / 60);

    if (hours < 24) {
      return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);

    if (days === 1) {
      return "Yesterday";
    }

    if (days < 7) {
      return `${days}d ago`;
    }

    return activityDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  };


  const status = getStatusConfig();

  const StatusIcon = status.icon;


  return (
    <button
      className="
        group
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        p-3
        text-left
        transition-all
        hover:bg-slate-50
      "
    >

      {/*  ICON  */}
      <div
        className={`
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-full
          ${status.iconBg}
        `}
      >
        <StatusIcon
          size={17}
          className={status.iconColor}
        />
      </div>


      {/*  CONTENT  */}
      <div className="min-w-0 flex-1">

        {/* Title + Category */}
        <div className="flex min-w-0 items-center gap-2">

          <h3
            className="
              truncate
              text-sm
              font-medium
              text-slate-800
              group-hover:text-blue-600
            "
          >
            {question.title}
          </h3>

          {question.category && (
            <span
              className={`
                hidden
                shrink-0
                rounded-md
                px-2
                py-1
                text-[9px]
                font-semibold
                sm:inline-flex
                ${getCategoryStyle()}
              `}
            >
              {question.category}
            </span>
          )}

        </div>


        {/* Description */}
        <p className="mt-1 truncate text-[11px] text-slate-400">
          {question.question }
        </p>


        {/* Mobile metadata */}
        <div className="mt-2 flex items-center gap-2 sm:hidden">

          {question.category && (
            <span
              className={`
                rounded-md
                px-2
                py-0.5
                text-[9px]
                font-medium
                ${getCategoryStyle()}
              `}
            >
              {question.category}
            </span>
          )}

          {question.difficulty && (
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[9px] text-slate-500">
              {question.difficulty}
            </span>
          )}

        </div>

      </div>


      {/*  DESKTOP METADATA  */}
      <div className="hidden items-center gap-3 sm:flex">

        {question.difficulty && (
          <span className="rounded-md bg-slate-100 px-2 py-1 text-[9px] font-medium text-slate-500">
            {question.difficulty}
          </span>
        )}

        <span className="w-16 text-right text-[10px] text-slate-400">
          {getTimeAgo(question.updatedAt || question.createdAt)}
        </span>

        <span
          className={`
            rounded-md
            px-2.5
            py-1
            text-[10px]
            font-semibold
            ${status.badge}
          `}
        >
          {question.status}
        </span>

        <ArrowRight
          size={14}
          className="
            text-slate-300
            transition-all
            group-hover:translate-x-1
            group-hover:text-blue-500
          "
        />

      </div>

    </button>
  );
};



const EmptyState = ({ filter }) => {

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">

      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
        <FileQuestion size={20} className="text-slate-400" />
      </div>

      <h3 className="text-sm font-semibold text-slate-700">
        No {filter !== "All" ? filter.toLowerCase() : ""} activity
      </h3>

      <p className="mt-1 max-w-xs text-xs text-slate-400">
        Your recent interview preparation activity will appear here.
      </p>

    </div>
  );
};


export default RecentActivity;