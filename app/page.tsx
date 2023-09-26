"use client";
import { BiHappyHeartEyes } from "react-icons/bi";
import { AiFillTwitterCircle, AiFillLinkedin, AiOutlineWhatsApp } from "react-icons/ai";
import {
  BsGithub,
  BsDatabaseCheck,
  BsFillSendFill,
  BsFillMoonStarsFill,
} from "react-icons/bs";
import { DiReact } from "react-icons/di";
import { FaPhp, FaNodeJs } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { GoMail } from "react-icons/go";
import { SiTailwindcss, SiTypescript } from "react-icons/si";
import Image from "next/image";
import fig from "../public/fig.jpeg";
import Screenshot8 from "../public/Screenshot8.png";
import { useForm, ValidationError } from "@formspree/react";
import { useState, useEffect } from "react";
import api from "../public/api.png";
import houseslider from "../public/houseslider.png";
import smartkitchen from "../public/smartkitchen.png";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger"; 
import gsap from "gsap"

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [state, handleSubmit] = useForm("mrgwzzrr");
  useEffect(() => {
    // Create a GSAP timeline for each section animation
    const sectionAnimations = [
      gsap.timeline().from(".section-1", { opacity: 0, y: 100, duration: 1 }),
      gsap.timeline().from(".section-2", { opacity: 0, y: 100, duration: 1 }),
      gsap.timeline().from(".section-3", { opacity: 0, y: 100, duration: 1 }),
      // Add more sections as needed
    ];

    // Add a scroll listener to trigger animations when sections come into view
    const handleScroll = () => {
      const scrollY = window.scrollY;
      sectionAnimations.forEach((animation, index) => {
        const section = document.querySelector(`.section-${index + 1}`);
        if (section) {
          const sectionTop = section.getBoundingClientRect().top;
          if (sectionTop < window.innerHeight / 2) {
            animation.play();
          } else {
            animation.reverse();
          }
        }
      });
    };

    // Attach the scroll listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (state.succeeded) {
    return (
      <div className=" flex flex-col mx-auto w-72 my-6 p-2 rounded-lg shadow-xl">
        <div className="px-3 py-4 place-items-center">
          <BiHappyHeartEyes className="text-3xl text-yellow-900" />
        </div>
        <h4 className="px-3 py-1 font-semibold leading-8 text-gray-600 font-poppins">
          Thank You
        </h4>
        <p className="px-3 py-2 text-base font-normal leading-6 text-stone-600 font-poppins">
          Thank you for your message. I will reply as soon as possible.
        </p>
        <Link href="../Profile" className="text-xl font-burtons text-center py-2">Back</Link>
      </div>
    );
  }
  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="px-10 bg-white dark:bg-gray-900 overflow-hidden">
        <section className="min-h-screen">
          <nav className="flex justify-between py-10 mb-12 dark:text-white">
            <h1 className="text-xl font-burtons">Bravine.dev</h1>
            <ul className="flex items-center">
              <li>
                <BsFillMoonStarsFill
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-2xl cursor-pointer"
                />
              </li>
              <li>
                <Link
                  href="../Profile"
                  className="px-4 py-2 ml-8 text-white rounded-md bg-gradient-to-r from-cyan-500 to-teal-500"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </nav>
          <div className="p-8 text-center">
            <h2 className="py-2 text-5xl font-medium font-poppins dark:text-teal-400 md:text-6xl">
              Bravine Alusiola
            </h2>
            <h3 className="py-2 text-2xl font-poppins dark:text-white md:text-3xl">
              Frontend Web designer
            </h3>
            <p className="py-5 leading-8 text-gray-800 text-md font-poppins dark:text-gray-200 md:text-xl">
              Creating visually captivating and functionally seamless websites
              that leave a lasting impression.
            </p>
          </div>
          <div className="flex justify-center gap-12 py-3 text-5xl text-gray-600 dark:text-gray-400">
            <a href="https://github.com/luckyBravine" title="My Github" target="_blank" rel="noopener noreferrer">
              <BsGithub  />
            </a>
            <a href="https://www.linkedin.com/in/bravine-alusiola-896ab3217/" title="My LinkedIn" target="_blank" rel="noopener noreferrer">
              <AiFillLinkedin />
            </a>
          </div>
        </section>

        <section className="dark:bg-gray-900 section-1">
          <div>
            <span className="py-2 text-base font-semibold leading-8 text-gray-600 font-poppins dark:text-white">
              Services
            </span>
            <h3 className="py-1 text-3xl font-semibold font-poppins dark:text-gray-200">
              Skill-Set
            </h3>
            <div></div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 font-poppins">
              <div className="p-2 rounded-lg shadow-xl">
                <div className="px-3 py-4">
                  <BsGithub className="text-3xl text-gray-800 dark:text-gray-400" />
                </div>
                <h4 className="px-3 py-1 font-semibold leading-8 text-gray-600 font-poppins dark:text-white">
                  Git & GitHub Commands
                </h4>
                <p className="px-3 py-2 text-base font-normal leading-6 text-stone-600 font-poppins dark:text-gray-300">
                  I have utilized various Git and GitHub commands to manage
                  version control, collaborate with team members, and contribute
                  to open-source projects.
                </p>
              </div>
              <div className="p-2 rounded-lg shadow-xl">
                <div className="px-3 py-4">
                  <BsDatabaseCheck className="text-3xl text-gray-800 dark:text-gray-400" />
                </div>
                <h4 className="px-3 py-1 font-semibold leading-8 text-gray-600 font-poppins dark:text-white">
                  Database Manipulation
                </h4>
                <p className="px-3 py-2 text-base font-normal leading-6 text-stone-600 font-poppins dark:text-gray-300">
                  In my years at Campus I interactected mostly with MySql and
                  perfomed CRUD functionalities with it. But recently I have
                  delved into MongoDB for a change.
                </p>
              </div>

              <div className="p-2 rounded-lg shadow-xl">
                <div className="px-3 py-4">
                  <DiReact className="text-3xl text-gray-800 dark:text-gray-400" />
                </div>
                <h4 className="px-3 py-1 font-semibold leading-8 text-gray-600 font-poppins dark:text-white">
                  React
                </h4>
                <p className="px-3 py-2 text-base font-normal leading-6 text-stone-600 font-poppins dark:text-gray-300">
                  Building my final year project using ReactJs allowed me to
                  create a dynamic and interactive showcase of my work,
                  enhancing user experience and showcasing my skills
                  effectively.
                </p>
              </div>

              <div className="p-2 rounded-lg shadow-xl">
                <div className="px-3 py-4">
                  <SiTypescript className="text-3xl text-gray-800 dark:text-gray-400" />
                </div>
                <h4 className="px-3 py-1 font-semibold leading-8 text-gray-600 font-poppins dark:text-white">
              TypeScript
                </h4>
                <p className="px-3 py-2 text-base font-normal leading-6 text-stone-600 font-poppins dark:text-gray-300">
                  I have utilized PHP to create a dynamic and interactive
                  website, allowing for seamless integration of database
                  functionality and content management.
                </p>
              </div>

              <div className="p-2 rounded-lg shadow-xl">
                <div className="px-3 py-4">
                  <FaNodeJs className="text-3xl text-gray-800 dark:text-gray-400" />
                </div>
                <h4 className="px-3 py-1 font-semibold leading-8 text-gray-600 font-poppins dark:text-white">
                  NodeJs
                </h4>
                <p className="px-3 py-2 text-base font-normal leading-6 text-stone-600 font-poppins dark:text-gray-300">
                  Using Node.js has allowed me to build dynamic and scalable
                  websites with server-side rendering, API integrations, and a
                  wide range of powerful libraries and frameworks.
                </p>
              </div>

              <div className="p-2 rounded-lg shadow-xl">
                <div className="px-3 py-4">
                  <SiTailwindcss className="text-3xl text-gray-800 dark:text-gray-400" />
                </div>
                <h4 className="px-3 py-1 font-semibold leading-8 text-gray-600 font-poppins dark:text-white">
                  TailwindCSS Styling
                </h4>
                <p className="px-3 py-2 text-base font-normal leading-6 text-stone-600 font-poppins dark:text-gray-300">
                  Using Tailwind CSS for my projects allowed me to rapidly
                  create a highly customizable and responsive design, resulting
                  in a sleek and professional showcase of my work.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-3 my-5 dark:bg-gray-900 section-2">
          <span className="py-2 text-base font-semibold leading-8 text-gray-600 font-poppins dark:text-white">
            Projects
          </span>
          <h3 className="py-1 mb-2 text-3xl font-semibold font-poppins dark:text-gray-200">
            Portfolio
          </h3>
          <div className="columns-1 w-full h-full gap-5 lg:gap-8 md:columns-2 lg:columns-3 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-8">
            <div className="flex flex-col rounded-md shadow-xl img-wrapper">
              <div className="w-full rounded-md">
                <Image
                  alt="portfolio1"
                  src={Screenshot8}
                  className="object-cover rounded-md w-[100%] h-[100%] img"
                />
              </div>
              <div className=" dark:bg-gray-900 content slide-left">
                <h4 className="mb-1 text-lg font-semibold leading-4 text-gray-800 font-poppins dark:text-white">
                  The Christian Union Web-App
                </h4>
                
                <div className="md:flex flex-col hidden">
                <h6 className="text-base font-semibold leading-8 text-gray-600 font-poppins dark:text-gray-300">
                    Resources Used
                  </h6>
                  <ul className="text-sm leading-6 text-gray-600 font-poppins dark:text-gray-400">
                    <li>ReactJs</li>
                    <li>Tailwind Css</li>
                    <li>NodeJs</li>
                  </ul>
                </div>
                <button className="flex px-3 py-1 mt-2 text-sm transition-colors dark:text-gray-200 duration-300 border-2 border-green-500 rounded-md hover:bg-green-500 hover:text-white font-poppins">
                  <a
                    href="https://luckybravine.github.io/christian-union-static-version/"
                    className="flex items-center"
                    target="_blank" rel="noopener noreferrer"
                  >
                    Visit
                    <MdKeyboardDoubleArrowRight className="pl-1 text-sm animate-ping" />
                  </a>
                </button>
              </div>
            </div>
            <div className="flex flex-col rounded-md shadow-xl my-8 img-wrapper">
              <div className="w-full rounded-md">
                <Image
                  alt="portfolio1"
                  src={smartkitchen}
                  className="object-cover rounded-md w-[100%] h-[100%] img"
                />
              </div>
              <div className="dark:bg-gray-900 content slide-up">
                <h4 className=" mb-1 text-lg font-semibold leading-4 text-gray-800 font-poppins dark:text-white">
                  Smart Kitchen App
                </h4>
                
                <div className="md:flex flex-col hidden">
                <h6 className="text-base font-semibold leading-8 text-gray-600 font-poppins dark:text-gray-300">
                    Resources Used
                  </h6>
                  <ul className="text-sm leading-6 text-gray-600 font-poppins dark:text-gray-400">
                    <li>ReactJs</li>
                    <li>Tailwind Css</li>
                    <li>TypeScript & Gsap</li>
                  </ul>
                </div>
                <button className="flex px-3 py-1 mt-2 text-sm transition-colors dark:text-gray-200 duration-300 border-2 border-green-500 rounded-md hover:bg-green-500 hover:text-white font-poppins">
                  <a
                    href="https://kitchen-app-cyan.vercel.app/"
                    className="flex items-center"
                    target="_blank" rel="noopener noreferrer"
                  >
                    Visit
                    <MdKeyboardDoubleArrowRight className="pl-1 text-sm animate-ping" />
                  </a>
                </button>
              </div>
            </div>
            <div className="flex flex-col rounded-md shadow-xl my-8 img-wrapper">
              <div className="w-full rounded-md ">
                <Image
                  alt="portfolio1"
                  src={api}
                  className="object-cover rounded-md w-[100%] h-[100%] img"
                />
              </div>
              <div className="content slide-down dark:bg-gray-900">
                <h4 className=" mb-1 text-lg font-semibold leading-4 text-gray-800 font-poppins dark:text-white">
                  API Collection
                </h4>
                
                <div className="md:flex flex-col hidden">
                <h6 className="text-base font-semibold leading-8 text-gray-600 font-poppins dark:text-gray-300">
                    Resources Used
                  </h6>
                  <ul className="text-sm leading-6 text-gray-600 font-poppins dark:text-gray-400">
                    <li>NextJs</li>
                    <li>RapidApi</li>
                  </ul>
                </div>
                <button className="flex px-3 py-1 mt-2 text-sm transition-colors dark:text-gray-200 duration-300 border-2 border-green-500 rounded-md hover:bg-green-500 hover:text-white font-poppins">
                  <a
                    href="https://luckybravine.github.io/christian-union-static-version/"
                    className="flex items-center"
                    target="_blank" rel="noopener noreferrer"
                  >
                    Visit
                    <MdKeyboardDoubleArrowRight className="pl-1 text-sm animate-ping" />
                  </a>
                </button>
              </div>
            </div>
            <div className="flex flex-col rounded-md shadow-xl my-8 img-wrapper">
              <div className="w-full" >
                <Image
                  alt="portfolio1"
                  src={houseslider}
                  className="object-cover rounded-md w-[100%] h-[100%] img"
                />
              </div>
              <div className=" dark:bg-gray-900 content slide-right">
                <h4 className="py-1 text-lg font-semibold leading-4 text-gray-800 font-poppins dark:text-white">
                  House Slider
                </h4>
                
                <div className="md:flex flex-col hidden">
                  <h6 className="text-base font-semibold leading-8 text-gray-600 font-poppins dark:text-gray-300">
                    Resources Used
                  </h6>
                  <ul className="text-sm leading-6 text-gray-600 font-poppins dark:text-gray-400">
                    <li>ReactJs</li>
                    <li>Tailwind Css</li>
                    <li>Gsap</li>
                  </ul>
                </div>
                <button className="flex px-3 py-1 mt-2 text-sm transition-colors dark:text-gray-200 duration-300 border-2 border-green-500 rounded-md hover:bg-green-500 hover:text-white font-poppins">
                  <a
                    href="https://house-slider-3pddhi7ai-luckybravine.vercel.app/"
                    className="flex items-center"
                    target="_blank" rel="noopener noreferrer"
                  >
                    Visit
                    <MdKeyboardDoubleArrowRight className="pl-1 text-sm animate-ping" />
                  </a>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="dark:bg-gray-900 h-full section-3">
        <span className="py-2 text-base font-semibold leading-8 text-gray-600 font-poppins dark:text-white">
            Let's Engage
          </span>
          <h3 className="py-1 mb-2 text-3xl font-semibold font-poppins dark:text-gray-200">
            Contact Me
          </h3>
          <div className="flex flex-col justify-center mx-auto md:justify-evenly w-full md:flex-row my-2 md:my-4 dark:bg-gray-900">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full md:w-[60%] mx-auto p-8"
            >
              <h3 className=" py-3 mb-1 text-lg font-semibold leading-4 text-gray-800 font-poppins dark:text-white">
                Mail me
              </h3>
              <span className="py-2 text-base font-semibold leading-8 text-gray-600 font-poppins dark:text-white">
                For further inquiries and clarification message Me via email.
              </span>
              <div className="flex flex-col w-full justify-between md:flex-row">
                <div className="flex flex-col w-full md:w-[55%] mb-2">
                  <label
                    htmlFor="name"
                    className="py-2 text-base dark:text-gray-200 mr-2 font-semibold leading-4 text-gray-700 font-poppins"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="name"
                    name="name"
                    className="w-[98%] px-4 py-2 border border-gray-600 focus:outline-none focus:border-blue-500 dark:bg-gray-900 dark:text-gray-200"
                  />
                  <ValidationError
                    prefix="name"
                    field="name"
                    errors={state.errors}
                  />
                </div>
                <div className="flex flex-col w-full md:w-[45%] mb-2">
                  <label
                    htmlFor="email"
                    className="py-2 text-base dark:text-gray-200 mr-2 font-semibold leading-4 text-gray-700 font-poppins"
                  >
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="w-[98%] px-4 py-2 border border-gray-600 focus:outline-none focus:border-blue-500 dark:bg-gray-900 dark:text-gray-200"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                  />
                </div>
              </div>
              <div className="flex w-full flex-col mb-4">
                <label
                  htmlFor="email"
                  className="py-2 text-base mr-2 font-semibold leading-4 text-gray-700 font-poppins dark:text-gray-200"
                >
                  Let's Engage
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full h-32 px-4 py-2  border border-gray-600 focus:outline-none focus:border-blue-500 dark:bg-gray-900 dark:text-gray-200"
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
              </div>

              <div className="flex-1 mr-0 justify-end items-end place-items-end"><button
                type="submit"
                disabled={state.submitting}
                className="w-full md:w-64 flex place-items-center justify-center items-center px-4 py-2 text-white bg-gradient-to-r from-cyan-500 to-teal-500"
              >
                Send Email <BsFillSendFill className="ml-2" />
              </button></div>
            </form>
            <div className="w-full md:w-[40%] p-8 bg-stone-200 dark:bg-stone-600 dark:text-gray-200">
              <h3 className=" py-3 mb-1 text-lg font-semibold leading-4 text-gray-800 font-poppins dark:text-white">
                Contact Information
              </h3>
              <span className="py-2 text-base font-semibold leading-8 text-gray-600 font-poppins dark:text-white">
                More avenues to contact me are below
              </span>
              <div className="flex-col my-5">
                <p className="text-sm leading-5 text-gray-800 font-poppins dark:text-gray-200">
                  Address
                </p>
                <p className="text-base leading-5 font-semibold text-gray-800 font-poppins dark:text-gray-200">
                  0100, Nairobi
                </p>
              </div>
              <div className="flex-col my-5">
                <p className="text-sm leading-5 text-gray-800 font-poppins dark:text-gray-200">
                  Phone
                </p>
                <p className="text-base font-semibold leading-5 text-gray-800 font-poppins dark:text-gray-200">
                  +254-799-117-106
                </p>
              </div>
              <div className="flex-col my-5">
                <p className="text-sm leading-5 text-gray-800 font-poppins dark:text-gray-200">
                  E-mail
                </p>
                <p className="text-base leading-5 font-semibold text-gray-800 font-poppins dark:text-gray-200">
                  bravinlude@gmail.com
                </p>
              </div>
              <div className="flex items-end pt-12 gap-10 text-2xl text-gray-600 dark:text-gray-400">
                <a href="https://twitter.com/LuckyBravine" target="_blank" rel="noopener noreferrer">
                  <AiFillTwitterCircle />
                </a>
                <a href="https://www.linkedin.com/in/bravine-alusiola-896ab3217/" target="_blank" rel="noopener noreferrer">
                  <AiFillLinkedin />
                </a>
                <a href="https://wa.me/254799117106" target="_blank" rel="noopener noreferrer">
                  <AiOutlineWhatsApp />
                </a>
                
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
