export const PlaceSkeleton = () => (
   <div
      className={`
            animate-pulse
            flex flex-col md:flex-row border lg:max-desktop:flex-col
            md:max-w-fit md:gap-3 w-full max-w-[390px]
            border-dark rounded-lg 
            md:fill-available-width justify-self-center
         `}
   >
      <div
         className={`
         sm:mb-2 sm:mt-4 my-0 mx-auto 
         w-[264px] h-[180px] sm:w-[300px] sm:h-[200px] lg:max-h-[240px]
         md:w-[200px] md:m-0 lg:max-desktop:w-[276px] lg:max-desktop:h-[180px]
          bg-emerald-200 lg:max-desktop:m-auto lg:max-desktop:mt-4 
          rounded-b-none sm:rounded-b-lg rounded-lg md:rounded-[8px_0_0_8px]
            `}
      ></div>
      <div className="flex flex-col justify-between flex-grow p-2">
         <div className="p-2 m-2 bg-medium rounded-sm"></div>
         <div className="p-2 m-2 bg-medium rounded-sm"></div>
         <div className="flex gap-2">
            <div className="p-2 m-2 bg-medium rounded-lg w-14"></div>
            <div className="p-2 m-2 bg-medium rounded-lg w-14"></div>
            <div className="p-2 m-2 bg-medium rounded-lg w-14"></div>
            <div className="p-2 m-2 bg-medium rounded-lg w-14"></div>
         </div>
      </div>
   </div>
);
