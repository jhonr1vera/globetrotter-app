type ToggleSwitchProps = {
  id: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  customWidth: string
}

export default function ToggleSwitch({ id, checked, onChange, label, customWidth }: ToggleSwitchProps) {
  return (
    <div className="flex justify-between">
      <p>{label}</p>
      <label htmlFor={id} className={`bg-border  rounded-full h-6 cursor-pointer p-[3px] relative overflow-hidden ${customWidth} md:w-12`}>
        <input onChange={onChange} id={id} className="peer sr-only" type="checkbox" checked={checked} />
        <div className="left-0 w-full h-full peer-checked:bg-primary bg-Toggle-Dark absolute top-0"></div>
        <div className="w-[18px] h-[18px] rounded-full bg-white peer-checked:bg-white peer-checked:translate-x-[21px] md:peer-checked:translate-x-[25px] transition-all"></div>
      </label>
    </div>
  );
}