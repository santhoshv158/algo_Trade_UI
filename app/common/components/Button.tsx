
function Button(text?: { text?: string }) {
  return (
    <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-32 h-12">
      {text?.text}
    </button>
  );
}

export default Button;
