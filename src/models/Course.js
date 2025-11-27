import mongoose from 'mongoose';

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  type: {
    type: String,
    enum: ['video', 'text', 'quiz'],
    required: true,
  },
  content: {
    videoUrl: String,
    textContent: String,
    embedCode: String,
  },
  duration: Number, // en minutos
  order: {
    type: Number,
    required: true,
  },
});

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: String,
  lessons: [LessonSchema],
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  enrollmentCount: {
    type: Number,
    default: 0,
  },
  resources: [{
    title: String,
    url: String,
    type: String,
  }],
}, {
  timestamps: true,
});

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);