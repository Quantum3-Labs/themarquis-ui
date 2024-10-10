"use client";
import OTPInput from "~~/components/verification";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useVerification from "~~/utils/api/hooks/useVerification";
import { useQueryClient } from "@tanstack/react-query";
import useResend from "~~/utils/api/hooks/useResend";
import { makePrivateEmail } from "~~/utils/ConvertData";
import { notification } from "~~/utils/scaffold-stark/notification";
import { setCookie } from "cookies-next";
import BackgroundGradient from "~~/components/BackgroundGradient";
import VerificationFailure from "~~/components/Modal/VerificationFailure";

function Page() {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [otpCode, setOtpCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(() => {
    const storedValue = parseFloat(
      localStorage.getItem("signupCountdown") || "",
    );

    if (isNaN(storedValue)) {
      return 15;
    }

    if (storedValue === 0) {
      return 0;
    }

    return storedValue > 0 ? storedValue : 15;
  });
  const [resendDisabled, setResendDisabled] = useState<boolean>(true);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const router = useRouter();

  const queryClient = useQueryClient();
  const email = queryClient.getQueryData<string>(["userEmail"]);

  const handleOtpComplete = async (otp: string): Promise<void> => {
    setOtpCode(otp);
    handleVerification(otp);
  };

  const handleVerificationSuccess = (data: any) => {
    queryClient.setQueryData(["accessToken"], data.data.access_token);
    setCookie("accessToken", data.data.access_token);
    queryClient.invalidateQueries({ refetchType: "active" });
    setLoading(false);
    router.push("/signup/welcome");
    localStorage.setItem("signupCountdown", "15");
  };

  const handleVerificationFailed = (error: any) => {
    setLoading(false);
    setErrorModal(true);
    notification.error(error.response.data.message);
    setOtpCode("");
  };

  const handleResendSuccess = (data: any) => {
    console.log("success", data);
    setOtpCode("");
    setResendDisabled(true);
    localStorage.setItem("signupCountdown", "15");
  };

  const handleResendFailed = (error: any) => {
    notification.error(error.response.data.message);
  };

  const { mutate: verification } = useVerification(
    handleVerificationSuccess,
    handleVerificationFailed,
  );

  const { mutate: resend } = useResend(handleResendSuccess, handleResendFailed);

  const handleVerification = async (otp: string) => {
    setLoading(true);
    verification({
      email: email ?? "",
      code: otp ?? otpCode,
    });
  };

  const handleResend = () => {
    resend({
      email: email ?? "",
    });
    setOtp(["", "", "", ""]);
  };

  useEffect(() => {
    if (countdown < 15) {
      localStorage.setItem("signupCountdown", countdown.toString());
    }
    if (countdown == 0) {
      setResendDisabled(false);
    }
  }, [countdown]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="font-monserrat">
      <div className="flex flex-col sm:p-12 p-4 pt-12 gap-4">
        <div className="flex flex-col max-w-[1700px] relative z-50 mx-auto w-full h-full gap-[100px]">
          <div>
            <div className="sm:text-4xl font-medium text-[16px]">
              <span>WELCOME TO </span>
              <span className="text-gradient"> THE MARQUIS !</span>
            </div>
            <span className="text-[#CACACA] sm:text-[20px] text-[14px]">
              Verification code has been sent to your email{" "}
              <span>{makePrivateEmail(email ?? "")}</span>
            </span>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-end flex-wrap gap-10">
              <OTPInput
                onOtpComplete={handleOtpComplete}
                otp={otp}
                setOtp={setOtp}
              />
              <button
                className={`text-[#00ECFF] w-[200px] cursor-pointer mb-7 ${
                  resendDisabled ? "cursor-auto text-[#C1C1C1]" : ""
                }`}
                onClick={handleResend}
                disabled={resendDisabled}
              >
                {resendDisabled ? `Resend in ${countdown}s` : "Resend"}
              </button>
            </div>
          </div>
          <div className="button-flow-login mt-[100px]">
            <button
              className="shadow-button w-[245px] h-[55px] font-arcade text-shadow-deposit text-2xl"
              onClick={() => handleVerification(otpCode)}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign up"}
            </button>
          </div>
        </div>
        <BackgroundGradient />
      </div>
      <VerificationFailure
        isOpen={errorModal}
        onClose={() => setErrorModal(false)}
      />
    </div>
  );
}

export default Page;
