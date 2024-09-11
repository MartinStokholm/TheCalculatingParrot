import { Link, useLocation } from "react-router-dom";

export function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <div className="text-sm breadcrumbs text-white text-start overflow:hidden w-full bg-slate-700">
      <ul>
        {pathnames.map((path, index) => {
          const isLast = index === pathnames.length - 1;

          return (
            <li key={index} className="pl-4">
              {isLast ? (
                <>
                  <p className="font-bold">
                    {path.charAt(0).toUpperCase() + path.slice(1)}
                  </p>
                </>
              ) : (
                <Link to={`/${pathnames.slice(0, index + 1).join("/")}`}>
                  <p className="">
                    {path.charAt(0).toUpperCase() + path.slice(1)}
                  </p>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
