import { Model, DataTypes } from "sequelize";

import type {
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
} from "sequelize";

import sequelize from "../connections/databaseAuth";


class MyList extends Model<
    InferAttributes<MyList>,
    InferCreationAttributes<MyList>
> {
    declare id: CreationOptional<number>;

    declare userId: ForeignKey<number>;
    declare animeId: ForeignKey<number>;

    declare status: CreationOptional<
        "watching" | "completed" | "on-hold" | "dropped" | "plan-to-watch"
    >;

    declare episodesWatched: CreationOptional<number>;
    declare rating: number | null;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

MyList.init(    
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },

        animeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "animes",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },

        status: {
            type: DataTypes.ENUM(
                "watching",
                "completed",
                "on-hold",
                "dropped",
                "plan-to-watch"
            ),
            allowNull: false,
            defaultValue: "watching",
        },

        episodesWatched: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },

        rating: {
            type: DataTypes.FLOAT,
            allowNull: true,
            validate: {
                min: 0,
                max: 10,
            },
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "my_lists",
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["userId", "animeId"],
            },
        ],
    }
);

export default MyList;

