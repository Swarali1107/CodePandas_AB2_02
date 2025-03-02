import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { useCanvasStore } from '../../store/canvasStore';
import { ComponentInstance } from '../../types';

interface RenderedComponentProps {
  component: ComponentInstance;
  isSelected: boolean;
  isPreview: boolean;
}

const RenderedComponent: React.FC<RenderedComponentProps> = ({
  component,
  isSelected,
  isPreview,
}) => {
  const { selectComponent, updateComponent } = useCanvasStore();
  const { components } = useCanvasStore().state;
  
  const { setNodeRef: setDraggableRef, attributes, listeners } = useDraggable({
    id: `component-${component.id}`,
    data: {
      type: 'existing-component',
      component,
    },
    disabled: isPreview,
  });
  
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: `droppable-${component.id}`,
    data: {
      type: 'component-container',
      componentId: component.id,
    },
    disabled: !component.allowsChildren || isPreview,
  });
  
  const setRefs = (node: HTMLElement | null) => {
    setDraggableRef(node);
    if (component.allowsChildren) {
      setDroppableRef(node);
    }
  };
  
  const handleClick = (e: React.MouseEvent) => {
    if (isPreview) return;
    e.stopPropagation();
    selectComponent(component.id);
  };
  
  const childComponents = components.filter(
    (c) => c.parentId === component.id
  );
  
  const renderComponentContent = () => {
    switch (component.type) {
      case 'container':
        return (
          <div className={component.props.className}>
            {childComponents.map((child) => (
              <RenderedComponent
                key={child.id}
                component={child}
                isSelected={child.id === useCanvasStore().state.selectedId}
                isPreview={isPreview}
              />
            ))}
          </div>
        );
      
      case 'row':
        return (
          <div className={component.props.className}>
            {childComponents.map((child) => (
              <RenderedComponent
                key={child.id}
                component={child}
                isSelected={child.id === useCanvasStore().state.selectedId}
                isPreview={isPreview}
              />
            ))}
          </div>
        );
      
      case 'column':
        return (
          <div className={component.props.className}>
            {childComponents.map((child) => (
              <RenderedComponent
                key={child.id}
                component={child}
                isSelected={child.id === useCanvasStore().state.selectedId}
                isPreview={isPreview}
              />
            ))}
          </div>
        );
      
      case 'card':
        return (
          <div className={component.props.className}>
            {childComponents.map((child) => (
              <RenderedComponent
                key={child.id}
                component={child}
                isSelected={child.id === useCanvasStore().state.selectedId}
                isPreview={isPreview}
              />
            ))}
          </div>
        );
      
      case 'grid':
        return (
          <div className={component.props.className}>
            {childComponents.map((child) => (
              <RenderedComponent
                key={child.id}
                component={child}
                isSelected={child.id === useCanvasStore().state.selectedId}
                isPreview={isPreview}
              />
            ))}
          </div>
        );
      
      case 'text':
        return <p className={component.props.className}>{component.props.content}</p>;
      
      case 'heading':
        const HeadingTag = component.props.level || 'h2';
        return (
          <HeadingTag className={component.props.className}>
            {component.props.content}
          </HeadingTag>
        );
      
      case 'image':
        return (
          <img
            src={component.props.src}
            alt={component.props.alt}
            className={component.props.className}
          />
        );
      
      case 'button':
        return (
          <button className={component.props.className}>
            {component.props.content}
          </button>
        );
      
      case 'divider':
        return <hr className={component.props.className} />;
      
      case 'input':
        return (
          <input
            type="text"
            placeholder={component.props.placeholder}
            className={component.props.className}
            disabled={isPreview}
          />
        );
      
      case 'textarea':
        return (
          <textarea
            placeholder={component.props.placeholder}
            rows={component.props.rows || 4}
            className={component.props.className}
            disabled={isPreview}
          />
        );
      
      case 'checkbox':
        return (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className={component.props.className}
              disabled={isPreview}
            />
            <span>{component.props.label}</span>
          </label>
        );
      
      case 'select':
        return (
          <select className={component.props.className} disabled={isPreview}>
            {component.props.options.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'navbar':
        return (
          <nav className={component.props.className}>
            {childComponents.length > 0 ? (
              childComponents.map((child) => (
                <RenderedComponent
                  key={child.id}
                  component={child}
                  isSelected={child.id === useCanvasStore().state.selectedId}
                  isPreview={isPreview}
                />
              ))
            ) : (
              <>
                <div className="font-bold">Logo</div>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-indigo-600">Home</a>
                  <a href="#" className="hover:text-indigo-600">About</a>
                  <a href="#" className="hover:text-indigo-600">Contact</a>
                </div>
              </>
            )}
          </nav>
        );
      
      case 'footer':
        return (
          <footer className={component.props.className}>
            {childComponents.length > 0 ? (
              childComponents.map((child) => (
                <RenderedComponent
                  key={child.id}
                  component={child}
                  isSelected={child.id === useCanvasStore().state.selectedId}
                  isPreview={isPreview}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">© 2025 UI Designer. All rights reserved.</p>
            )}
          </footer>
        );
      
      case 'list':
        return (
          <ul className={component.props.className}>
            {component.props.items.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      
      case 'chart':
        return (
          <div className={component.props.className}>
            <div className="text-center">Chart Placeholder</div>
            <div className="flex justify-between mt-4">
              {component.props.data.labels.map((label: string, index: number) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="bg-indigo-500 w-8"
                    style={{
                      height: `${(component.props.data.values[index] / Math.max(...component.props.data.values)) * 100}px`,
                    }}
                  ></div>
                  <div className="text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return <div>Unknown component type: {component.type}</div>;
    }
  };
  
  return (
    <div
      ref={setRefs}
      className={`relative ${
        isSelected && !isPreview ? 'outline outline-2 outline-indigo-500' : ''
      } ${isPreview ? '' : 'hover:outline hover:outline-1 hover:outline-indigo-300'}`}
      onClick={handleClick}
      {...(isPreview ? {} : { ...attributes, ...listeners })}
      style={{
        position: component.position ? 'absolute' : 'relative',
        top: component.position?.y,
        left: component.position?.x,
        width: component.size?.width,
        height: component.size?.height,
        ...component.style,
      }}
    >
      {renderComponentContent()}
      
      {isSelected && !isPreview && (
        <div className="absolute -top-6 left-0 bg-indigo-500 text-white text-xs px-2 py-1 rounded-t-md">
          {component.name}
        </div>
      )}
    </div>
  );
};

export default RenderedComponent;