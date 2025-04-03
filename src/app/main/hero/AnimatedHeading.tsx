'use client';

import { TypeAnimation } from 'react-type-animation';

interface AnimatedHeadingProps {
  words: string[];
  restOfHeading: string;
}

export default function AnimatedHeading({ 
  words, 
  restOfHeading 
}: AnimatedHeadingProps) {
  return (
    <div className="flex items-end justify-center text-center py-1">
      <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#F8F8F8] dark:-[#F5F5F5]">
        <span className="inline-block">
          <TypeAnimation
            sequence={[
              ...words.flatMap(word => [word, 2000]),
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            cursor={true}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
              text-transparent bg-clip-text 
              animate-gradient"
          />
        </span>
        {restOfHeading}
      </h1>
    </div>
  );
} 