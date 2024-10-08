import Image from "next/image";
import QRCode from "qrcode";
import { useCallback, useEffect, useRef } from "react";
import useGetUserInfo from "~~/utils/api/hooks/useGetUserInfo";
import { makePrivateEmail } from "~~/utils/ConvertData";
import { notification } from "~~/utils/scaffold-stark";

export default function TwitterInvitePost() {
  const { data }: any = useGetUserInfo();
  const imageRef = useRef<HTMLImageElement | null>(null);
  const baseUrl = window.location.origin;
  const codeInvitation = `${baseUrl}/signup${data?.code ? `?referralcode=${data?.code}` : ""}`;

  const copyToClipboard = (text: string) => {
    if (text) {
      navigator.clipboard.writeText(text).then(
        () => {
          notification.success("Coppied successfully");
        },
        (err) => {
          console.error("Failed to copy: ", err);
        },
      );
    }
  };

  const generateQRCode = useCallback(async () => {
    try {
      const qrCodeDataURL = await QRCode.toDataURL(codeInvitation);
      if (imageRef.current) {
        imageRef.current.src = qrCodeDataURL;
      }
    } catch (err) {
      console.error("Failed to generate QR code:", err);
    }
  }, [codeInvitation]);

  useEffect(() => {
    if (codeInvitation) {
      generateQRCode();
    }
  }, [codeInvitation, generateQRCode]);

  return (
    <div className="h-screen-minus-80 ">
      <Image
        onClick={() => (window.location.href = "/")}
        src={"/logo-marquis.svg"}
        width={303}
        height={83}
        className="my-14 ml-12 cursor-pointer"
        alt="logo"
      />
      <div className="flex justify-center items-center ">
        <div className="w-full px-6 max-w-[1000px]">
          <div className="flex justify-between items-center flex-wrap">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-7">
                <Image
                  src={"/avatar_twitter_post.svg"}
                  width={46}
                  height={46}
                  className="rounded-full"
                  alt="avatar"
                />
                <p className="text-2xl">
                  {makePrivateEmail(data?.user?.email)}
                </p>
              </div>
              <p className="font-bold sm:text-[24px] text-[20px]">
                Has Invited You To Sign Up On
              </p>
              <span className="text-gradient font-bold sm:text-[48px] text-[32px]">
                THE MARQUIS !
              </span>
              <div>
                <p
                  className="text-xl text-center text-gradient mb-5 mt-10"
                  style={{ fontWeight: 400 }}
                >
                  Available On
                </p>
                <div className="flex gap-5">
                  <Image
                    src="/appStore.svg"
                    width={100}
                    height={100}
                    className="h-[38px] w-auto"
                    alt="appstore"
                  />
                  <Image
                    src="/google.svg"
                    width={100}
                    height={100}
                    className="h-[38px] w-auto"
                    alt="googleplay"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center w-full sm:w-auto sm:mt-0 mt-4">
              <div className="mb-4">
                <p className="text-[#F3F3F3] text-[20px] text-center">
                  Referral Code
                </p>
                <div className="bg-[#363D43] w-[264px] h-[60px] flex items-center justify-between p-3 rounded-[15px]">
                  <p className="text-[24px]">{data?.code}</p>
                  <Image
                    src="/copy.svg"
                    alt="copy"
                    width={100}
                    height={100}
                    onClick={() => copyToClipboard(codeInvitation)}
                    style={{ cursor: "pointer", width: "15px", height: "15px" }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <hr className="h-[1px] w-[30px] bg-[#919191]" />
                <p className="text-[#919191] text-[20px] ">
                  Or Scan to Sign Up
                </p>
                <hr className="h-[1px] w-[30px] bg-[#919191]" />
              </div>
              <p className="text-[20px] text-center">QR Code</p>
              <Image
                src={""}
                alt="qr_code"
                width={100}
                height={100}
                className="sm:w-[200px] sm:h-[200px] w-[100px] h-[100px]"
                ref={imageRef}
              />
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs font-bold text-center mt-[100px]">
        THE MARQUIS. © 2024. All rights reserved. By using out website you
        consent to all cookies in accordance with out{" "}
        <span className="text-gradient">Terms and Privacy Policy</span>
      </p>
    </div>
  );
}
