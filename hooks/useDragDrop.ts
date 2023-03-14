import { isArray, isEmpty } from "lodash-es";
import { useRef } from "react";

type BehaviorType = "INSERTBEFORE" | "SWAP";

type Props = {
  hoverStyle?: any;
  behavior: BehaviorType;
  setData?: any;
  data?: any;
  chkbox: [];
  callBack?: (
    itemCurrentIndex: any,
    itemNewIndex: any,
    isDragMultiple: boolean
  ) => {} | void;
  hiddenSpanRef: any;
};

type DNDType = {
  onDragStart?: (e: any) => {} | void;
  onDragEnd?: (e: any) => {} | void;
  onDragOver?: (e: any) => {} | void;
  onDragEnter?: (e: any) => {} | void;
  onDragLeave?: (e: any) => {} | void;
};

const OFFSET_X = -30;
const OFFSET_Y = 20;

const useDragDrop = ({
  hoverStyle,
  behavior,
  callBack,
  chkbox,
  hiddenSpanRef,
}: Props) => {
  const dragDropContainerRef = useRef(null);
  const dragDataRef = useRef(null);
  const closestId = "dragDropClosest";

  const map = new Map<
    BehaviorType,
    (dataRef: any, el: any, e: any) => {} | void
  >([
    [
      "INSERTBEFORE",
      (dataRef: any, el: any) => {
        const itemCurrentIndex = dataRef.sectionRowIndex;
        const itemNewIndex = el.sectionRowIndex;
        const isDragMultiple = dataRef.children?.[1]?.children?.[0].checked;
        const isMultiple =
          isArray(chkbox) &&
          !isEmpty(chkbox) &&
          chkbox.length > 1 &&
          isDragMultiple;
        const currentIndex = isMultiple ? chkbox : itemCurrentIndex;
        dragDataRef.current = null;

        if (typeof callBack === "function")
          return callBack(currentIndex, itemNewIndex, isDragMultiple);
      },
    ],
    [
      "SWAP",
      (dataRef: any, el: any, e: any) => {
        dataRef.innerHTML = el.innerHTML;
        el.innerHTML = e.dataTransfer.getData("textHtml");
      },
    ],
  ]);

  if (isEmpty(hoverStyle)) return;

  const displayMultipleDrag = () => {
    const currentDrag = dragDataRef.current ?? ({} as any);
    const isDragMultiple = currentDrag?.children?.[1]?.children?.[0].checked;
    const isMultiple =
      isArray(chkbox) &&
      !isEmpty(chkbox) &&
      chkbox.length > 1 &&
      isDragMultiple;
    if (isMultiple) {
      const span = hiddenSpanRef.current ?? ({} as any);
      span.classList.toggle("hidden");
    }
  };

  const handleDragStart = (e: any) => {
    const el = e.target.closest(`#${closestId}`);
    dragDataRef.current = el;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("textHtml", el.innerHTML);
    displayMultipleDrag();
  };

  const handleDragEnd = (e: any) => {
    displayMultipleDrag();
    const { children = [] as any } =
      dragDropContainerRef.current ?? ({} as any);
    if (isArray(children))
      return children.forEach((e: any) => e.classList.remove(`${hoverStyle}`));
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    const span = hiddenSpanRef.current ?? ({} as any);
    const { clientX, clientY } = e ?? {};
    span.style.left = `${clientX - OFFSET_X}px`;
    span.style.top = `${clientY - OFFSET_Y}px`;
    return false;
  };

  const handleDropBehavior = (dataRef: any, el: any, e: any) => {
    if (dragDataRef.current === null) return;
    el.classList.remove(`${hoverStyle}`);
    return map?.get(behavior)?.(dataRef, el, e) ?? {};
  };

  const handleDrop = (e: any) => {
    e.stopPropagation();
    const dataRef = dragDataRef.current ?? ({} as any);
    const el = e.target.closest(`#${closestId}`);
    if (isEmpty(dataRef) || dataRef === null) return;
    if (dataRef === e.target) return false;
    displayMultipleDrag();
    return handleDropBehavior(dataRef, el, e);
  };

  const handleDragEnter = (e: any) => {
    if (dragDataRef.current === null) return;
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
