import { ReactNode, useState } from "react";

export function Wizard(props: { children: ReactNode, nextLabel: ReactNode, prevLabel: ReactNode, canProceed?: (s: number) => boolean }) {
  const [step, setStep] = useState(0);

  return <section className="wizard">
    {!Array.isArray(props.children) && props.children}
    {Array.isArray(props.children) && props.children.length > 0 && props.children[step]}
    {Array.isArray(props.children) && step < props.children.length - 1 && <button type="button" className="wiz-next" onClick={() => { (!props.canProceed || props.canProceed(step)) && setStep(s => s + 1); } }>{props.nextLabel}</button>}
    {Array.isArray(props.children) && step > 0 && <button type="button" className="wiz-prev" onClick={() => setStep(s => s - 1)}>{props.prevLabel}</button>}
  </section>
}
