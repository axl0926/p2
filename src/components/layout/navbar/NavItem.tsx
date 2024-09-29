import { Link } from "react-router-dom";

const NavItem = ({ iconUrl, path, title }: { iconUrl: string; path: string; title: string }) => {
    return (
        <Link to={`/${path}`}>
            <div className="flex p-2 text-xl gap-2 items-center hover:rounded-md hover:bg-[#c5b4fb4c] h-12">
                <img src={iconUrl} className=" h-6" />
                <div>{title}</div>
            </div>
        </Link>
    );
};

export default NavItem;
