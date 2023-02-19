import { ThreeDots } from 'react-loader-spinner';

export const LoaderIcon = () => {
  return (
    <div className="ButtonLoadMore">
      <ThreeDots
        color="#5e5e5e"
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
    </div>
  );
};
