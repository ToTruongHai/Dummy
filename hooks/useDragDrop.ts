import { isArray, isEmpty } from "lodash-es";
import { useRef } from "react";

type Props = {
  hoverStyle?: any;
};

type DNDType = {
  onDragStart?: (e: any) => {} | void;
  onDragEnd?: (e: any) => {} | void;
  onDragOver?: (e: any) => {} | void;
  onDragEnter?: (e: any) => {} | void;
  onDragLeave?: (e: any) => {} | void;
};

const useDragDrop = ({ hoverStyle }: Props) => {
  const dragDropContainerRef = useRef(null);
  const dragDataRef = useRef(null);
  const closestId = "dragDropClosest";

  if (isEmpty(hoverStyle)) return;
  const handleDragStart = (e: any) => {
    const el = e.target.closest(`#${closestId}`);

    dragDataRef.current = el;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", el.innerHTML);
  };
  const handleDragEnd = (e: any) => {
    const { children = [] as any } =
      dragDropContainerRef.current ?? ({} as any);
    if (isArray(children))
      return children.forEach((e: any) => e.classList.remove(`${hoverStyle}`));
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
    return false;
  };
  const handleDrop = (e: any) => {
    e.stopPropagation(); // stops the browser from redirecting.
    const data = dragDataRef.current ?? ({} as any);
    const el = e.target.closest(`#${closestId}`);

    if (isEmpty(data) || data === null) return;

    if (data !== e.target) {
      data.innerHTML = el.innerHTML;
      el.innerHTML = e.dataTransfer.getData("text/html");
      el.classList.remove(`${hoverStyle}`);
    }
    return false;
  };
  const handleDragEnter = (e: any) => {
    const el = e.target.closest(`#${closestId}`);
    return el.classList.add(`${hoverStyle}`);
  };
  const handleDragLeave = (e: any) => {
    const el = e.target.closest(`#${closestId}`);
    return el.classList.remove(`${hoverStyle}`);
  };

  const dragDropAttribute = {
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onDragOver: handleDragOver,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
  } as DNDType;

  return {
    dragDropAttribute,
    dragDropContainerRef,
    closestId,
  };
};

export default useDragDrop;
