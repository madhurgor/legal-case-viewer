import { Gavel } from "lucide-react"

export const Logo = ({ size = "medium" }: { size?: "small" | "medium" | "large" }) => {
  const sizes = {
    small: {
      container: "w-8 h-8",
      icon: "h-5 w-5",
    },
    medium: {
      container: "w-10 h-10",
      icon: "h-6 w-6",
    },
    large: {
      container: "w-12 h-12",
      icon: "h-8 w-8",
    },
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-2 rounded-lg shadow-sm border border-amber-200">
      <div className={`${sizes[size].container} flex items-center justify-center relative`}>
        {/* Main gavel icon */}
        <Gavel className={`${sizes[size].icon} text-amber-800 z-10`} strokeWidth={2} />

        {/* Decorative circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-full border-2 border-purple-600/30"></div>
        </div>

        {/* Sound waves */}
        <div className="absolute top-0 right-0">
          <div className="w-2 h-2 rounded-full bg-teal-500/20"></div>
        </div>
        <div className="absolute bottom-0 left-0">
          <div className="w-2 h-2 rounded-full bg-purple-500/20"></div>
        </div>
      </div>
    </div>
  )
}

