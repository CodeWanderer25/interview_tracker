const Button = ({ children, onClick, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
