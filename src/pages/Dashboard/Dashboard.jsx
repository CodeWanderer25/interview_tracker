import DashboardCard from "./DashboardCard";

const Dashboard = () => {
  return (
    <div>
      <div className="bg-[#f5f7ff] px-6 py-5 w-full min-h-screen">
        <div className="mb-5">
          <h1 className="text-2xl font-semibold text-gray-900">
            Interview Preparation
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Track your interview preparation and stay consistent.
          </p>
        </div>

        <DashboardCard />
      </div>
    </div>
  );
};

export default Dashboard;
