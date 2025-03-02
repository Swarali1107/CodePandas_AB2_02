import React from 'react';
import { Template } from '../../types';
import { Card, CardBody } from '../ui/Card';
import Button from '../ui/Button';
import { useCanvasStore } from '../../store/canvasStore';

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'E-commerce Homepage',
    description: 'A complete homepage for an online store',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'E-commerce',
    components: [],
  },
  {
    id: '2',
    name: 'Blog Layout',
    description: 'Clean and modern blog design',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Blog',
    components: [],
  },
  {
    id: '3',
    name: 'Dashboard',
    description: 'Admin dashboard with statistics and charts',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Admin',
    components: [],
  },
  {
    id: '4',
    name: 'Landing Page',
    description: 'Conversion-focused landing page',
    thumbnail: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Marketing',
    components: [],
  },
  {
    id: '5',
    name: 'Portfolio',
    description: 'Showcase your work with this portfolio template',
    thumbnail: 'https://images.unsplash.com/photo-1545665277-5937489579f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Portfolio',
    components: [],
  },
  {
    id: '6',
    name: 'Contact Form',
    description: 'Professional contact form with validation',
    thumbnail: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Forms',
    components: [],
  },
];

const TemplatesPanel: React.FC = () => {
  const { loadComponents, clearCanvas } = useCanvasStore();
  
  const handleUseTemplate = (template: Template) => {
    // In a real implementation, this would load the template components
    clearCanvas();
    
    // Mock implementation - would actually load real components
    alert(`Template "${template.name}" would be loaded here`);
  };
  
  const categories = Array.from(new Set(mockTemplates.map((t) => t.category)));
  
  return (
    <div className="h-full overflow-y-auto p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Templates</h2>
      
      {categories.map((category) => (
        <div key={category} className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">{category}</h3>
          <div className="grid grid-cols-2 gap-4">
            {mockTemplates
              .filter((t) => t.category === category)
              .map((template) => (
                <Card key={template.id} className="overflow-hidden">
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-32 object-cover"
                  />
                  <CardBody className="p-3">
                    <h4 className="font-medium text-sm mb-1">{template.name}</h4>
                    <p className="text-xs text-gray-500 mb-3">{template.description}</p>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleUseTemplate(template)}
                      fullWidth
                    >
                      Use Template
                    </Button>
                  </CardBody>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplatesPanel;