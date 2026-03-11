import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const SKILL_LEVELS = [
  { label: 'What is that', value: 0 },
  { label: 'Learning', value: 20 },
  { label: 'Confident', value: 60 },
  { label: 'I got you', value: 80 },
  { label: 'Sensei', value: 100 },
]

const SKILL_DATA = [
  {
    key: 'typescript',
    label: 'TypeScript',
    value: 85,
    color: '#3178C6',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    key: 'nestjs',
    label: 'NestJS',
    value: 85,
    color: '#E0234E',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg',
  },
  {
    key: 'react',
    label: 'ReactJS',
    value: 85,
    color: '#61DAFB',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    key: 'node',
    label: 'NodeJS',
    value: 85,
    color: '#3C873A',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    key: 'postgres',
    label: 'PostgreSQL',
    value: 80,
    color: '#336791',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  },
  {
    key: 'docker',
    label: 'Docker',
    value: 70,
    color: '#0db7ed',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  },
]

function SkillsChart() {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const width = container.clientWidth || 600
    const height = 360
    const margin = { top: 24, right: 16, bottom: 72, left: 80 }

    const svg = d3
      .select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const xScale = d3
      .scaleBand()
      .domain(SKILL_DATA.map((d) => d.key))
      .range([0, innerWidth])
      .padding(0.25)

    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .nice()
      .range([innerHeight, 0])

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const levelCount = SKILL_LEVELS.length

    // Y grid + labels: labels evenly spaced, bars use numeric yScale
    const yAxisGroup = g.append('g')

    SKILL_LEVELS.forEach((level) => {
      const index = SKILL_LEVELS.findIndex((l) => l.value === level.value)
      const t = index / (levelCount - 1 || 1)
      const y = innerHeight - t * innerHeight

      // grid line
      yAxisGroup
        .append('line')
        .attr('x1', 0)
        .attr('x2', innerWidth)
        .attr('y1', y)
        .attr('y2', y)
        .attr('stroke', '#e5e7eb')

      // label
      yAxisGroup
        .append('text')
        .attr('x', -12)
        .attr('y', y)
        .attr('text-anchor', 'end')
        .attr('fill', '#64748b')
        .attr('font-size', 11)
        .attr('dy', '0.35em')
        .text(level.label)
    })

    // Bars
    g.selectAll('rect.bar')
      .data(SKILL_DATA)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.key))
      .attr('width', xScale.bandwidth())
      .attr('y', (d) => yScale(d.value))
      .attr('height', (d) => innerHeight - yScale(d.value))
      .attr('rx', 6)
      .attr('fill', (d) => d3.color(d.color)?.brighter(0.7).formatHex())

    // Value labels
    g.selectAll('text.value')
      .data(SKILL_DATA)
      .enter()
      .append('text')
      .attr('class', 'value')
      .attr('x', (d) => (xScale(d.key) ?? 0) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.value) - 6)
      .attr('text-anchor', 'middle')
      .attr('fill', '#0f172a')
      .attr('font-size', 10)
      .text((d) => `${d.value}%`)

    // X logos
    const logoGroup = g
      .append('g')
      .attr('transform', `translate(0, ${innerHeight + 12})`)

    logoGroup
      .selectAll('image.logo')
      .data(SKILL_DATA)
      .enter()
      .append('image')
      .attr('class', 'logo')
      .attr('href', (d) => d.logo)
      .attr('x', (d) => (xScale(d.key) ?? 0) + xScale.bandwidth() / 2 - 14)
      .attr('y', 0)
      .attr('width', 28)
      .attr('height', 28)

    logoGroup
      .selectAll('text.x-label')
      .data(SKILL_DATA)
      .enter()
      .append('text')
      .attr('class', 'x-label')
      .attr('x', (d) => (xScale(d.key) ?? 0) + xScale.bandwidth() / 2)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .attr('fill', '#64748b')
      .attr('font-size', 10)
      .text((d) => d.label)

    return () => {
      d3.select(container).selectAll('*').remove()
    }
  }, [])

  return <div ref={ref} className="w-full overflow-x-auto" />
}

export default function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 bg-white scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-slate-900 mb-4 sm:mb-6">
          Skills
        </h2>
        <div className="px-3 sm:px-4 py-4 sm:py-5">
          <SkillsChart />
        </div>
      </div>
    </section>
  )
}
