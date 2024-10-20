import Image from 'next/image';

const VerticalProgressBar = () => {
  return (
    <div className="h-full flex bg-white mt-[90px] items-center justify-center">
      <Image
        src="/progress-bar.svg"
        alt="Vertical Progress Bar"
        width={8}  // Adjust this value based on your SVG's width
        height={600}  // Adjust this value based on your SVG's height
        className="h-4/5 w-auto"
      />
    </div>
  );
};

export default VerticalProgressBar;
