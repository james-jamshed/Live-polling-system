import { useState } from "react";
import HomePage from "./components/HomePage";
import StudentPage from "./components/StudentPage";


const App = () => {
  const [role, setRole] = useState(null);
  const [studentName, setStudentName] = useState(null);

  if (!role) return <HomePage onContinue={setRole} />;
   if (role === "student" && !studentName) return <StudentPage onSubmit={setStudentName} />;


  return (
    <div>
      {role === "student" ? <StudentUI /> : <TeacherUI />}
    </div>
  );
};

export default App;
