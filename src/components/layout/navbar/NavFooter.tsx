import github from "@assets/github_mark.svg";
import mail from "@assets/mail.svg";
import { Link } from "react-router-dom";
import { useToast } from "@/utils/toastUtils";
const NavFooter = () => {
  const { showToast } = useToast();
  const copyToClipBoard = () => {
    navigator.clipboard.writeText("song22092000@gmail.com").then(
      () => {
        showToast("메일 주소가 복사되었습니다.", "checked");
      },
      () => {
        showToast("메일 주소 복사에 실패하였습니다.", "warning");
      },
    );
  };
  return (
    <footer className="flex h-[15%] flex-col items-center justify-between border-t-2 border-t-[#8f7ad6ac] py-4">
      <div className="flex items-center justify-center gap-4">
        <Link to={`https://github.com/axl0926/p2`} target="_blank">
          <img src={github} alt="github" />
        </Link>
        <div
          className="cursor-pointer"
          onClick={() => {
            copyToClipBoard();
          }}
        >
          <img src={mail} alt="mail" />
        </div>
      </div>
      <p className="text-xs text-[#2C2A4A]">
        copyrightⓒ 2024 All rights reserved
      </p>
    </footer>
  );
};

export default NavFooter;
