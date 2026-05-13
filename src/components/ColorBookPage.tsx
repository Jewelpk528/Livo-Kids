import React from 'react';
import { Palette } from "lucide-react";
import { GenericBook, BookCategory } from './GenericBook';

interface ColorBookPageProps {
  onBack: () => void;
}

const bookData: BookCategory[] = [
  {
    category: "Colors",
    icon: <Palette size={18} className="text-purple-500" />,
    color: "bg-purple-50",
    theme: "text-purple-800",
    items: [
      { name: "Red", color: "bg-red-500", textColor: "text-white", border: "border-transparent" },
      { name: "Blue", color: "bg-blue-500", textColor: "text-white", border: "border-transparent" },
      { name: "Green", color: "bg-green-500", textColor: "text-white", border: "border-transparent" },
      { name: "Yellow", color: "bg-yellow-400", textColor: "text-gray-800", border: "border-transparent" },
      { name: "Orange", color: "bg-orange-500", textColor: "text-white", border: "border-transparent" },
      { name: "Purple", color: "bg-purple-500", textColor: "text-white", border: "border-transparent" },
      { name: "Pink", color: "bg-pink-400", textColor: "text-white", border: "border-transparent" },
      { name: "Brown", color: "bg-amber-800", textColor: "text-white", border: "border-transparent" },
      { name: "Black", color: "bg-black", textColor: "text-white", border: "border-transparent" },
      { name: "White", color: "bg-white", textColor: "text-gray-800", border: "border-gray-200" },
    ]
  }
];

export const ColorBookPage = ({ onBack }: ColorBookPageProps) => {
  return (
    <GenericBook 
      title="Colors" 
      bookData={bookData} 
      onBack={onBack} 
      completionMessage="Colorful!" 
      completionSubtext="You've learned all the colors!"
    />
  );
};
