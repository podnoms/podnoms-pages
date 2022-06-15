import React from "react";

interface IBaseDialogProps {
  handleClose: () => void;
  show: boolean;
  children: React.ReactNode;
}
const BaseDialog: React.FC<IBaseDialogProps> = ({
  handleClose,
  show,
  children,
}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  React.useEffect(() => {
    console.log("base.dialog", "show", show);
  }, [show]);
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default BaseDialog;
