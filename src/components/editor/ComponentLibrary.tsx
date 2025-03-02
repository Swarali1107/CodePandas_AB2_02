import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { nanoid } from 'nanoid';
import {
  Layout,
  Type,
  Image,
  Square,
  AlignLeft,
  FormInput,
  CheckSquare,
  List,
  BarChart,
  Layers,
  Grid,
  Box,
} from 'lucide-react';
import { ComponentDefinition } from '../../types';

interface ComponentCategoryProps {
  title: string;
  children: React.ReactNode;
}

const ComponentCategory: React.FC<ComponentCategoryProps> = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-900 mb-2">{title}</h3>
      <div className="grid grid-cols-2 gap-2">{children}</div>
    </div>
  );
};

interface DraggableComponentProps {
  component: ComponentDefinition;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({ component }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `library-${component.type}`,
    data: {
      type: 'component',
      component: {
        ...component,
        id: nanoid(),
      },
    },
  });

  const Icon = () => {
    switch (component.icon) {
      case 'layout':
        return <Layout size={18} />;
      case 'type':
        return <Type size={18} />;
      case 'image':
        return <Image size={18} />;
      case 'square':
        return <Square size={18} />;
      case 'align-left':
        return <AlignLeft size={18} />;
      case 'form-input':
        return <FormInput size={18} />;
      case 'check-square':
        return <CheckSquare size={18} />;
      case 'list':
        return <List size={18} />;
      case 'bar-chart':
        return <BarChart size={18} />;
      case 'layers':
        return <Layers size={18} />;
      case 'grid':
        return <Grid size={18} />;
      case 'box':
        return <Box size={18} />;
      default:
        return <Box size={18} />;
    }
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center p-2 bg-white border border-gray-200 rounded-md cursor-grab hover:border-indigo-500 hover:shadow-sm transition-all ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="mr-2 text-gray-500">
        <Icon />
      </div>
      <span className="text-sm">{component.name}</span>
    </div>
  );
};

const componentLibrary: ComponentDefinition[] = [
  // Layout components
  {
    id: 'container',
    type: 'container',
    name: 'Container',
    icon: 'layout',
    props: {
      className: 'w-full p-4',
    },
    allowsChildren: true,
  },
  {
    id: 'row',
    type: 'row',
    name: 'Row',
    icon: 'layout',
    props: {
      className: 'flex flex-row w-full',
    },
    allowsChildren: true,
  },
  {
    id: 'column',
    type: 'column',
    name: 'Column',
    icon: 'layout',
    props: {
      className: 'flex flex-col',
    },
    allowsChildren: true,
  },
  {
    id: 'card',
    type: 'card',
    name: 'Card',
    icon: 'square',
    props: {
      className: 'bg-white rounded-lg shadow-sm p-4',
    },
    allowsChildren: true,
  },
  {
    id: 'grid',
    type: 'grid',
    name: 'Grid',
    icon: 'grid',
    props: {
      className: 'grid grid-cols-2 gap-4',
    },
    allowsChildren: true,
  },
  
  // Basic components
  {
    id: 'text',
    type: 'text',
    name: 'Text',
    icon: 'type',
    props: {
      content: 'Text content',
      className: 'text-base',
    },
  },
  {
    id: 'heading',
    type: 'heading',
    name: 'Heading',
    icon: 'type',
    props: {
      content: 'Heading',
      level: 'h2',
      className: 'text-2xl font-bold',
    },
  },
  {
    id: 'image',
    type: 'image',
    name: 'Image',
    icon: 'image',
    props: {
      src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      alt: 'Image',
      className: 'w-full h-auto rounded-md',
    },
  },
  {
    id: 'button',
    type: 'button',
    name: 'Button',
    icon: 'square',
    props: {
      content: 'Button',
      className: 'px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700',
    },
  },
  {
    id: 'divider',
    type: 'divider',
    name: 'Divider',
    icon: 'align-left',
    props: {
      className: 'w-full h-px bg-gray-200 my-4',
    },
  },
  
  // Form components
  {
    id: 'input',
    type: 'input',
    name: 'Input',
    icon: 'form-input',
    props: {
      placeholder: 'Enter text...',
      className: 'w-full px-3 py-2 border border-gray-300 rounded-md',
    },
  },
  {
    id: 'textarea',
    type: 'textarea',
    name: 'Textarea',
    icon: 'form-input',
    props: {
      placeholder: 'Enter text...',
      rows: 4,
      className: 'w-full px-3 py-2 border border-gray-300 rounded-md',
    },
  },
  {
    id: 'checkbox',
    type: 'checkbox',
    name: 'Checkbox',
    icon: 'check-square',
    props: {
      label: 'Checkbox',
      className: 'form-checkbox h-4 w-4 text-indigo-600',
    },
  },
  {
    id: 'select',
    type: 'select',
    name: 'Select',
    icon: 'form-input',
    props: {
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ],
      className: 'w-full px-3 py-2 border border-gray-300 rounded-md',
    },
  },
  
  // Advanced components
  {
    id: 'navbar',
    type: 'navbar',
    name: 'Navbar',
    icon: 'layout',
    props: {
      className: 'flex items-center justify-between w-full p-4 bg-white shadow-sm',
    },
    allowsChildren: true,
  },
  {
    id: 'footer',
    type: 'footer',
    name: 'Footer',
    icon: 'layout',
    props: {
      className: 'w-full p-4 bg-gray-100',
    },
    allowsChildren: true,
  },
  {
    id: 'list',
    type: 'list',
    name: 'List',
    icon: 'list',
    props: {
      items: ['Item 1', 'Item 2', 'Item 3'],
      className: 'list-disc pl-5',
    },
  },
  {
    id: 'chart',
    type: 'chart',
    name: 'Chart',
    icon: 'bar-chart',
    props: {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        values: [12, 19, 3, 5, 2],
      },
      className: 'w-full h-64 bg-white p-4 rounded-md',
    },
  },
];

const ComponentLibrary: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Components</h2>
      
      <ComponentCategory title="Layout">
        {componentLibrary
          .filter((c) => ['container', 'row', 'column', 'card', 'grid'].includes(c.id))
          .map((component) => (
            <DraggableComponent key={component.id} component={component} />
          ))}
      </ComponentCategory>
      
      <ComponentCategory title="Basic">
        {componentLibrary
          .filter((c) => ['text', 'heading', 'image', 'button', 'divider'].includes(c.id))
          .map((component) => (
            <DraggableComponent key={component.id} component={component} />
          ))}
      </ComponentCategory>
      
      <ComponentCategory title="Form">
        {componentLibrary
          .filter((c) => ['input', 'textarea', 'checkbox', 'select'].includes(c.id))
          .map((component) => (
            <DraggableComponent key={component.id} component={component} />
          ))}
      </ComponentCategory>
      
      <ComponentCategory title="Advanced">
        {componentLibrary
          .filter((c) => ['navbar', 'footer', 'list', 'chart'].includes(c.id))
          .map((component) => (
            <DraggableComponent key={component.id} component={component} />
          ))}
      </ComponentCategory>
    </div>
  );
};

export default ComponentLibrary;