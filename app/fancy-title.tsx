import { Logo } from "./logo"

export const FancyTitle = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Logo size="large" />
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Clause and Effect</h1>
          </div>
        </div>
      </div>
    </header>
  )
}

