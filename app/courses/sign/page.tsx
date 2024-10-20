import CourseHeader from '@/components/CourseHeader';
import VerticalProgressBar from '@/components/VerticalProgressBar';
import SvgList from '@/components/SvgList';

const svgs = [
  { src: '/intro-to-sign-card.svg' },
  { src: '/attestations-card.svg', link: '/courses/sign/lesson' },
  { src: '/schema-card.svg' },
  { src: '/schema-registry-card.svg' },
  { src: '/repository-card.svg' },
];

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
        <div className="w-full">
          <SvgList svgs={svgs} />
        </div>
      </div>
    </div>
  );
}