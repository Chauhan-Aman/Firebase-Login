// import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from '../firebase/FirebaseConfig';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const Modal = () => {

    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth,
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {
                        onSignup();
                    },
                    "expired-callback": () => { },
                },
            );
        }
    }

    function onSignup() {
        setLoading(true);
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;

        const formatPh = "+" + ph;

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOTP(true);
                toast.success("OTP sended successfully!");
            })
            .catch((error) => {
                console.error("Error during sign-up:", error);
                setLoading(false);
            });
    }

    function onOTPVerify() {
        setLoading(true);
        if (window.confirmationResult) {
            window.confirmationResult
                .confirm(otp)
                .then(async (res) => {
                    console.log(res);
                    setUser(res.user);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error during OTP verification:", err);
                    setLoading(false);
                });
        } else {
            console.error("Confirmation result is not available.");
            setLoading(false);
        }
    }

    return (
        <section className="bg-emerald-500 flex items-center justify-center h-screen">
            <div className="modal--container">
                <div className="modal--inner-container">
                    <Toaster toastOptions={{ duration: 4000 }} />
                    <div id="recaptcha-container"></div>
                    {user ? (
                        <h2 className="text-center text-white font-medium text-2xl">
                            👍Login Success
                        </h2>
                    ) : (
                        <div className="w-80 flex flex-col gap-4 rounded-lg p-4">

                            {showOTP ? (
                                <>
                                    <p className="font-bold text-xl text-white text-center mb-1">Enter your OTP</p>
                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        OTPLength={6}
                                        otpType="number"
                                        disabled={false}
                                        autoFocus
                                        className="opt-container "
                                    ></OtpInput>
                                    <button
                                        onClick={onOTPVerify}
                                        className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded button-otp"
                                    >
                                        {loading && (
                                            // <CgSpinner size={20} className="mt-1 animate-spin" />
                                            ''
                                        )}
                                        <span>Verify OTP</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p className="font-bold text-xl text-white text-center mb-1">Verify your phone number</p>
                                    <PhoneInput country={"in"} value={ph} onChange={setPh} />
                                    <button
                                        onClick={onSignup}
                                        className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded button-otp"
                                    >
                                        {loading && (
                                            // <CgSpinner size={20} className="mt-1 animate-spin" />
                                            ''
                                        )}
                                        <span>Send code via SMS</span>
                                    </button>

                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Modal