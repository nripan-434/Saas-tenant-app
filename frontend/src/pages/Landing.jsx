import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import img1 from '../assets/images/img1.png'
import LightRays from "../components/LightRays";

const LandingPage = () => {
  const navigate = useNavigate();

  const isLowEnd = window.innerWidth < 768;

  return (
    <div className="min-h-screen bg-[#0C1A2B] text-white overflow-hidden flex flex-col justify-center relative">
      {/* Optimized Light Rays */}
      {!isLowEnd && (
        <div className="absolute inset-0 z-0 opacity-90">
          <LightRays
            raysOrigin="top-center"
            raysColor="#B6FF3B"
            raysSpeed={0.6}
            lightSpread={0.6}
            rayLength={2.5}
            followMouse={false}
            mouseInfluence={0}
            noiseAmount={0}
            distortion={0}
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        </div>
      )}
      <div className="relative z-10">
        {/* HERO */}
        <div className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 py-20 gap-12">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 md:border-b-1 rounded-br-md pb-8 border-[#B6FF3B]"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Build, Manage, and Scale
              <br />
              <span className="text-[#B6FF3B]">
                Your Team — All in One Platform
              </span>
            </h1>
            <p className="mt-6 text-gray-400 max-w-lg text-lg">
              Manage projects, assign tasks, collaborate with your team, and generate intelligent workflows — all from a single, powerful platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => navigate("/register")}
                className="px-7 py-3 bg-[#B6FF3B] text-black font-semibold rounded-tl-[24px] rounded-tr-[24px] rounded-bl-[24px]  shadow-[0_0_15px_#B6FF3B55] hover:scale-105 duration-300"
              >
                Start Free
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-7 py-3 border rounded-tl-[24px] rounded-tr-[24px] rounded-bl-[24px] border-[#B6FF3B] text-[#B6FF3B]  hover:bg-[#B6FF3B] hover:text-black duration-300"
              >
                Login
              </button>

            </div>
          </motion.div>
          {/* RIGHT */}
          <motion.div
     initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 md:border-t-1 rounded-tl-md border-[#B6FF3B] relative flex items-center justify-center h-[420px]">
            {/* Glow */}
            <div className="absolute w-[300px] h-[300px] bg-[#B6FF3B] opacity-20 blur-2xl rounded-full"></div>

            {/* Main Card */}
            {/* RIGHT */}
            <div className="flex-1 relative flex items-center justify-center h-[320px] sm:h-[360px] lg:h-[380px]">

              {/* Glow */}
              <div className="absolute w-[200px] sm:w-[240px] lg:w-[260px] h-[200px] sm:h-[240px] lg:h-[260px] bg-[#B6FF3B] opacity-20 blur-2xl rounded-full"></div>

              {/* Main Image */}
              <motion.img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
                alt="dashboard"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[220px] sm:w-[460px] md:w-[300px] border-6 shadow-2xl border border-white/10 lg:rounded-br-[24px] lg:rounded-tr-[24px] lg:rounded-bl-[24px]
                            z-10 "
              />

              {/* Floating Image 1 */}
              <motion.img
                src={img1}
                alt="analytics"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="
      absolute border-6
      top-4 right-4 sm:top-6 sm:right-0 lg:right-8
      w-80 sm:w-38 md:w-72 lg:rounded-r-full
       shadow-xl border border-white/10 
      z-20 
    "
              />

              {/* Floating Image 2 */}
              <motion.img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
                alt="team"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="
      absolute  border-6
      bottom-4 left-4 sm:bottom-6 sm:left-0 lg:left-8
      w-80 sm:w-44 md:w-78  sm:z-10 md:z-0
      shadow-xl border border-white/10 lg:rounded-l-full
      z-0 
    "
              />

            </div>



        </motion.div>
      </div>
      {/* FEATURES */}
      <div className="px-6 md:px-16 pb-16">
        <div className="grid md:grid-cols-3 gap-8 ">
          {["Project Tracking", "Team Collaboration", "Real-time Analytics"].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="p-6 bg-white/5 backdrop-blur-md border-white/10 border-7 rounded-xl hover:scale-105 duration-300"
            >
              <h3 className="text-xl text-[#B6FF3B] font-semibold">
                {item}
              </h3>
              <p className="text-gray-400 mt-3">
                Smart tools to improve productivity and streamline operations.
              </p>
            </motion.div>
          ))}
        </div>
        
      </div>

    </div>
    
    </div >
    
  );
};

export default LandingPage;