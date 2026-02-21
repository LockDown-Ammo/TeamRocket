function Signup() {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-xl w-80">
        <h2 className="text-xl mb-4 text-purple-500">Signup</h2>
        <input type="text" placeholder="Name" className="w-full mb-3 p-2 rounded bg-gray-800"/>
        <input type="email" placeholder="Email" className="w-full mb-3 p-2 rounded bg-gray-800"/>
        <input type="password" placeholder="Password" className="w-full mb-3 p-2 rounded bg-gray-800"/>
        <button className="w-full bg-purple-600 p-2 rounded">
          Signup
        </button>
      </div>
    </div>
  )
}

export default Signup