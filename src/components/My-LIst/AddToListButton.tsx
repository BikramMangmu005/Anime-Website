import { useState } from "react";
import { Plus } from "lucide-react";

import { addToMyList } from "../../api/My-List-Api";
import type { MyListStatus } from "../../types/My-list-Type";

interface AddToListButtonProps {
  animeId: number;
  status?: MyListStatus;
}

export default function AddToListButton({
  animeId,
  status = "watching",
}: AddToListButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToList = async () => {
    try {
      setIsLoading(true);

      console.log("ADDING ANIME ID:", animeId);

      const result = await addToMyList({
        animeId,
        status,
      });

      console.log("Anime added successfully:", result);

      setIsAdded(true);
    } catch (error) {
      console.error("Failed to add anime:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToList}
      disabled={isLoading || isAdded}
      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#1e222b] hover:bg-[#262a35] text-gray-200 font-medium border border-gray-700/60 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <Plus className="w-4 h-4" />

      {isLoading ? "Adding..." : isAdded ? "Added to List" : "Add to List"}
    </button>
  );
}
