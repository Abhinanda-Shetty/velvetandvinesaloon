import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, LoaderCircle, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { allServices, categories, ease, stylists, timeSlots } from "@/data/salon";
import { cn } from "@/lib/utils";
import { LuxButton, Reveal } from "./ui";

export type Prefill = { service?: string; stylist?: string; nonce: number };

type Form = { name: string; email: string; phone: string; service: string; stylist: string; date: string; time: string; notes: string };
const empty: Form = { name: "", email: "", phone: "", service: "", stylist: "Any Available Stylist", date: "", time: "", notes: "" };

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function validate(f: Form, min: string) {
  const e: Partial<Record<keyof Form, string>> = {};
  if (f.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Please enter a valid email address.";
  if (f.phone.replace(/[^\d]/g, "").length < 10) e.phone = "Please enter a valid UK phone number.";
  if (!f.service) e.service = "Please choose a service.";
  if (!f.date) e.date = "Please choose a date.";
  else if (f.date < min) e.date = "Please choose a date from today onwards.";
  if (!f.time) e.time = "Please choose a preferred time.";
  return e;
}

const fieldCls = "w-full rounded-sm border border-input bg-background/40 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-gold focus:outline-none";
const selectTriggerCls = cn(
  fieldCls,
  "flex h-auto cursor-pointer items-center justify-between gap-3 text-left [&>svg:last-child]:h-4 [&>svg:last-child]:w-4 [&>svg:last-child]:text-gold [&>svg:last-child]:opacity-90",
);
const selectContentCls = "max-h-72 overflow-y-auto rounded-sm border border-gold/25 bg-obsidian/90 text-foreground shadow-deep backdrop-blur-xl";
const selectItemCls = "cursor-pointer rounded-sm pr-8 text-sm text-foreground/90 transition-colors data-[highlighted]:bg-wine/45 data-[highlighted]:text-ivory data-[state=checked]:text-gold";
const selectLabelCls = "px-2 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-sage";
const labelCls = "mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground";

function Field({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string | undefined; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label} {required && <span className="text-gold" aria-hidden>*</span>}
      </label>
      {children}
      {error && <p id={`${id}-err`} className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function Booking({ prefill }: { prefill: Prefill }) {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<(Form & { ref: string; price: number }) | null>(null);
  const [min, setMin] = useState("");
  const feedback = useAnimationControls();
  const reduce = useReducedMotion();

  useEffect(() => setMin(todayISO()), []);
  useEffect(() => {
    if (!prefill.nonce) return;
    setForm((f) => ({ ...f, ...(prefill.service && { service: prefill.service }), ...(prefill.stylist && { stylist: prefill.stylist }) }));
    if (prefill.service) setErrors(({ service: _s, ...rest }) => rest);
  }, [prefill]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const selected = allServices.find((s) => s.name === form.service);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(form, min || todayISO());
    setErrors(errs);
    if (Object.keys(errs).length) {
      if (!reduce) void feedback.start({ x: [0, -5, 5, -3, 3, 0], transition: { duration: 0.4 } });
      document.getElementById(`bk-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const ref = `VV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmed({ ...form, ref, price: selected?.price ?? 0 });
      setSubmitting(false);
    }, 900);
  };

  const close = () => {
    setConfirmed(null);
    setForm(empty);
  };

  const err = (k: keyof Form) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `bk-${k}-err` : undefined });

  return (
    <section id="booking" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_40%,var(--wine),transparent_70%)] opacity-40" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Appointments</p>
          <h2 className="display mt-6 text-5xl sm:text-6xl">Your Next Hair Moment <em className="text-gold-sheen">Starts Here.</em></h2>
          <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">Tell us what you have in mind. We'll take care of the details.</p>

          <div className="glass mt-12 rounded-md p-6" aria-live="polite">
            <p className="eyebrow mb-5">Your Selection</p>
            <dl className="space-y-3 text-sm">
              {[
                ["Service", form.service || "—"],
                ["Price", selected ? `£${selected.price}` : "—"],
                ["Duration", selected ? `${selected.minutes} minutes` : "—"],
                ["Stylist", form.stylist],
                ["Date", form.date ? new Date(form.date + "T00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long" }) : "—"],
                ["Time", form.time || "—"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-border pb-3 last:border-0">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className={cn("text-right", k === "Price" && "display text-xl text-gold")}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-8" delay={0.1}>
          <motion.form onSubmit={submit} noValidate className="glass rounded-md p-6 sm:p-10" animate={feedback} aria-busy={submitting}>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="bk-name" label="Full name" required error={errors.name}>
                <input id="bk-name" className={fieldCls} value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" {...err("name")} />
              </Field>
              <Field id="bk-email" label="Email address" required error={errors.email}>
                <input id="bk-email" type="email" className={fieldCls} value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" {...err("email")} />
              </Field>
              <Field id="bk-phone" label="Phone number" required error={errors.phone}>
                <input id="bk-phone" type="tel" className={fieldCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" placeholder="07700 900000" {...err("phone")} />
              </Field>
              <Field id="bk-service" label="Service" required error={errors.service}>
                <select id="bk-service" className={fieldCls} value={form.service} onChange={(e) => set("service", e.target.value)} {...err("service")}>
                  <option value="">Select a service</option>
                  {categories.map((c) => (
                    <optgroup key={c.id} label={c.label}>
                      {c.services.map((s) => <option key={s.name} value={s.name}>{s.name} — £{s.price}</option>)}
                    </optgroup>
                  ))}
                </select>
              </Field>
              <Field id="bk-stylist" label="Preferred stylist">
                <select id="bk-stylist" className={fieldCls} value={form.stylist} onChange={(e) => set("stylist", e.target.value)}>
                  <option>Any Available Stylist</option>
                  {stylists.map((s) => <option key={s.name}>{s.name}</option>)}
                </select>
              </Field>
              <Field id="bk-date" label="Preferred date" required error={errors.date}>
                <input id="bk-date" type="date" min={min || undefined} className={cn(fieldCls, "[color-scheme:dark]")} value={form.date} onChange={(e) => set("date", e.target.value)} {...err("date")} />
              </Field>
            </div>

            <fieldset className="mt-6">
              <legend className={labelCls}>Preferred time <span className="text-gold" aria-hidden>*</span></legend>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {timeSlots.map((t) => (
                  <LuxButton
                    key={t}
                    id={t === timeSlots[0] ? "bk-time" : undefined}
                    type="button"
                    aria-pressed={form.time === t}
                    onClick={() => set("time", t)}
                    className={cn("rounded-sm border py-3 text-sm transition-all", form.time === t ? "border-gold bg-gold text-primary-foreground" : "border-input hover:border-gold/60")}
                  >
                    {t}
                  </LuxButton>
                ))}
              </div>
              {errors.time && <p id="bk-time-err" className="mt-2 text-xs text-destructive">{errors.time}</p>}
            </fieldset>

            <div className="mt-6">
              <Field id="bk-notes" label="Notes or special requests">
                <textarea id="bk-notes" rows={3} className={fieldCls} value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Anything we should know — inspiration, allergies, occasions…" />
              </Field>
            </div>

            <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="max-w-xs text-xs text-muted-foreground">This sends a booking request. Our team will confirm availability with you directly.</p>
              <LuxButton type="submit" disabled={submitting} className="w-full min-w-60 sm:w-auto">{submitting && <LoaderCircle size={17} className="animate-spin" aria-hidden />}{submitting ? "Preparing request…" : "Request Appointment"}</LuxButton>
            </div>
          </motion.form>
        </Reveal>
      </div>

      <ConfirmModal data={confirmed} onClose={close} />
    </section>
  );
}

function ConfirmModal({ data, onClose }: { data: (Form & { ref: string; price: number }) | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!data) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [data, onClose]);

  return (
    <AnimatePresence>
      {data && (
        <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-background/80 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, ease }}
            className="glass relative w-full max-w-md rounded-md p-8 sm:p-10"
          >
            <button ref={closeRef} onClick={onClose} aria-label="Close" className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, duration: 0.6, ease }} className="grid h-14 w-14 place-items-center rounded-full border border-gold text-gold">
              <Check className="h-6 w-6" />
            </motion.div>
            <p className="eyebrow mt-8">Request received · {data.ref}</p>
            <h3 id="confirm-title" className="display mt-3 text-4xl">Thank you, {data.name.split(" ")[0]}.</h3>
            <p className="mt-3 text-sm text-muted-foreground">We've noted your request and will be in touch at {data.email} to confirm your appointment.</p>
            <dl className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
              {[["Service", data.service], ["Price", `£${data.price}`], ["Stylist", data.stylist], ["Date", new Date(data.date + "T00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })], ["Time", data.time]].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4"><dt className="text-muted-foreground">{k}</dt><dd className="text-right">{v}</dd></div>
              ))}
            </dl>
            <LuxButton onClick={onClose} className="mt-8 w-full">Return to Velvet &amp; Vine</LuxButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
