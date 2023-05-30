import { BsFillMoonStarsFill } from "react-icons/bs";
import {AiFillTwitterCircle, AiFillLinkedin} from 'react-icons/ai';
import {BsGithub, BsDatabaseCheck} from "react-icons/bs";
import {DiReact} from "react-icons/di";
import {FaPhp, FaNodeJs} from "react-icons/fa";
import {SiTailwindcss} from "react-icons/si"
import Image from "next/image";
import pic from '../public/pic.png';

export default function Home() {
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
          <span>Services</span>
          <h3 className="py-1 text-3xl">Skill-Set</h3>
          <div className="flex flex-col">
            <div className="bg-stone-500 p-2 mt-3">
              <div className="py-4 px-3">
                <BsGithub className="text-3xl text-white"/>
              </div>
              <h4 className="py-1 px-3 leading-8 text-gray-600">Git & GitHub Commands</h4>
              <p className="py-2 px-3 leading-8 text-gray-800 text-md">
                Transforming ideas into stunning, user-centric websites through responsive design, 
                intuitive navigation, and seamless integration of cutting-edge technologies.
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="bg-stone-500 p-2 mt-3">
              <div className="py-4 px-3">
                <BsDatabaseCheck className="text-3xl text-white"/>
              </div>
              <h4 className="py-1 px-3 leading-8 text-gray-600">Database Manipulation</h4>
              <p className="py-2 px-3 leading-8 text-gray-800 text-md">
                Transforming ideas into stunning, user-centric websites through responsive design, 
                intuitive navigation, and seamless integration of cutting-edge technologies.
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="bg-stone-500 p-2 mt-3">
              <div className="py-4 px-3">
                <DiReact className="text-3xl text-white"/>
              </div>
              <h4 className="py-1 px-3 leading-8 text-gray-600">React</h4>
              <p className="py-2 px-3 leading-8 text-gray-800 text-md">
                Transforming ideas into stunning, user-centric websites through responsive design, 
                intuitive navigation, and seamless integration of cutting-edge technologies.
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="bg-stone-500 p-2 mt-3">
              <div className="py-4 px-3">
                <FaPhp className="text-3xl text-white"/>
              </div>
              <h4 className="py-1 px-3 leading-8 text-gray-600">PHP Scripting</h4>
              <p className="py-2 px-3 leading-8 text-gray-800 text-md">
                Transforming ideas into stunning, user-centric websites through responsive design, 
                intuitive navigation, and seamless integration of cutting-edge technologies.
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="bg-stone-500 p-2 mt-3">
              <div className="py-4 px-3">
                <FaNodeJs className="text-3xl text-white"/>
              </div>
              <h4 className="py-1 px-3 leading-8 text-gray-600">NodeJs</h4>
              <p className="py-2 px-3 leading-8 text-gray-800 text-md">
                Transforming ideas into stunning, user-centric websites through responsive design, 
                intuitive navigation, and seamless integration of cutting-edge technologies.
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="bg-stone-500 p-2 mt-3">
              <div className="py-4 px-3">
                <SiTailwindcss className="text-3xl text-white"/>
              </div>
              <h4 className="py-1 px-3 leading-8 text-gray-600">TailwindCSS Styling</h4>
              <p className="py-2 px-3 leading-8 text-gray-800 text-md font-roboto-300">
                Transforming ideas into stunning, user-centric websites through responsive design, 
                intuitive navigation, and seamless integration of cutting-edge technologies.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h3 className="py-1 text-3xl">Portfolio</h3>
      </section>
    </main>
  );
}
