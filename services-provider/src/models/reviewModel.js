import { Datatype } from "sequelize";
import sequelize from "../db/config.js";

const reviewModel = sequelize.define("Review", {
  id: {
    type: Datatype.UUID,
    defaultValue: Datatype.UUIDV4,
    primaryKey: false,
  },
  userId: {
    type: Datatype.UUID,
    allowNull: false,
  },
  serviceId: {
    type: Datatype.UUID,
    allowNull: false,
  },
  rating: {
    type: Datatype.UUID,
    allowNull: false,
  },
  comment: {
    type: Datatype.TEXT,
    allowNull: false,
  },
});

export default reviewModel;
