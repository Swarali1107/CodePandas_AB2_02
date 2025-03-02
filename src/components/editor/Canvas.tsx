import React, { useRef, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useCanvasStore } from '../../store/canvasStore';
import { ComponentInstance } from '../../types';
import RenderedComponent from './RenderedComponent';

interface CanvasProps {
  className?: string;
}

const Canvas: React.FC<CanvasProps> = ({ className }) => {
  const { state, addComponent } = useCanvasStore();
  const { components, selectedId, viewMode, deviceType, zoom, showGrid } = state;

  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const { setNodeRef } = useDroppable({
    id: 'canvas',
    data: {
      type: 'canvas',
    },
  });

  const getDeviceWidth = () => {
    switch (deviceType) {
      case 'mobile':
        return 'w-[375px]';
      case 'tablet':
        return 'w-[768px]';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  const rootComponents = components.filter((component) => !component.parentId);

  return (
    <div
      className={`relative flex-1 overflow-auto flex items-center justify-center bg-gray-100 ${className}`}
    >
      <div
        className={`relative ${getDeviceWidth()} h-full transition-all`}
        style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
      >
        <div
          ref={(node) => {
            if (node) {
              setNodeRef(node);
              canvasRef.current = node;
            }
          }}
          className={`w-full h-full min-h-[500px] bg-white ${
            showGrid ? 'canvas-grid' : ''
          } ${isDraggingOver ? 'border-2 border-dashed border-indigo-500' : ''}`}
          onDragOver={() => setIsDraggingOver(true)}
          onDragLeave={() => setIsDraggingOver(false)}
          onDrop={() => setIsDraggingOver(false)}
          aria-label="Canvas area for dropping components"
        >
          {rootComponents.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Drag and drop components here</p>
            </div>
          )}

          {rootComponents.map((component) => (
            <RenderedComponent
              key={component.id}
              component={component}
              isSelected={component.id === selectedId}
              isPreview={viewMode === 'preview'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Canvas;