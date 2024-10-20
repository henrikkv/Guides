import Image from 'next/image';
import Link from 'next/link';

const SvgList = () => {
  const svgs = [
    { src: '/intro-to-sign-card.svg' },
    { src: '/attestations-card.svg', link: '/courses/sign/lesson' },
    { src: '/schema-card.svg' },
    { src: '/schema-registry-card.svg'},
    { src: '/repository-card.svg' },
  ];

  return (
    <div className="h-full w-full flex flex-col bg-white mt-[68px] items-center justify-center">
  {svgs.map(({ src, link }, index) => (
        <div key={index} className="flex flex-col items-center mb-4">
          {link ? (
            <Link href={link}>
              <Image
                src={src}
                alt={"label"}
                width={333}
                height={219}
                className="w-[333px] h-[219px]"
              />
            </Link>
          ) : (
            <Image
              src={src}
              alt={"label"}
              width={333}
              height={219}
              className="w-[333px] h-[219px]"
            />
          )}
          <span className="text-xs mt-1">{"label"}</span>
        </div>
      ))}
    </div>
  );
};

export default SvgList;