import { Link } from "react-router-dom";

const NavItem = ({
  iconUrl,
  path,
  title,
}: {
  iconUrl: string;
  path: string;
  title: string;
}) => {
  return (
    <Link to={`/${path}`}>
      <div className="flex h-12 items-center gap-2 p-2 text-xl hover:rounded-md hover:bg-[#c5b4fb4c]">
        <img src={iconUrl} className="h-6" />
        <div>{title}</div>
      </div>
    </Link>
  );
};

export default NavItem;
