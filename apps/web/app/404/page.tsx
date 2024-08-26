export default function NotFoundPage() {
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-[#4d4f53] ">
        <div className="flex-col items-baseline justify-center">
          <div className="w-full flex justify-center">
            <span className="relative inline-block before:block before:absolute before:w-[7vw] before:h-[7vw] before:-inset-1 before:top-[10%] before:rounded-t-[60px] before:left-[42.5%] before:border-[1.25vw] before:border-[#fefbf4]">
              <span className="relative font-black text-[20vw] text-[#fefbf4]">
                404
              </span>
            </span>
          </div>
          <div className="w-full flex justify-center">
            <p className=" font-black text-[5vw] text-[#fefbf4]">NOT FOUND</p>
          </div>
        </div>
      </div>
    </>
  );
}
