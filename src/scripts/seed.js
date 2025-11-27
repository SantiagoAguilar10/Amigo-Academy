const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const Course = require('../models/Course');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const courses = [
      {
        title: 'Cálculo Diferencial',
        description: 'Aprende los fundamentos del cálculo diferencial desde cero',
        category: 'Matemáticas',
        isPublished: true,
        lessons: [
          {
            title: 'Introducción a Límites',
            type: 'video',
            content: { videoUrl: 'https://youtube.com/watch?v=example' },
            order: 1,
          },
          {
            title: 'Derivadas Básicas',
            type: 'video',
            content: { videoUrl: 'https://youtube.com/watch?v=example' },
            order: 2,
          },
        ],
      },
      {
        title: 'Python para Principiantes',
        description: 'Domina la programación en Python paso a paso',
        category: 'Programación',
        isPublished: true,
        lessons: [
          {
            title: 'Variables y Tipos de Datos',
            type: 'video',
            content: { videoUrl: 'https://youtube.com/watch?v=example' },
            order: 1,
          },
        ],
      },
    ];

    await Course.insertMany(courses);
    console.log('Courses seeded successfully');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding:', error);
    process.exit(1);
  }
}

seed();