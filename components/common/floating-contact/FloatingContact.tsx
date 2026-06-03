"use client";

import { useState } from "react";
import { MessageCircle, X, Send, CheckCircle } from "lucide-react";
import { useCreateContact } from "@/features/contact/hooks/contact.hook";

const EMPTY = { name: "", subject: "", email: "", phone: "" };

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const { mutate, isPending, isSuccess, isError, reset } = useCreateContact();

  function handleClose() {
    setOpen(false);
    setTimeout(() => {
      reset();
      setForm(EMPTY);
    }, 300);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate(form);
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="ติดต่อเรา"
        className="fixed bottom-20 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-brand to-brand-bright text-white shadow-lg shadow-brand/30 transition-all hover:scale-110 hover:shadow-brand-bright/40"
      >
        <MessageCircle className="h-5 w-5" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          onClick={handleClose}
        />
      )}

      {/* Modal */}
      {open && (
        <div className="fixed bottom-36 right-6 z-50 w-80 overflow-hidden rounded-2xl bg-white shadow-2xl shadow-brand/10 border border-slate-100">
          {/* Header */}
          <div className="flex items-center justify-between bg-linear-to-r from-brand to-brand-bright px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-white">ติดต่อเรา</p>
              <p className="text-xs text-white/70">กรอกข้อมูลแล้วเราจะติดต่อกลับ</p>
            </div>
            <button
              onClick={handleClose}
              className="rounded-full p-1 text-white/70 transition-colors hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Success state */}
          {isSuccess ? (
            <div className="flex flex-col items-center gap-3 px-5 py-10 text-center">
              <CheckCircle className="h-12 w-12 text-brand" />
              <p className="text-sm font-semibold text-brand-navy">ขอบคุณสำหรับการติดต่อ!</p>
              <p className="text-xs leading-relaxed text-slate-500">
                ทางเราได้รับข้อมูลของคุณแล้ว และจะติดต่อกลับโดยเร็วที่สุด
              </p>
              <button
                onClick={handleClose}
                className="mt-2 rounded-xl border border-slate-200 px-5 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-brand/30 hover:text-brand"
              >
                ปิด
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-5">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  ชื่อลูกค้า <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="ชื่อ-นามสกุล"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 outline-none transition-colors focus:border-brand/40"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  เรื่องที่ต้องการติดต่อ <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="ระบุเรื่องที่ต้องการ..."
                  className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 outline-none transition-colors focus:border-brand/40"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  อีเมล <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="example@email.com"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 outline-none transition-colors focus:border-brand/40"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  เบอร์โทรศัพท์ <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="0XX-XXX-XXXX"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 outline-none transition-colors focus:border-brand/40"
                />
              </div>

              {isError && (
                <p className="text-xs text-red-500">เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง</p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-bright py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-md disabled:opacity-70"
              >
                {isPending ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    ส่งข้อความ
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
