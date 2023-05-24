import { BsFillMoonStarsFill } from "react-icons/bs";
import {AiFillTwitterCircle, AiFillLinkedin} from 'react-icons/ai';
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
        <div className="relative mx-auto mt-20 overflow-hidden rounded-full bg-gradient-to-b from-teal-500 w-80 h-80">
          <Image alt="bravine" src={pic} fill className="object-cover"/>
        </div>
      </section>

      <section>
        <div>
          <h3 className="py-1 text-3xl">Services</h3>
          <p className="py-5 leading-8 text-gray-800 text-md">
            Transforming ideas into stunning, user-centric websites through responsive design, 
            intuitive navigation, and seamless integration of cutting-edge technologies.
          </p>
        </div>
      </section>
      <section>
        <h3 className="py-1 text-3xl">Portfolio</h3>
      </section>
    </main>
  );
}
