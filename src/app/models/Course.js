const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Course = Schema(
  {
    name: { type: String },
    description: { type: String },
    image: { type: String },
    videoId: { type: String },
    level: { type: String },
    slug: { type: String, slug: "name" },
    
    
  },
  {
    timestamps: true,
  }
);

mongoose.plugin(slug);
Course.plugin(mongooseDelete, { overrideMethods: "all", deletedAt: true });


module.exports = mongoose.model("Course", Course);
