export const MapPlacesContainer = ({
   children,
}: {
   children: React.ReactNode;
}) => (
   <div
      className={`
       grid min-h-[500px] lg:grid-cols-[auto_500px] 
       hd:grid-cols-[auto_600px] wide:min-h-[600px]
       grid-cols-1 gap-[20px] mt-4 lg:gap-4 wide:gap-[40px] wide:grid-cols-[1fr_1fr] 
    `}
   >
      {children}
   </div>
);
