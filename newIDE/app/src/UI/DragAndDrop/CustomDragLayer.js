// @flow
import * as React from 'react';
import { DragLayer } from 'react-dnd';
import { Identifier } from 'dnd-core';
import Text from '../Text';
import { instancesEditorId } from '../../InstancesEditor';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

const THUMBNAIL_SIZE = 48;
const TEXT_SHIFT = 16;

const getItemStyles = ({
  clientOffset,
  previewPosition,
}: {|
  clientOffset: ?{ x: number, y: number },
  previewPosition: 'center' | 'aboveRight',
|}) => {
  if (!clientOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = clientOffset;

  const previewX =
    previewPosition === 'center' ? x - THUMBNAIL_SIZE / 2 : x + TEXT_SHIFT;
  const previewY =
    previewPosition === 'center' ? y - THUMBNAIL_SIZE / 2 : y - TEXT_SHIFT;

  const transform = `translate(${previewX}px, ${previewY}px)`;

  return {
    transform,
    WebkitTransform: transform,
  };
};

type XYCoord = {|
  x: number,
  y: number,
|};

export type DraggedItem = {|
  name: string,
  thumbnail?: string,
|};

type InternalCustomDragLayerProps = {|
  item?: DraggedItem,
  itemType?: Identifier | null,
  initialOffset?: XYCoord | null,
  currentOffset?: XYCoord | null,
  clientOffset?: XYCoord | null,
  isDragging?: boolean,
|};

const shouldHidePreviewBecauseDraggingOnSceneEditorCanvas = ({
  x,
  y,
}: XYCoord) => {
  const activeCanvas = document.querySelector(
    `#scene-editor[data-active=true] #${instancesEditorId}`
  );
  if (activeCanvas) {
    const canvasRect = activeCanvas.getBoundingClientRect();
    if (
      x >= canvasRect.left &&
      x <= canvasRect.right &&
      y >= canvasRect.top &&
      y <= canvasRect.bottom
    ) {
      return true;
    }
  }
  return false;
};

const CustomDragLayer = ({
  item,
  itemType,
  isDragging,
  initialOffset,
  currentOffset,
  clientOffset,
}: InternalCustomDragLayerProps) => {
  const renderedItem = React.useMemo(
    () => {
      if (!item || !clientOffset) return null;

      if (shouldHidePreviewBecauseDraggingOnSceneEditorCanvas(clientOffset)) {
        return null;
      }

      return item.thumbnail ? (
        <img
          alt={item.name}
          src={item.thumbnail}
          style={{
            maxWidth: THUMBNAIL_SIZE,
            maxHeight: THUMBNAIL_SIZE,
          }}
        />
      ) : (
        <Text>{item.name}</Text>
      );
    },
    [item, clientOffset]
  );

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles({
          clientOffset,
          previewPosition: item && !item.thumbnail ? 'aboveRight' : 'center',
        })}
      >
        {renderedItem}
      </div>
    </div>
  );
};

const collect = (monitor: any): InternalCustomDragLayerProps => ({
  // This contains the item that is returned by the method `beginDrag` of the DragSourceAndDropTarget component.
  item: monitor.getItem(),
  // This contains the type of the item being dragged, defined when calling the function `makeDragSourceAndDropTarget`.
  itemType: monitor.getItemType(),
  // This is the initial offset of the drag source.
  initialOffset: monitor.getInitialSourceClientOffset(),
  // This is the current offset of the drag source (the whole wrapper element, not just the mouse position)
  currentOffset: monitor.getSourceClientOffset(),
  // This is the current offset of the mouse.
  clientOffset: monitor.getClientOffset(),
  isDragging: monitor.isDragging(),
});

// $FlowFixMe - Forcing the type of the component, unsure how to make the DragLayer happy.
const ExternalCustomDragLayer: ({||}) => React.Node = DragLayer(collect)(
  CustomDragLayer
);

export default ExternalCustomDragLayer;
