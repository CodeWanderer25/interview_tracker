
import { useProjects } from "../context/ProjectContext";

const useDashboardCard = () => {
    const { projectData } = useProjects();
  const questions = JSON.parse(localStorage.getItem("questions")) || [];

  const totalQuestions = questions.length;

  const dsaQuestions = questions.filter((item) => item.category === "DSA");

  const dsaCompleted = dsaQuestions.filter(
    (item) => item.status === "Completed",
  ).length;

  const interviewQuestions = questions.filter(
    (item) => item.category === "Technical",
  );

  const interviewCompleted = interviewQuestions.filter(
    (item) => item.status === "Completed",
  ).length;

  const machineCodingCompleted = projectData.filter(
    (item) => item.status === "Completed",
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

  return {};
};

export default useDashboardCard;
