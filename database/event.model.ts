import { Schema, model, models, Document } from "mongoose";

// TypeScript interface for Event document
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    overview: {
      type: String,
      required: [true, "Overview is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    mode: {
      type: String,
      required: [true, "Mode is required"],
      enum: ["online", "offline", "hybrid"],
    },
    audience: {
      type: String,
      required: [true, "Audience is required"],
    },
    agenda: {
      type: [String],
      required: [true, "Agenda is required"],
      validate: {
        validator: (v: string[]) => v && v.length > 0,
        message: "Agenda must contain at least one item",
      },
    },
    organizer: {
      type: String,
      required: [true, "Organizer is required"],
    },
    tags: {
      type: [String],
      required: [true, "Tags are required"],
      validate: {
        validator: (v: string[]) => v && v.length > 0,
        message: "Tags must contain at least one item",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook: Generate slug from title and validate date/time
EventSchema.pre("save", function (next) {
  // Generate slug only if title is modified or document is new
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
  }

  // Validate and normalize date to ISO format (YYYY-MM-DD)
  if (this.isModified("date")) {
    const dateObj = new Date(this.date);
    if (isNaN(dateObj.getTime())) {
      return next(new Error("Invalid date format"));
    }
    this.date = dateObj.toISOString().split("T")[0]; // Store as YYYY-MM-DD
  }

  // Normalize time format (HH:MM)
  if (this.isModified("time")) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(this.time)) {
      return next(new Error("Time must be in HH:MM format"));
    }
  }

  next();
});

// Create unique index on slug
EventSchema.index({ slug: 1 }, { unique: true });

const Event = models.Event || model<IEvent>("Event", EventSchema);

export default Event;
