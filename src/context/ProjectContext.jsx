import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {

  const [projectData, setProjectData] = useState(() => {
    const savedProjects = localStorage.getItem("projectData");

    if (!savedProjects) {
      return [];
    }

    try {
      const parsedProjects = JSON.parse(savedProjects);

      return Array.isArray(parsedProjects)
        ? parsedProjects
        : [];
    } catch (error) {
      localStorage.removeItem("projectData");
      return [];
    }
  });


  useEffect(() => {
    localStorage.setItem(
      "projectData",
      JSON.stringify(projectData)
    );
  }, [projectData]);


  return (
    <ProjectContext.Provider
      value={{
        projectData,
        setProjectData,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};


export const useProjects = () => {
  return useContext(ProjectContext);
};