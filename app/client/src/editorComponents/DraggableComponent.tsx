import React, { useContext } from "react";
import styled from "styled-components";
import { WidgetProps, WidgetOperations } from "../widgets/BaseWidget";
import { useDrag, DragPreviewImage, DragSourceMonitor } from "react-dnd";
import blankImage from "../assets/images/blank.png";
import { ContainerProps, FocusContext } from "./ContainerComponent";
import { ControlIcons } from "../icons/ControlIcons";
import { theme } from "../constants/DefaultTheme";

// FontSizes array in DefaultTheme.tsx
// Change this to toggle the size of delete and move handles.
const CONTROL_THEME_FONTSIZE_INDEX = 6;

const DraggableWrapper = styled.div<{ show: boolean }>`
  & > div.control {
    display: ${props => (props.show ? "block" : "none")};
  }
  &:hover > div {
    display: block;
  }
`;

const DragHandle = styled.div`
  position: absolute;
  left: -${props => props.theme.fontSizes[CONTROL_THEME_FONTSIZE_INDEX] / 2}px;
  top: -${props => props.theme.fontSizes[CONTROL_THEME_FONTSIZE_INDEX] / 2}px;
  cursor: move;
  display: none;
  cursor: grab;
  z-index: 11;
`;

const DeleteControl = styled.div`
  position: absolute;
  right: -${props => props.theme.fontSizes[CONTROL_THEME_FONTSIZE_INDEX] / 2}px;
  top: -${props => props.theme.fontSizes[CONTROL_THEME_FONTSIZE_INDEX] / 2}px;
  display: none;
  cursor: pointer;
  z-index: 11;
`;

const moveControlIcon = ControlIcons.MOVE_CONTROL({
  width: theme.fontSizes[CONTROL_THEME_FONTSIZE_INDEX],
  height: theme.fontSizes[CONTROL_THEME_FONTSIZE_INDEX],
});

const deleteControlIcon = ControlIcons.DELETE_CONTROL({
  width: theme.fontSizes[CONTROL_THEME_FONTSIZE_INDEX],
  height: theme.fontSizes[CONTROL_THEME_FONTSIZE_INDEX],
});

type DraggableComponentProps = WidgetProps & ContainerProps;

const DraggableComponent = (props: DraggableComponentProps) => {
  const { isFocused, setFocus } = useContext(FocusContext);
  const deleteWidget = () => {
    props.updateWidget &&
      props.updateWidget(WidgetOperations.DELETE, props.widgetId);
  };
  const [{ isDragging }, drag, preview] = useDrag({
    item: props,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <React.Fragment>
      <DragPreviewImage src={blankImage} connect={preview} />
      <DraggableWrapper
        ref={preview}
        onClick={(e: any) => {
          if (setFocus) {
            setFocus(props.widgetId);
            e.stopPropagation();
          }
        }}
        show={props.widgetId === isFocused}
        style={{
          display: isDragging ? "none" : "flex",
          flexDirection: "column",
          position: "absolute",
          left: props.style
            ? props.style.xPosition + props.style.xPositionUnit
            : 0,
          top: props.style
            ? props.style.yPosition + props.style.yPositionUnit
            : 0,
        }}
      >
        <DragHandle className="control" ref={drag}>
          {moveControlIcon}
        </DragHandle>
        <DeleteControl className="control" onClick={deleteWidget}>
          {deleteControlIcon}
        </DeleteControl>
        {props.children}
      </DraggableWrapper>
    </React.Fragment>
  );
};

export default DraggableComponent;
