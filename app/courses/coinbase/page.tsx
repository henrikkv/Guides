import CourseHeader from '@/components/CourseHeader';
import VerticalProgressBar from '@/components/VerticalProgressBar';
import SvgList from '@/components/SvgList';

const svgs = [
  { src: '/coinbase-card1.svg' },
  { src: '/coinbase-card2.svg', link: '/courses/coinbase/lesson-wallet' },
  { src: '/coinbase-card3.svg' },
  { src: '/coinbase-card4.svg' },
];

export default function CoinbaseCoursePage() {
  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <CourseHeader
        centerImageSrc="/coinbase-header.svg"
        centerImageAlt="Coinbase Course Logo"
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