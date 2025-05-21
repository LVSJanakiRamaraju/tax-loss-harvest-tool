import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex justify-center space-x-8 mt-8">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="h-16 w-16 animate-spin-slow" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="h-16 w-16" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-center mt-6">Vite + React</h1>
      <div className="card mx-auto mt-6 p-6 bg-white rounded-lg shadow-md w-64 text-center">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
        >
          count is {count}
        </button>
        <p className="mt-4 text-gray-600 text-sm">
          Edit <code className="bg-gray-100 px-1 rounded">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-center mt-6 text-gray-500">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
