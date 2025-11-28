import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, title: string, color: string, units: number) => void;
  initialName?: string;
  initialTitle?: string;
  initialColor?: string;
  initialUnits?: number;
}

export default function CourseModal({
  isOpen,
  onClose,
  onSubmit,
  initialName = "",
  initialTitle = "",
  initialColor = "",
  initialUnits = 0,
}: CourseModalProps) {
  const [name, setName] = useState(initialName);
  const [title, setTitle] = useState(initialTitle);
  const [color, setColor] = useState(initialColor);
  const [units, setUnits] = useState(String(initialUnits));

  useEffect(() => {
    setName(initialName);
    setTitle(initialTitle);
    setColor(initialColor);
    setUnits(String(initialUnits));
  }, [initialName, initialTitle, initialColor, initialUnits]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div className="bg-gray-900 rounded-2xl shadow-xl w-[95vw] max-w-md p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-400 transition cursor-pointer"
        >
          <FaTimes size={20} aria-label="Close modal" title="Close modal" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4 text-gray-200">
          Edit Course Info
        </h2>

        {/* Course Name */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Course Number
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 30))}
              className="w-full border-2 border-gray-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="e.g. PHIL 101"
            />
            <p className="text-xs text-gray-500 mt-1">
              {name.length}/30 characters
            </p>
          </div>

          {/* Course Units */}
          <div className="flex-[0.25]">
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Units
            </label>
            <input
              type="number"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className="w-full border-2 border-gray-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="0"
              min={0}
              max={10}
            />
          </div>
        </div>

        {/* Course Title */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Course Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 100))}
              className="w-full border-2 border-gray-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="e.g. Introduction to Philosophy"
            />
            <p className="text-xs text-gray-500 mt-1">
              {title.length}/100 characters
            </p>
          </div>
        </div>

        {/* Course Color */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Course Color
          </label>
          <div className="grid grid-cols-7 gap-2">
            {[
              "bg-red-200 hover:bg-red-300 focus:bg-red-300",
              "bg-orange-200 hover:bg-orange-300 focus:bg-orange-300",
              "bg-yellow-200 hover:bg-yellow-300 focus:bg-yellow-300",
              "bg-green-200 hover:bg-green-300 focus:bg-green-300",
              "bg-blue-200 hover:bg-blue-300 focus:bg-blue-300",
              "bg-violet-200 hover:bg-violet-300 focus:bg-violet-300",
              "bg-neutral-200 hover:bg-neutral-300 focus:bg-neutral-300",
            ].map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 transition rounded-full ring-2 ring-offset-2 ring-offset-gray-900 cursor-pointer ${
                  color === c ? "ring-gray-500" : "ring-transparent"
                } ${c}`}
              />
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-gray-600 hover:bg-gray-500 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onSubmit(name, title, color, Number(units));
              onClose();
            }}
            className="px-4 py-2 text-sm bg-blue-200 text-white rounded-lg hover:bg-blue-300 transition cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
