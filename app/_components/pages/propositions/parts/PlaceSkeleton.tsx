export const PlaceSkeleton = () => (
   <div
      className={`
            animate-pulse
            flex flex-col md:flex-row border  
            max-w-[450px] md:max-w-fit md:gap-3
            border-dark shadow-item rounded-lg 
            md:min-w-[-webkit-fill-available] p-3
         `}
   >
      <div
         className={`
               sm:mb-2 sm:mt-4 my-0 mx-auto 
               w-[280px] h-[180px] sm:w-[300px] sm:h-[200px] md:w-[200px] md:h-full md:m-0
               rounded-lg bg-medium 
            `}
      ></div>
      <div className="flex flex-col justify-between flex-grow md:w-[70%]">
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
