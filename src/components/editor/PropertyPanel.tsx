import React, { useState } from 'react';
import { useCanvasStore } from '../../store/canvasStore';
import { Trash2, Copy, Eye, EyeOff } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Tabs from '../ui/Tabs';
import ColorPicker from '../ui/ColorPicker';

const PropertyPanel: React.FC = () => {
  const { state, updateComponent, removeComponent } = useCanvasStore();
  const { components, selectedId } = state;
  
  const selectedComponent = components.find((c) => c.id === selectedId);
  
  if (!selectedComponent) {
    return (
      <div className="p-4 text-gray-500">
        <p>Select a component to edit its properties</p>
      </div>
    );
  }
  
  const handlePropertyChange = (property: string, value: any) => {
    updateComponent(selectedComponent.id, {
      props: {
        ...selectedComponent.props,
        [property]: value,
      },
    });
  };
  
  const handleStyleChange = (property: string, value: any) => {
    updateComponent(selectedComponent.id, {
      style: {
        ...selectedComponent.style,
        [property]: value,
      },
    });
  };
  
  const renderPropertyFields = () => {
    switch (selectedComponent.type) {
      case 'text':
      case 'heading':
      case 'button':
        return (
          <>
            <div className="mb-4">
              <Input
                label="Content"
                value={selectedComponent.props.content || ''}
                onChange={(e) => handlePropertyChange('content', e.target.value)}
                fullWidth
              />
            </div>
            {selectedComponent.type === 'heading' && (
              <div className="mb-4">
                <Select
                  label="Heading Level"
                  options={[
                    { value: 'h1', label: 'H1' },
                    { value: 'h2', label: 'H2' },
                    { value: 'h3', label: 'H3' },
                    { value: 'h4', label: 'H4' },
                    { value: 'h5', label: 'H5' },
                    { value: 'h6', label: 'H6' },
                  ]}
                  value={selectedComponent.props.level || 'h2'}
                  onChange={(value) => handlePropertyChange('level', value)}
                  fullWidth
                />
              </div>
            )}
          </>
        );
      
      case 'image':
        return (
          <>
            <div className="mb-4">
              <Input
                label="Image URL"
                value={selectedComponent.props.src || ''}
                onChange={(e) => handlePropertyChange('src', e.target.value)}
                fullWidth
              />
            </div>
            <div className="mb-4">
              <Input
                label="Alt Text"
                value={selectedComponent.props.alt || ''}
                onChange={(e) => handlePropertyChange('alt', e.target.value)}
                fullWidth
              />
            </div>
          </>
        );
      
      case 'input':
      case 'textarea':
        return (
          <>
            <div className="mb-4">
              <Input
                label="Placeholder"
                value={selectedComponent.props.placeholder || ''}
                onChange={(e) => handlePropertyChange('placeholder', e.target.value)}
                fullWidth
              />
            </div>
            {selectedComponent.type === 'textarea' && (
              <div className="mb-4">
                <Input
                  label="Rows"
                  type="number"
                  value={selectedComponent.props.rows || 4}
                  onChange={(e) => handlePropertyChange('rows', parseInt(e.target.value))}
                  fullWidth
                />
              </div>
            )}
          </>
        );
      
      case 'checkbox':
        return (
          <div className="mb-4">
            <Input
              label="Label"
              value={selectedComponent.props.label || ''}
              onChange={(e) => handlePropertyChange('label', e.target.value)}
              fullWidth
            />
          </div>
        );
      
      case 'select':
        return (
          <div className="mb-4">
            <p className="block text-sm font-medium text-gray-700 mb-1">Options</p>
            {selectedComponent.props.options.map((option: any, index: number) => (
              <div key={index} className="flex mb-2">
                <Input
                  value={option.label}
                  onChange={(e) => {
                    const newOptions = [...selectedComponent.props.options];
                    newOptions[index] = {
                      ...newOptions[index],
                      label: e.target.value,
                    };
                    handlePropertyChange('options', newOptions);
                  }}
                  className="mr-2"
                />
                <Input
                  value={option.value}
                  onChange={(e) => {
                    const newOptions = [...selectedComponent.props.options];
                    newOptions[index] = {
                      ...newOptions[index],
                      value: e.target.value,
                    };
                    handlePropertyChange('options', newOptions);
                  }}
                />
                <Button
                  variant="ghost"
                  onClick={() => {
                    const newOptions = [...selectedComponent.props.options];
                    newOptions.splice(index, 1);
                    handlePropertyChange('options', newOptions);
                  }}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                const newOptions = [
                  ...(selectedComponent.props.options || []),
                  { value: `option${selectedComponent.props.options.length + 1}`, label: `Option ${selectedComponent.props.options.length + 1}` },
                ];
                handlePropertyChange('options', newOptions);
              }}
              className="mt-2"
            >
              Add Option
            </Button>
          </div>
        );
      
      case 'list':
        return (
          <div className="mb-4">
            <p className="block text-sm font-medium text-gray-700 mb-1">Items</p>
            {selectedComponent.props.items.map((item: string, index: number) => (
              <div key={index} className="flex mb-2">
                <Input
                  value={item}
                  onChange={(e) => {
                    const newItems = [...selectedComponent.props.items];
                    newItems[index] = e.target.value;
                    handlePropertyChange('items', newItems);
                  }}
                  className="flex-1 mr-2"
                />
                <Button
                  variant="ghost"
                  onClick={() => {
                    const newItems = [...selectedComponent.props.items];
                    newItems.splice(index, 1);
                    handlePropertyChange('items', newItems);
                  }}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                const newItems = [
                  ...(selectedComponent.props.items || []),
                  `Item ${selectedComponent.props.items.length + 1}`,
                ];
                handlePropertyChange('items', newItems);
              }}
              className="mt-2"
            >
              Add Item
            </Button>
          </div>
        );
      
      case 'chart':
        return (
          <div className="mb-4">
            <Select
              label="Chart Type"
              options={[
                { value: 'bar', label: 'Bar Chart' },
                { value: 'line', label: 'Line Chart' },
                { value: 'pie', label: 'Pie Chart' },
              ]}
              value={selectedComponent.props.type || 'bar'}
              onChange={(value) => handlePropertyChange('type', value)}
              fullWidth
              className="mb-4"
            />
            
            <p className="block text-sm font-medium text-gray-700 mb-1">Data</p>
            {selectedComponent.props.data.labels.map((label: string, index: number) => (
              <div key={index} className="flex mb-2">
                <Input
                  value={label}
                  onChange={(e) => {
                    const newData = { ...selectedComponent.props.data };
                    newData.labels[index] = e.target.value;
                    handlePropertyChange('data', newData);
                  }}
                  placeholder="Label"
                  className="flex-1 mr-2"
                />
                <Input
                  type="number"
                  value={selectedComponent.props.data.values[index]}
                  onChange={(e) => {
                    const newData = { ...selectedComponent.props.data };
                    newData.values[index] = parseInt(e.target.value);
                    handlePropertyChange('data', newData);
                  }}
                  placeholder="Value"
                  className="flex-1 mr-2"
                />
                <Button
                  variant="ghost"
                  onClick={() => {
                    const newData = { ...selectedComponent.props.data };
                    newData.labels.splice(index, 1);
                    newData.values.splice(index, 1);
                    handlePropertyChange('data', newData);
                  }}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                const newData = { ...selectedComponent.props.data };
                newData.labels.push(`Label ${newData.labels.length + 1}`);
                newData.values.push(0);
                handlePropertyChange('data', newData);
              }}
              className="mt-2"
            >
              Add Data Point
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  const renderStyleFields = () => {
    return (
      <>
        <div className="mb-4">
          <Input
            label="CSS Class"
            value={selectedComponent.props.className || ''}
            onChange={(e) => handlePropertyChange('className', e.target.value)}
            fullWidth
          />
        </div>
        
        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700 mb-1">Dimensions</p>
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Width"
              value={selectedComponent.style?.width || ''}
              onChange={(e) => handleStyleChange('width', e.target.value)}
              placeholder="auto, 100%, 200px"
            />
            <Input
              label="Height"
              value={selectedComponent.style?.height || ''}
              onChange={(e) => handleStyleChange('height', e.target.value)}
              placeholder="auto, 100%, 200px"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700 mb-1">Spacing</p>
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Margin"
              value={selectedComponent.style?.margin || ''}
              onChange={(e) => handleStyleChange('margin', e.target.value)}
              placeholder="0px 10px"
            />
            <Input
              label="Padding"
              value={selectedComponent.style?.padding || ''}
              onChange={(e) => handleStyleChange('padding', e.target.value)}
              placeholder="10px"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700 mb-1">Typography</p>
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Font Size"
              value={selectedComponent.style?.fontSize || ''}
              onChange={(e) => handleStyleChange('fontSize', e.target.value)}
              placeholder="16px"
            />
            <Select
              label="Font Weight"
              options={[
                { value: 'normal', label: 'Normal' },
                { value: 'bold', label: 'Bold' },
                { value: '100', label: '100' },
                { value: '200', label: '200' },
                { value: '300', label: '300' },
                { value: '400', label: '400' },
                { value: '500', label: '500' },
                { value: '600', label: '600' },
                { value: '700', label: '700' },
                { value: '800', label: '800' },
                { value: '900', label: '900' },
              ]}
              value={selectedComponent.style?.fontWeight || ''}
              onChange={(value) => handleStyleChange('fontWeight', value)}
            />
          </div>
        </div>
        
        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700 mb-1">Colors</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <ColorPicker
                label="Text Color"
                color={selectedComponent.style?.color || '#000000'}
                onChange={(color) => handleStyleChange('color', color)}
              />
            </div>
            <div>
              <ColorPicker
                label="Background"
                color={selectedComponent.style?.backgroundColor || '#ffffff'}
                onChange={(color) => handleStyleChange('backgroundColor', color)}
              />
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700 mb-1">Border</p>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <Input
              label="Border Width"
              value={selectedComponent.style?.borderWidth || ''}
              onChange={(e) => handleStyleChange('borderWidth', e.target.value)}
              placeholder="1px"
            />
            <Select
              label="Border Style"
              options={[
                { value: 'none', label: 'None' },
                { value: 'solid', label: 'Solid' },
                { value: 'dashed', label: 'Dashed' },
                { value: 'dotted', label: 'Dotted' },
              ]}
              value={selectedComponent.style?.borderStyle || ''}
              onChange={(value) => handleStyleChange('borderStyle', value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Border Radius"
              value={selectedComponent.style?.borderRadius || ''}
              onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
              placeholder="4px"
            />
            <div>
              <ColorPicker
                label="Border Color"
                color={selectedComponent.style?.borderColor || '#000000'}
                onChange={(color) => handleStyleChange('borderColor', color)}
              />
            </div>
          </div>
        </div>
      </>
    );
  };
  
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-medium text-gray-900">
            {selectedComponent.name}
          </h2>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const componentCopy = { ...selectedComponent };
                delete componentCopy.id;
                componentCopy.props = { ...componentCopy.props };
                componentCopy.style = { ...componentCopy.style };
                useCanvasStore().addComponent(componentCopy);
              }}
              title="Duplicate"
            >
              <Copy size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const isVisible = selectedComponent.style?.display !== 'none';
                handleStyleChange('display', isVisible ? 'none' : undefined);
              }}
              title={selectedComponent.style?.display === 'none' ? 'Show' : 'Hide'}
            >
              {selectedComponent.style?.display === 'none' ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeComponent(selectedComponent.id)}
              title="Delete"
            >
              <Trash2 size={16} className="text-red-500" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <Tabs
          tabs={[
            {
              id: 'properties',
              label: 'Properties',
              content: <div className="pt-4">{renderPropertyFields()}</div>,
            },
            {
              id: 'styles',
              label: 'Styles',
              content: <div className="pt-4">{renderStyleFields()}</div>,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default PropertyPanel;