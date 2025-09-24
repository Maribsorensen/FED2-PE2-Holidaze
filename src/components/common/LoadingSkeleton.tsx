import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletonBaseProps {
  height?: number | string;
  width?: number | string;
  className?: string;
  borderRadius?: number | string;
  style?: React.CSSProperties;
}

export const SkeletonBase: React.FC<SkeletonBaseProps> = ({
  height,
  width,
  className,
  borderRadius,
  style,
}) => {
  return (
    <Skeleton
      height={height}
      width={width}
      className={className}
      borderRadius={borderRadius}
      style={style}
    />
  );
};

export const SkeletonCard = () => (
  <li className="relative rounded-md overflow-hidden shadow-lg">
    <SkeletonBase height={256} width="100%" borderRadius={8} />

    <div className="absolute top-2 left-2">
      <SkeletonBase height={20} width={40} borderRadius={4} />
    </div>

    <div className="absolute bottom-0 w-full bg-black/15 py-2 px-3 h-1/3">
      <SkeletonBase height={20} width="70%" style={{ marginBottom: 6 }} />
      <SkeletonBase height={14} width="50%" />
    </div>

    <div className="absolute top-2 right-2 flex gap-2">
      <SkeletonBase height={20} width={40} borderRadius={4} />
      <SkeletonBase height={20} width={40} borderRadius={4} />
    </div>
  </li>
);

export const SkeletonCardGrid = ({ count = 8 }) => (
  <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2">
    {Array.from({ length: count }).map((_, idx) => (
      <SkeletonCard key={idx} />
    ))}
  </ul>
);

export const SkeletonProfile: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mx-auto mt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-center md:gap-6 mb-8">
        <div className="flex flex-col items-center text-center sm:text-left">
          <SkeletonBase height={128} width={128} borderRadius="50%" />
          <div className="mt-4">
            <SkeletonBase height={32} width={120} borderRadius={8} />
          </div>
        </div>

        <div className="mt-6 sm:mt-0 flex-1">
          <ul className="space-y-2">
            <li>
              <SkeletonBase height={20} width={160} borderRadius={4} />
            </li>
            <li>
              <SkeletonBase height={20} width={200} borderRadius={4} />
            </li>
          </ul>
        </div>
      </div>

      <div className="flex border-b border-gray-200 mb-6 gap-4">
        <SkeletonBase height={32} width={120} borderRadius={4} />
        <SkeletonBase height={32} width={120} borderRadius={4} />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <SkeletonBase key={idx} height={80} width="100%" borderRadius={8} />
        ))}
      </div>
    </div>
  );
};

export const SkeletonVenuePage: React.FC = () => {
  const baseColor = '#cbd5e1';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SkeletonBase
        height={48}
        width="60%"
        className="mx-auto mb-8"
        borderRadius={8}
        style={{ backgroundColor: baseColor }}
      />

      <SkeletonBase
        height={400}
        width="100%"
        borderRadius={8}
        style={{ backgroundColor: baseColor }}
      />

      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 mt-10">
        <div className="space-y-4">
          <SkeletonBase
            height={32}
            width="40%"
            borderRadius={6}
            style={{ backgroundColor: baseColor }}
          />
          <SkeletonBase
            height={20}
            width="100%"
            borderRadius={4}
            style={{ backgroundColor: baseColor }}
          />
          <SkeletonBase
            height={20}
            width="100%"
            borderRadius={4}
            style={{ backgroundColor: baseColor }}
          />
          <SkeletonBase
            height={20}
            width="90%"
            borderRadius={4}
            style={{ backgroundColor: baseColor }}
          />
        </div>

        <div className="space-y-2">
          <SkeletonBase
            height={32}
            width="60%"
            borderRadius={6}
            style={{ backgroundColor: baseColor }}
          />
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonBase
              key={idx}
              height={24}
              width="100%"
              borderRadius={4}
              style={{ backgroundColor: baseColor }}
            />
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <SkeletonBase
          height={48}
          width="50%"
          borderRadius={8}
          style={{ backgroundColor: baseColor }}
        />
        {Array.from({ length: 3 }).map((_, idx) => (
          <SkeletonBase
            key={idx}
            height={60}
            width="100%"
            borderRadius={8}
            style={{ backgroundColor: baseColor }}
          />
        ))}
      </div>
    </div>
  );
};
