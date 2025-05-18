"use client"

import type { ReactNode } from "react"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps {
  config: ChartConfig
  children: ReactNode
  className?: string
}

export const ChartContainer = ({ config, children, className }: ChartContainerProps) => {
  return (
    <div
      className={className}
      style={
        {
          "--color-variables": Object.entries(config)
            .map(([key, { color }]) => `--color-${key}:${color}`)
            .join(";"),
        } as any
      }
    >
      {children}
    </div>
  )
}

interface ChartTooltipProps {
  children: ReactNode
}

export const ChartTooltip = ({ children }: ChartTooltipProps) => {
  return <div className="chart-tooltip">{children}</div>
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: any[]
  label?: string
}

export const ChartTooltipContent = ({ active, payload, label }: ChartTooltipContentProps) => {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
          {payload.map((item, index) => (
            <span key={index} className="font-bold" style={{ color: item.color }}>
              {item.value}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

