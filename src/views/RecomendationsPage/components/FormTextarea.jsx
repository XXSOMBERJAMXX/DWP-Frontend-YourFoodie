export default function FormTextarea({ label, id, name, required, value, onChange, rows }) {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-100 mb-1">
          {label} {required && <span className="text-red-700">*</span>}
        </label>
        <textarea
          id={id}
          name={name}
          required={required}
          rows={rows}
          className="bg-white text-gray-800 w-full p-2 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530] transition duration-200"
          value={value}
          onChange={onChange}
        ></textarea>
      </div>
    );
  }