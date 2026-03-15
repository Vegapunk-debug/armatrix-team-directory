"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
  <Particles
    id="tsparticles"
    className="absolute inset-0 z-0 h-full w-full pointer-events-none"
    options={{
        fullScreen: { enable: false },
        background: {
          color: { value: "transparent" },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab", 
            },
          },
          modes: {
            grab: {
              distance: 200, 
              links: {
                opacity: 0.9, 
                color: "#D4FF00"
              },
            },
          },
        },
        particles: {
          color: { value: ["#ffffff", "#D4FF00", "#aaaaaa"] },
          links: {
            color: "#D4FF00", 
            distance: 140,
            enable: true,
            opacity: 0.4,
            width: 2
          },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: true,
            speed: 0.5, 
            straight: false,
          },
          number: {
            density: { enable: true },
            value: 70, 
          },
          opacity: {
            value: { min: 0.4, max: 0.9 }
          },
          shape: { type: "circle" },
          size: { value: { min: 1.5, max: 3.5 } }
        },
        detectRetina: true
      }}
    />
  );
}