import NavItem from "@components/layout/navbar/NavItem";
import schedule from "@assets/schedule.svg";
import news from "@assets/news.svg";
import task from "@assets/task.svg";
import NavFooter from "@components/layout/navbar/NavFooter";
import NavLogo from "@components/layout/navbar/NavLogo";

const Navbar = () => {
  return (
    <div className="flex h-screen w-[300px] flex-col bg-[#F9FBFC] p-5 text-[#202020]">
      <NavLogo />
      <nav className="h-[80%] py-4">
        <NavItem iconUrl={schedule} path="" title="일정 관리" />
        <NavItem iconUrl={task} path="task" title="할 일" />
        <NavItem iconUrl={news} path="news" title="새로운 뉴스" />
      </nav>
      <NavFooter />
    </div>
  );
};

export default Navbar;
