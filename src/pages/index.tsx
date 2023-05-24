import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import emojis from '@/data/emojis.json';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  type Emoji = {
    title: string;
    keywords: string;
    symbol: string;
  };

  const [matchingEmojis, setMatchingEmojis] = useState<Emoji[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [hoveredEmoji, setHoveredEmoji] = useState<Emoji | null>(null);

  useEffect(() => {
    const filteredEmojis = emojis.filter(emoji =>
      emoji.keywords.includes(searchInput)
    );
    setMatchingEmojis(filteredEmojis.slice(0, 20));
  }, [searchInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleEmojiHover = (emoji: Emoji) => {
    setHoveredEmoji(emoji);
  };

  const handleEmojiLeave = () => {
    setHoveredEmoji(null);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Emoji Search</h1>
      <input
        className="w-full p-2 rounded border border-gray-300 mb-4"
        onChange={handleInputChange}
        type="text"
        placeholder="Type keywords to search emojis!"
      />
      <ul className="grid grid-cols-5 gap-4">
        {matchingEmojis.map(item => (
          <li
            key={item.symbol}
            className="relative flex items-center justify-center bg-gray-200 rounded p-4 cursor-pointer"
            onMouseEnter={() => handleEmojiHover(item)}
            onMouseLeave={handleEmojiLeave}
          >
            <span className="text-2xl">{item.symbol}</span>
            {hoveredEmoji === item && (
              <div className="absolute bg-white p-2 rounded shadow text-sm">
                <h2 className="font-bold mb-1">{item.title}</h2>
                <p className="text-gray-600">{item.keywords}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}