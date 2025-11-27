import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await connectDB();
    
    const { courseId, lessonIndex, totalLessons } = await req.json();
    
    const user = await User.findOne({ email: session.user.email });
    
    const courseProgress = user.enrolledCourses.find(
      ec => ec.courseId.toString() === courseId
    );
    
    if (!courseProgress) {
      return NextResponse.json(
        { success: false, error: 'Not enrolled in this course' },
        { status: 400 }
      );
    }
    
    if (!courseProgress.completedLessons.includes(lessonIndex)) {
      courseProgress.completedLessons.push(lessonIndex);
    }
    
    courseProgress.progress = Math.round(
      (courseProgress.completedLessons.length / totalLessons) * 100
    );
    
    await user.save();
    
    return NextResponse.json({
      success: true,
      progress: courseProgress.progress,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}