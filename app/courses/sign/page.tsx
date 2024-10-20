import CourseHeader from '@/components/CourseHeader';
import VerticalProgressBar from '@/components/VerticalProgressBar';
import SvgList from '@/components/SvgList';

export default function SignCoursePage() {
  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <CourseHeader 
        centerImageSrc="/signheaderimage.svg"  // Replace with your actual image path
        centerImageAlt="Sign Course Logo"
      />
      <div className="flex flex-1">
        <div className="w-16">
          <VerticalProgressBar />
        </div>
        <div className="flex-grow">
          {/* Add your main course content here */}
        </div>
        <div className="w-[353px]">
          <SvgList />
        </div>
      </div>
    </div>
  );
}