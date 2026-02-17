import { useEffect, useState } from "react";
import "./App.css";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeCard from "./components/EmployeeCard";
import generateUniqueId from "generate-unique-id";

const getSessionData = () => {
  return JSON.parse(sessionStorage.getItem("employees")) || [];
};

function App() {
  const [employees, setEmployees] = useState(getSessionData());
  const [editData, setEditData] = useState(null);

  const saveEmployee = (data) => {
    if (editData) {
      const updated = employees.map((emp) => (emp.id === data.id ? data : emp));
      setEmployees(updated);
      setEditData(null);
    } else {
      const newEmployee = {
        ...data,
        id: generateUniqueId({ length: 6, useLetters: false }),
      };
      setEmployees([...employees, newEmployee]);
    }
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const editEmployee = (emp) => {
    setEditData(emp);
  };

  useEffect(() => {
    sessionStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  return (
    <div className="layout">
      <div className="left-panel">
        <EmployeeForm onSave={saveEmployee} editData={editData} />
      </div>

      <div className="right-panel">
        <h2>Our Team</h2>
        <div className="card-grid">
          {employees.map((emp) => (
            <EmployeeCard
              key={emp.id}
              emp={emp}
              onDelete={deleteEmployee}
              onEdit={editEmployee}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
