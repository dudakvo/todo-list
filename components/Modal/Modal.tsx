import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

interface IProps {
  onCloseModal: () => void;
  children: JSX.Element;
}

export default function Modal(props: IProps) {
  const handleClickBacdrop = () => {};

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    const modalRoot = document.getElementById("modal-root");
    console.log(
      "🚀 ~ file: Modal.tsx ~ line 21 ~ Modal ~ modalRoot",
      modalRoot
    );
    return createPortal(<div>Hello from modal</div>, modalRoot);
  } else {
    return null;
  }

  // return createPortal(
  //   <div className={s.Overlay} onClick={handleClickBacdrop}>
  //     <div className={s.Modal}>{props.children}</div>
  //   </div>,
  //   modalRoot
  // );
}
