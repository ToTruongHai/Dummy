import { isArray, isEmpty } from "lodash-es";
import { useRef } from "react";

type BehaviorType = "INSERTBEFORE" | "SWAP";

type Props = {
  hoverStyle?: any;
  behavior: BehaviorType;
  setData?: any;
  data?: any;
  selectable?: boolean;
  callBack?: (itemCurrentIndex: any, itemNewIndex: any) => {} | void;
};

type DNDType = {
  onDragStart?: (e: any) => {} | void;
  onDragEnd?: (e: any) => {} | void;
  onDragOver?: (e: any) => {} | void;
  onDragEnter?: (e: any) => {} | void;
  onDragLeave?: (e: any) => {} | void;
};

const useDragDrop = ({ hoverStyle, behavior, callBack, selectable }: Props) => {
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

  const handleDropBehavior = (dataRef: any, el: any, e: any) => {
    const map = new Map<BehaviorType, () => {} | void>([
      [
        "INSERTBEFORE",
        () => {
          // data.splice(dataRef.sectionRowIndex, 1);
          // const currentElement = dragDropContainerRef.current ?? ({} as any);
          // currentElement.children?.[itemCurrentIndex].remove();
          // currentElement?.insertBefore(
          //   dataRef,
          //   currentElement.children[itemNewIndex]
          // );

          const itemCurrentIndex = dataRef.sectionRowIndex;
          const itemNewIndex = el.sectionRowIndex;

          if (typeof callBack === "function")
            return callBack(itemCurrentIndex, itemNewIndex);
        },
      ],
      [
        "SWAP",
        () => {
          dataRef.innerHTML = el.innerHTML;
          el.innerHTML = e.dataTransfer.getData("text/html");
        },
      ],
    ]);
    el.classList.remove(`${hoverStyle}`);
    return map?.get(behavior)?.() ?? {};
  };

  const handleDrop = (e: any) => {
    e.stopPropagation(); // stops the browser from redirecting.
    const dataRef = dragDataRef.current ?? ({} as any);
    const el = e.target.closest(`#${closestId}`);
    if (isEmpty(dataRef) || dataRef === null) return;
    if (dataRef === e.target) return false;

    return handleDropBehavior(dataRef, el, e);
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
