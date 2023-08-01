const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center  max-sm:w-screen max-[1024px]:w-full max-[1560px]:w-full max-[2560px]:w-[70%] max-[3440px]:w-2/5">
      {children}
    </div>
  );
};

export default Container;
