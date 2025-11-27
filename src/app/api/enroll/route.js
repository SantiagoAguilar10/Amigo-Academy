import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Course from '@/models/Course';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await connectDB();
    
    const { courseId } = await req.json();
    
    const user = await User.findOne({ email: session.user.email });
    const course = await Course.findById(courseId);
    
    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }
    
    const alreadyEnrolled = user.enrolledCourses.some(
      ec => ec.courseId.toString() === courseId
    );
    
    if (alreadyEnrolled) {
      return NextResponse.json(
        { success: false, error: 'Already enrolled' },
        { status: 400 }
      );
    }
    
    user.enrolledCourses.push({
      courseId,
      progress: 0,
      completedLessons: [],
    });
    
    course.enrollmentCount += 1;
    
    await user.save();
    await course.save();
    
    return NextResponse.json({ success: true, message: 'Enrolled successfully' });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}