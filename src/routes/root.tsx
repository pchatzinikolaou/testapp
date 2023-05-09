import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <nav>
          <ul>
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`/company`}>Company</Link>
            </li>
            <li>
              <Link to={`/employee`}>Employee</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
