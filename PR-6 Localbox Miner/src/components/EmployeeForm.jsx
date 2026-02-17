import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const initialState = {
  id: "",
  name: "",
  email: "",
  department: "",
  experience: "",
  salary: "",
  image: "",
};

function EmployeeForm({ onSave, editData }) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData(initialState);
  };

  return (
    <>
      <h2>{editData ? "Update" : "New"} Employee</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Control
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Form.Control
          name="email"
          type="email"
          placeholder="Work Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Form.Select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          <option value="Design">Design</option>
          <option value="Development">Development</option>
          <option value="Management">Management</option>
          <option value="HR">HR</option>
        </Form.Select>

        <Form.Select
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
        >
          <option value="">Experience Level</option>
          <option value="Fresher">Fresher</option>
          <option value="1-2 Years">1–2 Years</option>
          <option value="3-5 Years">3–5 Years</option>
          <option value="5+ Years">5+ Years</option>
        </Form.Select>

        <Form.Control
          name="salary"
          type="number"
          placeholder="Monthly Salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />

        <Form.Control
          name="image"
          placeholder="Profile Photo URL"
          value={formData.image}
          onChange={handleChange}
        />

        <Button type="submit" className="submit-btn">
          {editData ? "Update" : "Add"} Employee
        </Button>
      </Form>
    </>
  );
}

export default EmployeeForm;
