export const OpinionSkeleton = () => (
   <div
      className={`
       flex gap-2 
       border md:gap-3 w-full p-3
       border-dark rounded-lg shadow-item-bolder
       animate-pulse
    `}
   >
      <div className="flex gap-3">
         <div
            className={`                 
             rounded-full w-[30px] h-[30px]
             object-cover bg-emerald-200 max-w-none
          `}
         ></div>
      </div>
      <div className="flex flex-col gap-[3px] flex-grow">
         <div className="p-2 bg-medium rounded-sm"></div>
         <div className="p-2 bg-medium rounded-sm"></div>
         <div className="p-2 bg-medium rounded-sm"></div>
         <div className="p-2 bg-medium rounded-sm"></div>
      </div>
   </div>
);
