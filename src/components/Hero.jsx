import { useRef, useEffect, useState } from 'react'

// Orbit radius - scaled for 8 logos without overlap (spread across phi)
const ORBIT_RADIUS = 150 // px
const ORBIT_SPEED = 0.6 

const TECH_LOGOS = [
  { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'HTML5', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'Tailwind', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'AWS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
]

// Spread phi across -44° to 44° for clear vertical separation (no overlap)
const ORBIT_PHI = [-40, -30, -20, -10, 0, 10, 20, 30]

function use3DOrbit() {
  const [angles, setAngles] = useState(() =>
    TECH_LOGOS.map((_, i) => (i / TECH_LOGOS.length) * Math.PI * 2)
  )
  const rafRef = useRef(null)
  const lastTimeRef = useRef(performance.now())

  useEffect(() => {
    const animate = (time) => {
      const dt = (time - lastTimeRef.current) / 1000
      lastTimeRef.current = time

      setAngles((prev) =>
        prev.map((angle) => angle + ORBIT_SPEED * dt * 0.5)
      )
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return angles
}

function getOrbitPosition(theta, phiDeg) {
  const phi = (phiDeg * Math.PI) / 180
  const r = ORBIT_RADIUS
  const x = r * Math.cos(phi) * Math.sin(theta)
  const y = r * Math.sin(phi)
  const z = r * Math.cos(phi) * Math.cos(theta)
  return { x, y, z }
}

function getBillboardRotation(x, y, z) {
  const rotateY = (Math.atan2(x, z) * 180) / Math.PI
  const horizDist = Math.sqrt(x * x + z * z) || 0.001
  const rotateX = (-Math.atan2(y, horizDist) * 180) / Math.PI
  return { rotateX, rotateY }
}

export default function Hero() {
  const baseUrl = import.meta.env.BASE_URL
  const angles = use3DOrbit()

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 px-4 sm:px-6 lg:px-12 xl:px-16 pt-24 pb-16 bg-slate-50">
      <div className="max-w-4xl mx-auto flex flex-row">
      {/* Left: Text content */}
      <div className="flex flex-col items-start text-left max-w-2xl order-2 lg:order-1">
        <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-8 sm:mb-10">
          Hi, I&apos;m Chumlung. Nice to meet you.
        </p>
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-slate-900 leading-tight mb-4 sm:mb-6">
          I love building products users love and developers enjoy maintaining.
        </h1>
      </div>

      {/* Right: Doodle with orbiting logos */}
      <div
        className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex-shrink-0 order-1 lg:order-2"
        style={{ perspective: '1200px', perspectiveOrigin: '50% 50%'}}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
        >
          {(() => {
            const logoData = TECH_LOGOS.map((logo, i) => {
              const { x, y, z } = getOrbitPosition(angles[i], ORBIT_PHI[i])
              const { rotateX, rotateY } = getBillboardRotation(x, y, z)
              return { logo, x, y, z, rotateX, rotateY }
            })
            const behind = logoData.filter((d) => d.z < 0).sort((a, b) => a.z - b.z)
            const front = logoData.filter((d) => d.z >= 0).sort((a, b) => a.z - b.z)

            const renderLogo = (d) => (
              <div
                key={d.logo.name}
                className="absolute left-1/2 top-1/2 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 -ml-6 sm:-ml-7 lg:-ml-8 -mt-6 sm:-mt-7 lg:-mt-8 pointer-events-auto"
                style={{
                  transform: `translate3d(${d.x}px, ${d.y}px, ${d.z}px) rotateY(${d.rotateY}deg) rotateX(${d.rotateX}deg)`,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
              >
                <img
                  src={d.logo.src}
                  alt={d.logo.name}
                  title={d.logo.name}
                  className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            )

            return (
              <>
                {behind.map(renderLogo)}
                <img
                  src={`${baseUrl}hero-doodle.png`}
                  alt="Chumlung - thinking"
                  className="w-full h-full object-contain drop-shadow-lg"
                  style={{
                    transform: 'translate3d(0, 0, 0)',
                    transformStyle: 'preserve-3d',
                  }}
                />
                {front.map(renderLogo)}
              </>
            )
          })()}
        </div>
      </div>
      </div>
    </section>
  )
}
