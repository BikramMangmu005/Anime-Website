import User from "./User.js";
import Anime from "./Anime.js";
import MyList from "./UserAnimeList.js";

// User → MyList
User.hasMany(MyList, {
  foreignKey: "userId",
  as: "myList",
});

// MyList → User
MyList.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Anime → MyList
Anime.hasMany(MyList, {
  foreignKey: "animeId",
  as: "myList",
});

// MyList → Anime
MyList.belongsTo(Anime, {
  foreignKey: "animeId",
  as: "anime",
});

export {
  User,
  Anime,
  MyList,
};


