import { Link } from "react-router-dom";

type NavigationProps = {
  title: string;
  sideBareLinks: string[];
  children: React.ReactNode;
};

export default function Navigation({ ...props }: NavigationProps) {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Open drawer
        </label>
        {props.children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <a>{props.title}</a>
          </li>
          {props.sideBareLinks.map((link) => (
            <li>
              <Link to={link}> {link}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
