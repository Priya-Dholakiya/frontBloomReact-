import ClassComp from "./Components/ClassComp";
import FunctionComp from "./Components/FunctionComp";

const page = {
  minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg,#667eea,#764ba2)", fontFamily: "Arial"
};

const card = {
  background: "#fff", padding: 25, width: 420, borderRadius: 12, boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
};

function App() {
  return (
    <div style={page}>
      <div style={card}>
        <h2 style={{ textAlign: "center" }}>React UI Demo</h2>

        <ClassComp id="101" name="Rohit Sharma" gender="Male" />

        <hr />

        <FunctionComp />
      </div>
    </div>
  );
}

export default App;
