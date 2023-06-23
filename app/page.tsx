"use client";
import { BiHappyHeartEyes } from "react-icons/bi";
import {AiFillTwitterCircle, AiFillLinkedin} from 'react-icons/ai';
import {BsGithub, BsDatabaseCheck, BsFillSendFill, BsFillMoonStarsFill} from "react-icons/bs";
import {DiReact} from "react-icons/di";
import {FaPhp, FaNodeJs} from "react-icons/fa";
import {MdKeyboardDoubleArrowRight} from "react-icons/md"
import {GoMail} from "react-icons/go"
import {SiTailwindcss} from "react-icons/si"
import Image from "next/image";
import fig from "../public/fig.jpeg";
import Screenshot8 from "../public/Screenshot8.png"
import { useForm, ValidationError } from '@formspree/react';
import { useState } from "react";



export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [state, handleSubmit] = useForm("mrgwzzrr");
  if (state.succeeded) {
      return <div className=" flex flex-col mx-auto w-72 my-6 p-2 rounded-lg shadow-xl">
      <div className="px-3 py-4 place-items-center">
        <BiHappyHeartEyes className="text-3xl text-yellow-900"/>
      </div>
      <h4 className="px-3 py-1 font-semibold leading-8 text-gray-600 font-poppins">Thank You</h4>
      <p className="px-3 py-2 text-base font-normal leading-6 text-stone-600 font-poppins">
        Thank you for your message. I will reply as soon as possible. Refresh to get back.
      </p>
    </div>;
  }
  return (
    <div className={darkMode ? "dark" : ""}>
    <main className="px-10 bg-white dark:bg-gray-900">
      <section className="min-h-screen">
        <nav className="flex justify-between py-10 mb-12 dark:text-white">
          <h1 className="text-xl font-burtons">Bravine.dev</h1>
          <ul className="flex items-center">
            <li>
              <BsFillMoonStarsFill onClick={() => setDarkMode(!darkMode)} className="text-2xl cursor-pointer" />
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
          <h2 className="py-2 text-5xl font-medium font-poppins dark:text-teal-400 md:text-6xl">Bravine Alusiola</h2>
          <h3 className="py-2 text-2xl font-poppins dark:text-white md:text-3xl">Frontend Web designer</h3>
          <p className="py-5 leading-8 text-gray-800 text-md font-poppins dark:text-gray-200 md:text-xl">
            Creating visually captivating and functionally seamless websites
            that leave a lasting impression.
          </p>
          
        </div>
        <div className="flex justify-center gap-12 py-3 text-5xl text-gray-600 dark:text-gray-400">
          <a href="https://twitter.com/LuckyBravine"><AiFillTwitterCircle/></a>
          <a href="https://www.linkedin.com/in/bravine-alusiola-896ab3217/"><AiFillLinkedin/></a>
        </div>
      </section>

      <section className="dark:bg-gray-900">
        <div>
          <span className="py-2 text-base font-semibold leading-8 text-gray-600 font-poppins dark:text-white">Services</span>
          <h3 className="py-1 text-3xl font-semibold font-poppins dark:text-gray-200">Skill-Set</h3>
          <div></div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 font-poppins">
            <div className="p-2 rounded-lg shadow-xl">
              <div className="px-3 py-4">
                <BsGithub className="text-3xl text-gray-800 dark:text-gray-400"/>
              </div>
              <h4 className="px-3 py-1 font-semibold leading-8 text-gray-600 font-poppins dark:text-white">Git & GitHub Commands</h4>
              <p className="px-3 py-2 text-base font-normal leading-6 text-stone-600 font-poppins dark:text-gray-300">
              I have utilized various Git and GitHub commands to manage version control, collaborate with team members, and contribute to open-source projects.
              </p>
            </div>
            <div className="p-2 rounded-lg shadow-xl">
              <div className="px-3 py-4">
                <BsDatabaseCheck className="text-3xl text-gray-800 dark:text-gray-400"/>
              </div>
              <h4 className="px-3 py-1 font-semibold leading-8 text-gray-600 font-poppins dark:text-white">Database Manipulation</h4>
              <p className="px-3 py-2 text-base font-normal leading-6 text-stone-600 font-poppins dark:text-gray-300">
                In my years at Campus I interactected mostly with MySql and perfomed CRUD functionalities with it. But recently I have delved into MongoDB for a change.
              </p>
            </div>
          
            <div className="p-2 rounded-lg shadow-xl">
              <div className="px-3 py-4">
                <DiReact className="text-3xl text-gray-800 dark:text-gray-400"/>
              </div>
              <h4 className="px-3 py-1 font-semibold leading-8 text-gray-600 font-poppins dark:text-white">React</h4>
              <p className="px-3 py-2 text-base font-normal leading-6 text-stone-600 font-poppins dark:text-gray-300">
              Building my final year project using ReactJs allowed me to create a dynamic and interactive showcase of my work, enhancing user experience and showcasing my skills effectively.
              </p>
            </div>
          
            <div className="p-2 rounded-lg shadow-xl">
              <div className="px-3 py-4">
                <FaPhp className="text-3xl text-gray-800 dark:text-gray-400"/>
              </div>
              <h4 className="px-3 py-1 font-semibold leading-8 text-gray-600 font-poppins dark:text-white">PHP Scripting</h4>
              <p className="px-3 py-2 text-base font-normal leading-6 text-stone-600 font-poppins dark:text-gray-300">
              I have utilized PHP to create a dynamic and interactive website, allowing for seamless integration of database functionality and content management.
              </p>
            </div>
          
            <div className="p-2 rounded-lg shadow-xl">
              <div className="px-3 py-4">
                <FaNodeJs className="text-3xl text-gray-800 dark:text-gray-400"/>
              </div>
              <h4 className="px-3 py-1 font-semibold leading-8 text-gray-600 font-poppins dark:text-white">NodeJs</h4>
              <p className="px-3 py-2 text-base font-normal leading-6 text-stone-600 font-poppins dark:text-gray-300">
              Using Node.js has allowed me to build dynamic and scalable websites with server-side rendering,
               API integrations, and a wide range of powerful libraries and frameworks.
              </p>
            </div>
          
            <div className="p-2 rounded-lg shadow-xl">
              <div className="px-3 py-4">
                <SiTailwindcss className="text-3xl text-gray-800 dark:text-gray-400"/>
              </div>
              <h4 className="px-3 py-1 font-semibold leading-8 text-gray-600 font-poppins dark:text-white">TailwindCSS Styling</h4>
              <p className="px-3 py-2 text-base font-normal leading-6 text-stone-600 font-poppins dark:text-gray-300">
              Using Tailwind CSS for my projects allowed me to rapidly create a highly customizable and responsive design, resulting in a sleek and professional showcase of my work.
              </p>
            </div>
          
          </div>
        </div>
      </section>
      <section className="py-3 my-5 dark:bg-gray-900">
        <span className="py-2 text-base font-semibold leading-8 text-gray-600 font-poppins dark:text-white">Projects</span>
        <h3 className="py-1 text-3xl font-semibold font-poppins dark:text-gray-200">Portfolio</h3>
        <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col rounded-lg shadow-xl bg-slate-100 md:flex-row ">
              <div className="w-full h-[400px] rounded-md md:w-[50%]">
                <Image alt="portfolio1" src={Screenshot8} className="object-cover rounded-md w-[100%] h-[100%]"/>
              </div>
              <div className="md:w-[50%] dark:bg-gray-900">
                <h4 className="px-3 py-3 mb-1 text-lg font-semibold leading-4 text-gray-800 font-poppins dark:text-white">The Christian Union Web-App</h4>
                <p className="px-3 text-base leading-5 text-gray-600 font-poppins dark:text-gray-200">
                This was my final year project which was based on improving components of the Murang'a University Christian Union website.

                </p>
                <div className="flex flex-col px-3 py-2">
                  <h5 className="text-base font-semibold leading-8 text-gray-700 font-poppins dark:text-gray-300">Resources Used</h5>
                  <ul className="text-sm leading-6 text-gray-600 font-poppins dark:text-gray-400">
                    <li>ReactJs</li>
                    <li>Tailwind Css</li>
                    <li>NodeJs</li>
                    <li>MongoDB</li>
                  </ul>
                </div>
                <button className="flex px-3 py-1 m-2 text-sm transition-colors dark:text-gray-200 duration-300 border-2 border-green-500 rounded-2xl hover:bg-green-500 hover:text-white font-poppins"><a href="https://luckybravine.github.io/christian-union-static-version/" className="flex items-center">Visit<MdKeyboardDoubleArrowRight className="pl-1 text-sm animate-ping"/></a></button>
              </div>
            </div>
        </div>
      </section>
      <section className="dark:bg-gray-900">
        <span className="py-2 text-base font-semibold leading-8 text-gray-600 font-poppins dark:text-white">Let's Connect</span>
        <h3 className="py-1 text-3xl font-semibold font-poppins dark:text-gray-200">Contact Me</h3>
        <div className="flex flex-col mb-2 dark:bg-gray-900">
            <form onSubmit={handleSubmit} className="flex flex-col justify-start">
              <div className="flex flex-col mb-2">
                <label htmlFor="email" className="py-2 text-base dark:text-gray-200 mr-2 font-semibold leading-4 text-gray-800 font-poppins">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email" 
                  name="email"
                  className="w-64 px-4 py-2 border border-gray-600 focus:outline-none focus:border-blue-500 dark:bg-gray-900 dark:text-gray-200"
                />
                <ValidationError 
                  prefix="Email" 
                  field="email"
                  errors={state.errors}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="email" className="py-2 text-base mr-2 font-semibold leading-4 text-gray-800 font-poppins dark:text-gray-200">
                  Let's Engage
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-64 h-32 px-4 py-2  border border-gray-600 focus:outline-none focus:border-blue-500 dark:bg-gray-900 dark:text-gray-200"
                />
                <ValidationError 
                  prefix="Message" 
                  field="message"
                  errors={state.errors}
                />
              </div>
              
              <button type="submit" disabled={state.submitting}  className="w-64 flex place-items-center justify-center items-center px-4 py-2 text-white bg-gradient-to-r from-cyan-500 to-teal-500">
                Send Email <BsFillSendFill className="ml-2"/>
              </button>
            </form>
        </div>
      </section>
    </main>
    </div> 
  );
}
