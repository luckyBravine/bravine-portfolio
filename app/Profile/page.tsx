import Link from "next/link";
import Image from "next/image";
import fig from "../../public/fig.jpeg";
import "./profile.css";
import { RiFileDownloadFill } from "react-icons/ri";
import { BsGithub } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
export default function Profile() {
  return (
    <div className="relative">
      <Link href="/" className="text-xl font-burtons absolute mt-6 ml-4">
        {" "}
        <BiArrowBack className="pr-2 text-white text-2xl" />
        Bravine.dev{" "}
      </Link>
      <div className="container">
        <article className="card">
          <div className="background">
            <Image src={fig} alt="profile" />
          </div>
          <div className="content">
            <span className="py-2 text-base font-semibold leading-8 text-gray-600 font-poppins dark:text-white">
              Profile
            </span>
            <h3 className="py-1 mb-1 text-3xl font-semibold font-poppins dark:text-gray-200">
              Bravine Mmbayia A
            </h3>
            <span className="py-1 text-lg font-semibold leading-8 text-gray-600 font-poppins dark:text-white">
              Volunteering at{" "}
              <a
                href="https://ke.linkedin.com/company/nyakwaroperetechlabs"
                title="techops"
                target="_blank"
                rel="noopener noreferrer"
              >
                TECHOPS Community
              </a>
            </span>
            <span className=" text-base font-medium leading-8 text-gray-600 font-poppins dark:text-white">
              Helping with:
            </span>
            <ul className="chips">
              <li className="chip font-poppins">React.Js</li>
              <li className="chip font-poppins">TypeScript</li>
              <li className="chip font-poppins">NextJs</li>
              <li className="chip font-poppins">TailwindCss</li>
            </ul>
            <div className="action-buttons font-poppins">
              <a
                href="/BravineMmbayiaresume.pdf"
                title="resume"
                className="flex items-center"
                target="_blank"
                rel="noopener noreferrer"
                download="BravineMmbayiaresume"
              >
                Download Resume <RiFileDownloadFill className="pl-2 text-2xl" />
              </a>
              <a
                href="https://github.com/luckyBravine"
                className="secondary flex items-center"
                title="my github"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <BsGithub className="pl-2 text-2xl" />
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
