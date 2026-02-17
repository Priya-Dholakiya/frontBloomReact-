import { Card, Button } from "react-bootstrap";

function EmployeeCard({ emp, onDelete, onEdit }) {
  return (
    <Card className="emp-card">
      <Card.Img
        variant="top"
        src={emp.image || "https://via.placeholder.com/300x200"}
      />
      <Card.Body>
        <Card.Title>{emp.name}</Card.Title>
        <Card.Text>{emp.department}</Card.Text>
        <Card.Text>{emp.experience}</Card.Text>
        <Card.Text>₹ {emp.salary}</Card.Text>

        <div className="btn-group-custom">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => onEdit(emp)}
          >
            Edit
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onDelete(emp.id)}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default EmployeeCard;
