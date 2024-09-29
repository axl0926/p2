import github from "@assets/github_mark.svg";
import mail from "@assets/mail.svg";
const NavFooter = () => {
    return (
        <footer className="flex py-4 h-[15%] items-center justify-between flex-col border-t-2 border-t-[#8f7ad6ac]">
            <div className="flex items-center justify-center gap-4">
                <div>
                    <img src={github} alt="github" />
                </div>
                <div>
                    <img src={mail} alt="mail" />
                </div>
            </div>
            <p className="text-[#2C2A4A] text-xs">copyrightⓒ 2024 All rights reserved</p>
        </footer>
    );
};

export default NavFooter;
