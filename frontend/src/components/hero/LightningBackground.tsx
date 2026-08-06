import { useRef, useEffect } from 'react'

type Point = { x: number; y: number }
type Bolt = { points: Point[]; opacity: number; width: number }

const HUE = 220

function generateBoltPath(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  detail: number,
): Point[] {
  const points: Point[] = [{ x: startX, y: startY }]
  const dx = endX - startX
  const dy = endY - startY
  const segments = Math.floor(Math.random() * 6 + 8)
  for (let i = 1; i < segments; i++) {
    const t = i / segments
    const x = startX + dx * t + (Math.random() - 0.5) * detail
    const y = startY + dy * t + (Math.random() - 0.5) * detail * 0.6
    points.push({ x, y })
  }
  points.push({ x: endX, y: endY })
  return points
}

function branchFrom(points: Point[], detail: number): Point[] {
  const idx = Math.floor(Math.random() * (points.length - 2)) + 1
  const p = points[idx]
  const angle = (Math.random() - 0.5) * Math.PI * 0.8
  const len = Math.random() * 80 + 30
  const end: Point = {
    x: p.x + Math.cos(angle) * len,
    y: p.y + Math.sin(angle) * len * 0.5,
  }
  return generateBoltPath(p.x, p.y, end.x, end.y, detail * 0.5)
}

function drawBolt(ctx: CanvasRenderingContext2D, points: Point[], opacity: number, width: number) {
  if (points.length < 2) return
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y)
  }
  ctx.strokeStyle = `hsla(${HUE}, 70%, 70%, ${opacity})`
  ctx.lineWidth = width
  ctx.shadowColor = `hsla(${HUE}, 80%, 60%, ${opacity * 0.6})`
  ctx.shadowBlur = 20
  ctx.stroke()
  ctx.restore()
}

function drawGlow(ctx: CanvasRenderingContext2D, points: Point[], opacity: number) {
  if (points.length < 2) return
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y)
  }
  ctx.strokeStyle = `hsla(${HUE}, 90%, 80%, ${opacity * 0.15})`
  ctx.lineWidth = 40
  ctx.shadowColor = `hsla(${HUE}, 90%, 70%, ${opacity * 0.3})`
  ctx.shadowBlur = 80
  ctx.stroke()
  ctx.restore()
}

export default function LightningBackground({ hue = HUE }: { hue?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number
    let strikes: Bolt[] = []
    let strikeTimer = 0
    let lastTime = performance.now()

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function strike(x?: number) {
      const startX = x ?? Math.random() * canvas!.width
      const endX = startX + (Math.random() - 0.5) * 120
      const endY = canvas!.height * (0.4 + Math.random() * 0.3)
      const detail = Math.random() * 80 + 60
      const points = generateBoltPath(startX, -10, endX, endY, detail)
      const branches: Point[][] = []
      const branchCount = Math.floor(Math.random() * 3) + 1
      for (let i = 0; i < branchCount; i++) {
        branches.push(branchFrom(points, detail))
      }
      strikes.push({
        points,
        opacity: 0.9,
        width: Math.random() * 2 + 1.5,
      })
      for (const b of branches) {
        strikes.push({
          points: b,
          opacity: 0.6,
          width: Math.random() * 1 + 0.5,
        })
      }
    }

    function drawBackground() {
      const gradient = ctx!.createLinearGradient(0, 0, 0, canvas!.height)
      gradient.addColorStop(0, `hsl(${hue}, 30%, 8%)`)
      gradient.addColorStop(0.5, `hsl(${hue}, 25%, 14%)`)
      gradient.addColorStop(1, `hsl(${hue}, 20%, 10%)`)
      ctx!.fillStyle = gradient
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height)
    }

    function drawStars() {
      const starCount = 120
      for (let i = 0; i < starCount; i++) {
        const seed = (i * 7919) % canvas!.width
        const sx = (seed / 7919) * canvas!.width
        const sy = ((i * 6271) % (canvas!.height * 0.6)) / (canvas!.height * 0.6) * canvas!.height * 0.6
        const size = ((i * 523) % 3) + 0.5
        const flicker = Math.sin(performance.now() / 1000 + i) * 0.3 + 0.7
        ctx!.fillStyle = `hsla(${hue + 20}, 40%, 85%, ${flicker * 0.6})`
        ctx!.beginPath()
        ctx!.arc(sx, sy, size, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    function drawClouds() {
      ctx!.save()
      for (let i = 0; i < 4; i++) {
        const cx = ((i * 1373 + performance.now() * 0.02) % (canvas!.width + 400)) - 200
        const cy = canvas!.height * 0.08 + i * 30
        const rw = 200 + i * 60
        const rh = 40 + i * 15
        ctx!.fillStyle = `hsla(${hue}, 20%, 15%, 0.3)`
        ctx!.beginPath()
        ctx!.ellipse(cx, cy, rw, rh, 0, 0, Math.PI * 2)
        ctx!.fill()
      }
      ctx!.restore()
    }

    function animate(time: number) {
      const delta = time - lastTime
      lastTime = time

      strikeTimer += delta
      if (strikeTimer > 2000 + Math.random() * 4000) {
        strikeTimer = 0
        strike(undefined)
        if (Math.random() > 0.6) {
          setTimeout(() => strike(undefined), 100 + Math.random() * 200)
        }
      }

      drawBackground()
      drawClouds()
      drawStars()

      strikes = strikes.filter((b) => b.opacity > 0.01)
      for (const bolt of strikes) {
        drawGlow(ctx!, bolt.points, bolt.opacity)
        drawBolt(ctx!, bolt.points, bolt.opacity, bolt.width)
        bolt.opacity -= delta * 0.0003
      }

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    strike(Math.random() * window.innerWidth)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [hue])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 block h-full w-full"
      aria-hidden="true"
    />
  )
}
