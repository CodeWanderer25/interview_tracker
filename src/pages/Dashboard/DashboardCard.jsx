
import RecentActivity from "./RecentActivity";
import { useProjects } from "../../context/ProjectContext";

const DashboardCard = () => {
  const { projectData } = useProjects();
  
  const questions =
    JSON.parse(localStorage.getItem("questions")) || [];
  

  const totalQuestions = questions.length;

  const dsaQuestions = questions.filter(
    (item) => item.category === "DSA"
  );

  const dsaCompleted = dsaQuestions.filter(
    (item) => item.status === "Completed"
  ).length;


  const interviewQuestions = questions.filter(
    (item) => item.category === "Technical"
  );

  const interviewCompleted = interviewQuestions.filter(
    (item) => item.status === "Completed"
  ).length;



  const machineCodingCompleted = projectData.filter(
    (item) => item.status === "Completed"
  ).length;


  const stats = [
    {
      title: "TOTAL QUESTIONS",
      value: totalQuestions,
      
    },
    {
      title: "DSA COMPLETED",
      completed: dsaCompleted,
      total: dsaQuestions.length,
    },
    {
      title: "INTERVIEW QA",
      completed: interviewCompleted,
      total: interviewQuestions.length,
    },
    {
      title: "MACHINE CODING",
      completed: machineCodingCompleted,
      total: projectData.length,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((item) => {
        const progress =
          item.total > 0
            ? (item.completed / item.total) * 100
            : 0;

        return (
          <div
            key={item.title}
            className="bg-white border border-gray-200 rounded-xl p-5"
          >
            {/* Title */}
            <p className="text-xs font-semibold text-gray-500">
              {item.title}
            </p>

            {/* Total Questions */}
            {item.value !== undefined && (
              <>
                <h2 className="text-3xl font-semibold text-gray-900 mt-3">
                  {item.value}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {item.subtitle}
                </p>
              </>
            )}

            {/* Completed Stats */}
            {item.completed !== undefined && (
              <>
                <div className="flex items-end gap-1 mt-3">
                  <h2 className="text-3xl font-semibold text-gray-900">
                    {item.completed}
                  </h2>

                  <span className="text-sm text-gray-400 mb-1">
                    / {item.total}
                  </span>
                </div>

                {/* Progress */}
                <div className="w-full h-2 bg-gray-100 rounded-full mt-4 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  {Math.round(progress)}% completed
                </p>
              </>
            )}
          </div>
        );
      })}

    
      </div>
        <RecentActivity questions={questions}/>
    </>
  );
};

export default DashboardCard;
