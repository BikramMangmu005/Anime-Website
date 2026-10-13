import { useState, useEffect } from "react";

import { getMyList } from "../api/My-List-Api";
import type { MyListItem } from "../types/My-list-Type";
import MyListCard from "../components/My-LIst/My-List-Card";

import {
  Bookmark,
  History,
  BarChart2,
  RefreshCw,
  X,
  ArrowUpDown,
} from "lucide-react";

export default function MyLists() {
  const [showAlert, setShowAlert] = useState(true);

  const [activeTab, setActiveTab] = useState("list");

  const [activeSort, setActiveSort] = useState("last-updated");

  const [activeFilter, setActiveFilter] = useState("all");

  const [myList, setMyList] = useState<MyListItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  // Fetch My List
  useEffect(() => {
    const fetchMyList = async () => {
      try {
        const data = await getMyList();

        setMyList(data);
      } catch (error) {
        console.error("Failed to fetch My List:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyList();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0e17] text-gray-200 p-6 font-sans">
      {/* Sync Banner */}

      {showAlert && (
        <div className="bg-[#181624] border border-purple-900/40 rounded-xl p-4 mb-6 mt-20 flex items-center justify-between text-sm shadow-lg">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-4 h-4 text-purple-400 animate-spin-slow" />

            <div>
              <span className="font-semibold text-white">
                Want your list on every device?
              </span>{" "}
              <span className="text-gray-400">
                Connect AniList and your list syncs everywhere automatically.
              </span>{" "}
              <a
                href="#connect"
                className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center gap-1"
              >
                Connect now →
              </a>
            </div>
          </div>

          <button
            onClick={() => setShowAlert(false)}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Tabs */}

      <div className="flex items-center gap-6 border-b border-gray-800/60 pb-3 mb-6 text-sm">
        <button
          onClick={() => setActiveTab("list")}
          className={`flex items-center gap-2 pb-3 -mb-3 border-b-2 font-medium transition-colors ${
            activeTab === "list"
              ? "border-purple-500 text-white"
              : "border-transparent text-gray-400 hover:text-gray-200"
          }`}
        >
          <Bookmark className="w-4 h-4" />
          My List
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`flex items-center gap-2 pb-3 -mb-3 border-b-2 font-medium transition-colors ${
            activeTab === "history"
              ? "border-purple-500 text-white"
              : "border-transparent text-gray-400 hover:text-gray-200"
          }`}
        >
          <History className="w-4 h-4" />
          Watch History
        </button>

        <button
          onClick={() => setActiveTab("stats")}
          className={`flex items-center gap-2 pb-3 -mb-3 border-b-2 font-medium transition-colors ${
            activeTab === "stats"
              ? "border-purple-500 text-white"
              : "border-transparent text-gray-400 hover:text-gray-200"
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          Stats
        </button>
      </div>

      {/* Sorting */}

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <ArrowUpDown className="w-4 h-4 text-gray-400 mr-1" />

          {[
            {
              id: "last-updated",
              label: "Last Updated",
            },
            {
              id: "a-z",
              label: "A–Z",
            },
            {
              id: "my-rating",
              label: "My Rating",
            },
            {
              id: "date-added",
              label: "Date Added",
            },
          ].map((sort) => (
            <button
              key={sort.id}
              onClick={() => setActiveSort(sort.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeSort === sort.id
                  ? "bg-transparent border border-purple-500 text-white shadow-sm"
                  : "bg-[#181624] text-gray-400 hover:text-gray-200 border border-transparent"
              }`}
            >
              {sort.label}
            </button>
          ))}
        </div>
      </div>

      {/* Status Filters */}

      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
            activeFilter === "all"
              ? "bg-purple-600 text-white shadow-md shadow-purple-900/30"
              : "bg-[#181624] text-gray-400 hover:text-gray-200 border border-gray-800/40"
          }`}
        >
          All ({myList.length})
        </button>

        <button
          onClick={() => setActiveFilter("watching")}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
            activeFilter === "watching"
              ? "bg-purple-600 text-white shadow-md shadow-purple-900/30"
              : "bg-[#181624] text-gray-400 hover:text-gray-200 border border-gray-800/40"
          }`}
        >
          Watching ({myList.filter((item) => item.status === "watching").length}
          )
        </button>
      </div>

      {/* Anime Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <p className="text-gray-400">Loading your list...</p>
        ) : myList.length === 0 ? (
          <p className="text-gray-400">Your list is empty.</p>
        ) : (
          myList
            .filter((item) =>
              activeFilter === "all" ? true : item.status === activeFilter,
            )
            .map((item) => (
              <MyListCard
                key={item.id}
                item={item}
                onDelete={(id) => {
                  setMyList((currentList) =>
                    currentList.filter((item) => item.id !== id),
                  );
                }}
                onUpdate={(updatedItem) => {
                  setMyList((currentList) =>
                    currentList.map((item) =>
                      item.id === updatedItem.id ? updatedItem : item,
                    ),
                  );
                }}
              />
            ))
        )}
      </div>
    </div>
  );
}
