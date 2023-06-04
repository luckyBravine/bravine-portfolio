import { BsFillMoonStarsFill } from "react-icons/bs";
import {AiFillTwitterCircle, AiFillLinkedin} from 'react-icons/ai';
import {BsGithub, BsDatabaseCheck} from "react-icons/bs";
import {DiReact} from "react-icons/di";
import {FaPhp, FaNodeJs} from "react-icons/fa";
import {MdKeyboardDoubleArrowRight} from "react-icons/md"
import {SiTailwindcss} from "react-icons/si"
import Image from "next/image";
import Screenshot4 from "../public/Screenshot4.png";
import Screenshot8 from "../public/Screenshot8.png"
// import {Container, Heading, FormControl, Input, FormLabel} from "@chakra-ui/react";
// import { useState } from "react";

// const initValue = {
//   name: "",
//   email: "",
//   subject: "",
//   message: "",
// }

// const initState = {value: initValue}

export default function Home() {
  // const [state, setState] = useState(initState);

  // const {value} = state;

  // const handleChange = (event:any) => {
  //   const { target } = event; // Explicitly define the type of 'target' as HTMLInputElement or the appropriate type for your use case
  //   setState((prev) => ({
  //     ...prev,
  //     value: {
  //       ...prev.value,
  //       [target.name]: target.value,
  //     },
  //   }));
  // };
  return (
    <main className="px-10 bg-white">
      <section className="min-h-screen">
        <nav className="flex justify-between py-10 mb-12">
          <h1 className="text-xl font-burtons">Bravine.dev</h1>
          <ul className="flex items-center">
            <li>
              <BsFillMoonStarsFill className="text-2xl cursor-pointer" />
            </li>
            <li>
              <a
                href="#"
                className="px-4 py-2 ml-8 text-white rounded-md bg-gradient-to-r from-cyan-500 to-teal-500"
              >
                Profile
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-8 text-center">
          <h2 className="py-2 text-5xl font-medium text-teal-600">Bravine Alusiola</h2>
          <h3 className="py-2 text-2xl">Frontend Web designer</h3>
          <p className="py-5 leading-8 text-gray-800 text-md">
            Creating visually captivating and functionally seamless websites
            that leave a lasting impression.
          </p>
          
        </div>
        <div className="flex justify-center gap-12 py-3 text-5xl text-gray-600">
          <AiFillTwitterCircle/>
          <AiFillLinkedin/>
        </div>
        {/* <div className="relative mx-auto mt-20 overflow-hidden rounded-full bg-gradient-to-b from-teal-500 w-80 h-80">
          <Image alt="bravine" src={pic} fill className="object-cover"/>
        </div> */}
      </section>

      <section>
        <div>
          <span className="py-2 text-base font-semibold leading-8 text-gray-600 font-poppins">Services</span>
          <h3 className="py-1 text-3xl font-semibold font-poppins">Skill-Set</h3>
          <div></div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 font-poppins">
            <div className="p-2 rounded-lg shadow-xl">
              <div className="px-3 py-4">
                <BsGithub className="text-3xl text-gray-800"/>
              </div>
              <h4 className="px-3 py-1 font-semibold leading-8 text-gray-600 font-poppins">Git & GitHub Commands</h4>
              <p className="px-3 py-2 text-base font-normal leading-6 text-stone-600 font-poppins">
              I have utilized various Git and GitHub commands to manage version control, collaborate with team members, and contribute to open-source projects.
              </p>
            </div>
            <div className="p-2 rounded-lg shadow-xl">
              <div className="px-3 py-4">
                <BsDatabaseCheck className="text-3xl text-gray-800"/>
              </div>
              <h4 className="px-3 py-1 font-semibold leading-8 text-gray-600 font-poppins">Database Manipulation</h4>
              <p className="px-3 py-2 text-base font-normal leading-6 text-stone-600 font-poppins">
                In my years at Campus I interactected mostly with MySql and perfomed CRUD functionalities with it. But recently I have delved into MongoDB for a change.
              </p>
            </div>
          
            <div className="p-2 rounded-lg shadow-xl">
              <div className="px-3 py-4">
                <DiReact className="text-3xl text-gray-800"/>
              </div>
              <h4 className="px-3 py-1 font-semibold leading-8 text-gray-600 font-poppins">React</h4>
              <p className="px-3 py-2 text-base font-normal leading-6 text-stone-600 font-poppins">
              Building my final year project using ReactJs allowed me to create a dynamic and interactive showcase of my work, enhancing user experience and showcasing my skills effectively.
              </p>
            </div>
          
            <div className="p-2 rounded-lg shadow-xl">
              <div className="px-3 py-4">
                <FaPhp className="text-3xl text-gray-800"/>
              </div>
              <h4 className="px-3 py-1 font-semibold leading-8 text-gray-600 font-poppins">PHP Scripting</h4>
              <p className="px-3 py-2 text-base font-normal leading-6 text-stone-600 font-poppins">
              I have utilized PHP to create a dynamic and interactive website, allowing for seamless integration of database functionality and content management.
              </p>
            </div>
          
            <div className="p-2 rounded-lg shadow-xl">
              <div className="px-3 py-4">
                <FaNodeJs className="text-3xl text-gray-800"/>
              </div>
              <h4 className="px-3 py-1 font-semibold leading-8 text-gray-600 font-poppins">NodeJs</h4>
              <p className="px-3 py-2 text-base font-normal leading-6 text-stone-600 font-poppins">
              Using Node.js has allowed me to build dynamic and scalable websites with server-side rendering,
               API integrations, and a wide range of powerful libraries and frameworks.
              </p>
            </div>
          
            <div className="p-2 rounded-lg shadow-xl">
              <div className="px-3 py-4">
                <SiTailwindcss className="text-3xl text-gray-800"/>
              </div>
              <h4 className="px-3 py-1 font-semibold leading-8 text-gray-600 font-poppins">TailwindCSS Styling</h4>
              <p className="px-3 py-2 text-base font-normal leading-6 text-stone-600 font-poppins">
              Using Tailwind CSS for my projects allowed me to rapidly create a highly customizable and responsive design, resulting in a sleek and professional showcase of my work.
              </p>
            </div>
          
          </div>
        </div>
      </section>
      <section className="py-3 my-5">
        <span className="py-2 text-base font-semibold leading-8 text-gray-600 font-poppins">Projects</span>
        <h3 className="py-1 text-3xl font-semibold font-poppins">Portfolio</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col rounded-lg shadow-xl bg-slate-100 md:flex-row ">
              <div className="w-full md:w-[50%] h-[400px] rounded-t-lg lg:rounded-l-lg">
                <Image alt="portfolio1" src={Screenshot8} className="object-cover w-[100%] h-[100%] rounded-t-lg lg:rounded-l-lg"/>
              </div>
              <div className="md:w-[50%]">
                <h4 className="px-3 py-3 mb-1 text-lg font-semibold leading-4 text-gray-800 font-poppins">The Christian Union Web-App</h4>
                <p className="px-3 text-base leading-5 text-gray-600 font-poppins">
                This was my final year project which was based on improving components of the Murang'a University Christian Union website.

                </p>
                <div className="flex flex-col px-3 py-2">
                  <h5 className="text-base font-semibold leading-8 text-gray-700 font-poppins">Resources Used</h5>
                  <ul className="text-sm leading-6 text-gray-600 font-poppins">
                    <li>ReactJs</li>
                    <li>Tailwind Css</li>
                    <li>NodeJs</li>
                    <li>MongoDB</li>
                  </ul>
                </div>
                <button className="flex px-3 py-1 m-2 text-sm transition-colors duration-300 border-2 border-green-500 rounded-2xl hover:bg-green-500 hover:text-white font-poppins"><a href="" className="flex items-center">Visit<MdKeyboardDoubleArrowRight className="pl-1 text-sm animate-ping"/></a></button>
              </div>
            </div>
            {/* <div className="flex flex-col rounded-lg shadow-xl bg-slate-100 md:flex-row">
            <div className="w-full md:w-[50%] h-[400px] rounded-t-lg md:rounded-l-lg bg-gradient-to-r from-white to-blue-200 backdrop-filter backdrop-blur-lg">
                <Image alt="portfolio1" src={Screenshot4} className="object-cover w-[100%] h-[100%] rounded-t-lg md:rounded-l-lg lg:rounded-l-lg bg-gradient-to-r from-white to-blue-200 backdrop-filter backdrop-blur-lg"/>
              </div>
              <div className="md:w-[50%]">
                <h4 className="px-3 py-3 mb-1 text-lg font-semibold leading-4 text-gray-800 font-poppins">Admin Dashboard</h4>
                <p className="px-3 text-base leading-5 text-gray-600 font-poppins">
                  This was a complementary dashboard to the Christian Union website.
                </p>
                <div className="flex flex-col px-2 py-3">
                  <h5 className="font-semibold leading-8 text-gray-700 font-poppins">Resources Used</h5>
                  <ul className="text-sm leading-6 text-gray-600 font-poppins">
                    <li>ReactJs</li>
                    <li>Tailwind Css</li>
                    <li>Syncfusion Components</li>
                    <li>NodeJs</li>
                    <li>MongoDB</li>
                  </ul>
                </div>
                <button className="flex px-3 py-1 m-2 text-sm transition-colors duration-300 border-2 border-green-500 rounded-2xl hover:bg-green-500 hover:text-white font-poppins"><a href="" className="flex items-center">Visit<MdKeyboardDoubleArrowRight className="pl-1 text-sm animate-ping"/></a></button>
              </div>
            </div> */}
        </div>
      </section>
      {/* <section>
        <span className="py-2 text-base font-semibold leading-8 text-gray-600 font-poppins">Let's Connect</span>
        <h3 className="py-1 text-3xl font-semibold font-poppins">Contact Me</h3>
        <Container maxW="500px" mt="12">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={value.name}/>
          </FormControl>
        </Container>
      </section> */}
    </main>
  );
}
