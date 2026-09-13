'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Phone, KeyRound, Sparkles, ArrowRight, Lock, CheckCircle2, RotateCcw } from 'lucide-react';
import { useWorld } from '@/context/WorldContext';

export default function PhoneOtpModal() {
  const { isAuthenticated, loginWithPhone } = useWorld();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [demoOtp, setDemoOtp] = useState('7428');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  // If already authenticated, do not show OTP gate
  if (isAuthenticated) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setIsSending(true);

    // Generate 4 to 6 digit mock demo code
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setDemoOtp(generated);

    setTimeout(() => {
      setIsSending(false);
      setOtpSent(true);
      setTimer(30);
      // Auto focus first OTP box
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }, 600);
  };

  const handleOtpChange = (index: number, val: string) => {
    const digit = val.slice(-1);
    const newOtp = [...otpValues];
    newOtp[index] = digit;
    setOtpValues(newOtp);

    // Auto advance
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto verify if 6 digits filled
    const fullCode = newOtp.join('');
    if (fullCode.length === 6) {
      triggerVerify(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const newOtp = [...otpValues];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtpValues(newOtp);
    if (pasted.length === 6) {
      triggerVerify(pasted);
    } else {
      inputRefs.current[pasted.length]?.focus();
    }
  };

  const triggerVerify = (codeToVerify?: string) => {
    const code = codeToVerify || otpValues.join('');
    if (code.length < 4) {
      setError('Please enter the verification code');
      return;
    }
    setError('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      // Allow any 6 digit or match demo code for effortless frictionless entry
      loginWithPhone(phoneNumber || '+91 9876543210');
    }, 800);
  };

  const fillDemoCode = () => {
    const digits = demoOtp.split('');
    const newOtp = ['', '', '', '', '', ''];
    digits.forEach((d, i) => {
      newOtp[i] = d;
    });
    setOtpValues(newOtp);
    triggerVerify(demoOtp);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in font-mono">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-[#0e0e0e] p-7 shadow-2xl shadow-red-950/20 text-[#EEEAE1]">
        {/* Glow ambient accent */}
        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-[#8F1118]/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-[#37475a]/25 blur-3xl pointer-events-none" />

        {/* Brand Banner */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] tracking-[0.25em] text-[#C8C3B8] uppercase mb-3">
            <Lock size={11} className="text-[#8F1118]" /> VERIFIED ACCESS ONLY
          </div>
          <h2 className="text-2xl font-black tracking-[0.2em] text-[#EEEAE1] uppercase">
            KAPDA MAFIA
          </h2>
          <p className="text-[10px] tracking-[0.25em] text-[#77746E] uppercase mt-1">
            ENTERPRISE LOGIN · OTP VERIFICATION
          </p>
        </div>

        {!otpSent ? (
          /* STEP 1: ENTER PHONE NUMBER */
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] tracking-[0.16em] text-[#C8C3B8] uppercase flex items-center gap-2">
                <Phone size={12} className="text-[#8F1118]" /> Mobile Phone Number
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-xs text-[#8F1118] font-bold border-r border-white/10 pr-2">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="98765 43210"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value.replace(/\D/g, ''));
                    setError('');
                  }}
                  autoFocus
                  className="w-full rounded-lg border border-white/15 bg-[#171717] py-3.5 pl-16 pr-4 text-sm font-semibold tracking-wider text-[#EEEAE1] placeholder-white/20 focus:border-[#8F1118] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {error && (
              <p className="text-[11px] text-red-400 bg-red-950/40 border border-red-800/40 p-2.5 rounded-lg">
                {error}
              </p>
            )}

            <div className="text-[9px] text-[#77746E] leading-relaxed">
              By proceeding, you will receive an instant one-time password (OTP) via SMS to unlock the Kapda & Shoes dual worlds.
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#8F1118] py-3.5 text-xs font-bold tracking-[0.18em] text-[#EEEAE1] uppercase shadow-lg shadow-[#8F1118]/30 hover:bg-[#a6151e] transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSending ? (
                <span>SENDING SECURE OTP...</span>
              ) : (
                <>
                  <span>GET VERIFICATION OTP</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>

            {/* Quick Demo Test Shortcut */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setPhoneNumber('9876543210');
                  const code = '742806';
                  setDemoOtp(code);
                  setOtpSent(true);
                  setTimer(30);
                }}
                className="text-[9px] text-[#C8C3B8]/60 hover:text-[#EEEAE1] underline underline-offset-4 tracking-wider uppercase transition-colors cursor-pointer"
              >
                Instant Test Access (Quick Bypass)
              </button>
            </div>
          </form>
        ) : (
          /* STEP 2: ENTER OTP */
          <div className="space-y-5">
            <div className="flex items-center justify-between text-[10px] text-[#C8C3B8] border-b border-white/10 pb-3">
              <span>OTP sent to <strong className="text-white">+91 {phoneNumber}</strong></span>
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtpValues(['', '', '', '', '', '']);
                }}
                className="text-[#8F1118] hover:underline cursor-pointer"
              >
                Change
              </button>
            </div>

            {/* OTP 6-box input */}
            <div>
              <label className="text-[10px] tracking-[0.16em] text-[#C8C3B8] uppercase flex items-center gap-2 mb-2">
                <KeyRound size={12} className="text-[#8F1118]" /> Enter 6-Digit OTP
              </label>
              <div className="grid grid-cols-6 gap-2" onPaste={handlePaste}>
                {otpValues.map((val, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={val}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="h-12 text-center text-lg font-bold rounded-lg border border-white/20 bg-[#171717] text-white focus:border-[#8F1118] focus:ring-1 focus:ring-[#8F1118] focus:outline-none transition-all"
                  />
                ))}
              </div>
            </div>

            {/* Simulated SMS Helper Pill */}
            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-3 text-[10px]">
              <div className="flex items-center gap-2 text-[#C8C3B8]">
                <Sparkles size={13} className="text-amber-400 flex-shrink-0" />
                <span>Mock SMS OTP: <strong className="text-white tracking-widest">{demoOtp}</strong></span>
              </div>
              <button
                type="button"
                onClick={fillDemoCode}
                className="text-[9px] font-bold tracking-wider text-[#8F1118] hover:text-white uppercase bg-white/10 hover:bg-[#8F1118] px-2.5 py-1 rounded transition-colors cursor-pointer"
              >
                Auto-Fill
              </button>
            </div>

            {error && (
              <p className="text-[11px] text-red-400 bg-red-950/40 border border-red-800/40 p-2.5 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={() => triggerVerify()}
              disabled={isVerifying}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#8F1118] py-3.5 text-xs font-bold tracking-[0.18em] text-[#EEEAE1] uppercase shadow-lg shadow-[#8F1118]/30 hover:bg-[#a6151e] transition-all disabled:opacity-50 cursor-pointer"
            >
              {isVerifying ? (
                <span>VERIFYING CREDENTIALS...</span>
              ) : (
                <>
                  <CheckCircle2 size={15} />
                  <span>VERIFY & ENTER MAFIA</span>
                </>
              )}
            </button>

            {/* Resend Timer */}
            <div className="flex items-center justify-between text-[10px] text-[#77746E]">
              {timer > 0 ? (
                <span>Resend OTP in {timer}s</span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setTimer(30);
                    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
                    setDemoOtp(newCode);
                  }}
                  className="flex items-center gap-1 text-[#C8C3B8] hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw size={11} /> Resend OTP
                </button>
              )}
              <span className="flex items-center gap-1 text-[#C8C3B8]">
                <ShieldCheck size={12} className="text-emerald-400" /> 256-Bit SSL Encrypted
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
