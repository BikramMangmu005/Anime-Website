import { useState } from "react";
import { Play, X } from "lucide-react";

import { deleteMyList, updateMyList } from "../../api/My-List-Api";

import type { MyListItem, MyListStatus } from "../../types/My-list-Type";

interface MyListCardProps {
  item: MyListItem;
  onDelete: (id: number) => void;
  onUpdate: (updatedItem: MyListItem) => void;
}

export default function MyListCard({
  item,
  onDelete,
  onUpdate,
}: MyListCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  // DELETE
  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await deleteMyList(item.id);

      onDelete(item.id);
    } catch (error) {
      console.error("Failed to remove anime:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // UPDATE STATUS
  const handleStatusChange = async (newStatus: MyListStatus) => {
    try {
      setIsUpdating(true);

      const updatedItem = await updateMyList(item.id, {
        status: newStatus,
      });

      onUpdate({
        ...item,
        ...updatedItem,
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-[#161421] border border-gray-800/80 rounded-2xl p-3.5 flex gap-4 shadow-xl hover:border-purple-500/40 transition-all group">
      {/* Cover */}
      <img
        src={
          item.anime.image
            ? `http://localhost:5000${item.anime.image}`
            : "/placeholder.jpg"
        }
        alt={item.anime.title}
        className="w-20 h-28 object-cover rounded-xl shadow-md flex-shrink-0"
      />

      {/* Details */}
      <div className="flex flex-col justify-between flex-grow py-0.5">
        <div>
          <h3 className="font-bold text-white text-base group-hover:text-purple-300 transition-colors">
            {item.anime.title}
          </h3>

          {/* Status */}
          <div className="flex items-center gap-2 mt-2">
            <Play className="w-3.5 h-3.5 text-teal-400 fill-current" />

            <select
              value={item.status}
              disabled={isUpdating}
              onChange={(e) =>
                handleStatusChange(e.target.value as MyListStatus)
              }
              className="bg-transparent text-teal-400 text-xs font-medium outline-none cursor-pointer"
            >
              <option value="watching" className="bg-[#161421]">
                Watching
              </option>

              <option value="completed" className="bg-[#161421]">
                Completed
              </option>

              <option value="on-hold" className="bg-[#161421]">
                On Hold
              </option>

              <option value="dropped" className="bg-[#161421]">
                Dropped
              </option>

              <option value="plan-to-watch" className="bg-[#161421]">
                Plan to Watch
              </option>
            </select>
          </div>

          <p className="text-gray-400 text-xs mt-1.5">
            {item.episodesWatched} eps
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 mt-3">
          <button className="bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 border border-purple-800/40 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors">
            <Play className="w-3 h-3 fill-current" />
            Watch
          </button>

          <button className="bg-purple-600 hover:bg-purple-500 text-white p-1 rounded-lg transition-colors shadow-sm">
            <Play className="w-3.5 h-3.5 fill-current" />
          </button>

          {/* Remove */}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-950/40 hover:bg-red-900/50 text-red-400 border border-red-900/30 px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ml-auto disabled:opacity-50"
          >
            <X className="w-3.5 h-3.5" />

            {isDeleting ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}
