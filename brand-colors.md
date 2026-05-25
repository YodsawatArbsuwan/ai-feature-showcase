# LarnGear Showcase — Brand Colors (CI)

Source of truth: `apps/web/app/globals.css` (Tailwind v4 `@theme inline`)

## พาเลตหลักแบรนด์ (5 สี)

| Token | Hex | ใช้ที่ไหน |
|---|---|---|
| `--color-brand` | `#1c75bc` | สีหลัก — ปุ่ม/ลิงก์ accent, ตัวอักษรไฮไลต์, gradient ต้น |
| `--color-brand-bright` | `#2e90e0` | สีไล่เฉด — ปลาย gradient (ปุ่ม CTA, ไอคอนการ์ด, headline hero) |
| `--color-brand-navy` | `#0b2f5e` | กรมเข้ม — หัวข้อ (h1/h2), ไอคอนเล็ก, เน้นข้อความ |
| `--color-brand-deep` | `#081f3d` | กรมเข้มกว่า — **พื้น Footer** |
| `--color-brand-tint` | `#f4f8fc` | ฟ้าอ่อนมาก — พื้น hero, border การ์ด, แถบเงา |

## Utility ที่ใช้บ่อย (Tailwind v4 generate ให้อัตโนมัติจาก token ข้างบน)

- `bg-brand`, `bg-brand-bright`, `bg-brand-navy`, `bg-brand-deep`, `bg-brand-tint`
- `text-brand`, `text-brand-navy` (พบบ่อย)
- `border-brand-tint`, `border-brand/30`
- `from-brand to-brand-bright` (gradient ปุ่ม + ไอคอน)
- `from-brand-navy to-brand-bright` (gradient headline hero — bg-clip-text)
- เงาเรือง: `shadow-brand-bright/10`, `/30`, `/40`

## Tagline / footer

- Tagline italic บน footer ใช้ `text-white/60` (ขาว 60%)
- Copyright `text-white/40`

## สีรอง (จาก shadcn / Tailwind defaults ที่ใช้จริง)

| ที่ไหน | สี |
|---|---|
| พื้นหน้าเว็บปกติ | `white` (`#ffffff`) |
| ข้อความ body | `slate-600` / `slate-700` (เทาเข้ม) |
| ข้อความรอง | `slate-500` |
| ข้อความจาง | `slate-400` |
| error border / bg | `red-200` / `red-50` |
| error text | `red-500` / `red-600` |

## โน้ต

- shadcn ใส่ตัวแปร `oklch(...)` ของตัวเองไว้ที่ `:root` ใน `globals.css` (primary/secondary/muted/accent/...) — ปัจจุบัน **ไม่ได้ใช้บนเว็บโชว์โดยตรง** เพราะ component ของเราเรียก class `bg-brand*` / `text-brand*` แทน เลยข้ามไม่กล่าวถึง
- โทนรวม: **น้ำเงิน-กรม + ขาว** + เทาอ่อน + accent ไล่เฉด — ตรงสีแบรนด์จากโลโก้เป๊ะ

อยากเปลี่ยนค่าไหน บอก hex มา ผมแก้ใน `globals.css` แล้ว rebuild + deploy ให้ได้เลย
