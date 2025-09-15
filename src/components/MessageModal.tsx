interface MessageModal {
  closeFunction?: () => void;
  message: string;
  buttonMessage: string;
  buttonColor: string
}

export default function MessageModal({ closeFunction, message, buttonMessage, buttonColor }: MessageModal) {
  return (
    <div className="rounded-lg shadow-lg w-60 md:w-70 md:h-40 h-fit bg-white p-8 pb-4 flex-col text-primary-text justify-center">
      <div className="flex justify-center items-center flex-col gap-5.5">
        <p className="text-center">{message}</p>

        <button
          onClick={
            closeFunction
              ? () => closeFunction()
              : () => window.location.reload()
          }
          className={`${buttonColor} text-white p-1.5 rounded-md w-20`}
        >
          {buttonMessage}
        </button>
      </div>
    </div>
  );
}
