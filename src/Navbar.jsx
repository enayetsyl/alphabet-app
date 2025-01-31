import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div style={{
      height: "64px", 
      backgroundColor: "#1F2937", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between", 
      padding: "0 66px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link to="/">
          <span style={{
            backgroundColor: "#FB923C",
            borderRadius: "8px",
            color: "white",
            padding: "8px 12px",
            display: "inline-block",
            textDecoration: "none",
              fontWeight: "bold",
            fontSize: "18px"
          }}>
            Learn
          </span>
        </Link>
        <Link to="/test">
          <span style={{
            backgroundColor: "#FB923C",
            borderRadius: "8px",
            color: "white",
            padding: "8px 12px",
            display: "inline-block",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "18px"
          }}>
            Test
          </span>
        </Link>
        {/* <Link to="/test2">
          Test2
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar;
