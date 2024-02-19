interface ContainerProps {
   children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
   return (
      <div className="container px-0 sm:px-4 mx-auto max-w-screen-wide">
         {children}
      </div>
   );
};
