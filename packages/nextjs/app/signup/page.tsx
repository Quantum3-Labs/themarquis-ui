"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/signup/verification");
  };

  return (
    <div className="font-monserrat">
      <div
        className="flex flex-col justify-center md:justify-start md:items-start pb-8 px-4 md:px-12 gap-4 h-screen md:h-screen pt-24 md:pt-8"
        style={{
          backgroundImage: `url(/bg-transparent.svg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          justifyContent:"center"
        }}
      >
        <div className="text-4xl font-bold font-monserrat md:text-left">
          <span>WELCOME</span>
          <span className="text-[#00ECFF] text-gradient"> THE MARQUIS!</span>
        </div>
        <span className="text-[#CACACA] md:text-left">
          Use your credentials below and sign up to your account
        </span>
        <div className="bg-[#21262B] w-full md:w-[400px] h-[111px] flex flex-col p-4 gap-4 rounded-[8px]">
          <span>Email</span>
          <input
            type="text"
            placeholder="example@gmail.com"
            className="bg-transparent focus:outline-none"
          ></input>
        </div>
        <div className="bg-[#21262B] w-full md:w-[400px] h-[111px] flex flex-col p-4 gap-4 rounded-[8px]">
          <span>Referral Code</span>
          <input
            type="text"
            placeholder="12DE45KK"
            className="bg-transparent focus:outline-none"
          ></input>
        </div>

        <div className="flex flex-col justify-start md:text-left">
          <span>
            Already have an account?
            <Link href="/login" className="text-[#00ECFF]">
              {" "}
              Login here.
            </Link>
          </span>
          <div className="flex gap-4 md:justify-start">
            <input type="checkbox"></input>
            <span>Remember me</span>
          </div>
        </div>
        <button
          className="shadow-button w-[260px] py-4 px-7 mt-4"
          onClick={handleClick}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}

export default Page;
