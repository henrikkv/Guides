import Image from 'next/image';
import Link from 'next/link';

interface CourseHeaderProps {
  centerImageSrc: string;
  centerImageAlt: string;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ centerImageSrc, centerImageAlt }) => {
  return (
    <header className="h-[68px] bg-white flex items-center justify-between px-4 absolute top-0 left-0 right-0">
      <Link href="/" className="cursor-pointer">
        <Image
          src="/back-button-icon.svg"
          alt="Back to Home"
          width={24}
          height={24}
        />
      </Link>
      <Image
        src={centerImageSrc}
        alt={centerImageAlt}
        width={62}  // Adjust based on your image size
        height={62}  // Adjust based on your image size
        className="mx-auto flex items-center justify-center absolute inset-0"
      />
      <div className="w-24" /> {/* Placeholder to balance the layout */}
    </header>
  );
};

export default CourseHeader;