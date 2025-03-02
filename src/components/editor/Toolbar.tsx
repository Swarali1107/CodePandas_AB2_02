import React from 'react';
import { useCanvasStore } from '../../store/canvasStore';
import Button from '../ui/Button';
import {
  Undo,
  Redo,
  Trash,
  Save,
  Download,
  Upload,
  Copy,
  Eye,
  Smartphone,
  Tablet,
  Monitor,
  Grid,
  ZoomIn,
  ZoomOut,
  Code,
  Sparkles,
} from 'lucide-react';

const Toolbar: React.FC = () => {
  const {
    state,
    undo,
    redo,
    clearCanvas,
    setViewMode,
    setDeviceType,
    toggleGrid,
    setZoom,
  } = useCanvasStore();
  
  const { viewMode, deviceType, zoom, showGrid } = state;
  
  const handleExport = () => {
    const components = useCanvasStore().state.components;
    const dataStr = JSON.stringify(components, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = 'ui-design.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const components = JSON.parse(event.target?.result as string);
          useCanvasStore().loadComponents(components);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  };
  
  const handleExportCode = () => {
    // This would generate React JSX code from the components
    alert('Code export functionality would be implemented here');
  };
  
  const handleAISuggestions = () => {
    // This would trigger AI suggestions
    alert('AI design suggestions would be shown here');
  };
  
  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={undo}
          title="Undo"
        >
          <Undo size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={redo}
          title="Redo"
        >
          <Redo size={16} />
        </Button>
        <div className="h-4 border-r border-gray-300 mx-1"></div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearCanvas}
          title="Clear Canvas"
        >
          <Trash size={16} />
        </Button>
        <div className="h-4 border-r border-gray-300 mx-1"></div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setZoom(zoom - 0.1)}
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </Button>
        <span className="text-xs">{Math.round(zoom * 100)}%</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setZoom(zoom + 0.1)}
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant={deviceType === 'mobile' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setDeviceType('mobile')}
          title="Mobile View"
        >
          <Smartphone size={16} />
        </Button>
        <Button
          variant={deviceType === 'tablet' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setDeviceType('tablet')}
          title="Tablet View"
        >
          <Tablet size={16} />
        </Button>
        <Button
          variant={deviceType === 'desktop' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setDeviceType('desktop')}
          title="Desktop View"
        >
          <Monitor size={16} />
        </Button>
        <div className="h-4 border-r border-gray-300 mx-1"></div>
        <Button
          variant={showGrid ? 'primary' : 'ghost'}
          size="sm"
          onClick={toggleGrid}
          title="Toggle Grid"
        >
          <Grid size={16} />
        </Button>
        <div className="h-4 border-r border-gray-300 mx-1"></div>
        <Button
          variant={viewMode === 'preview' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')}
          title={viewMode === 'edit' ? 'Preview Mode' : 'Edit Mode'}
        >
          <Eye size={16} />
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAISuggestions}
          title="AI Suggestions"
        >
          <Sparkles size={16} className="text-indigo-500" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleExportCode}
          title="Export Code"
        >
          <Code size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleImport}
          title="Import Design"
        >
          <Upload size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleExport}
          title="Export Design"
        >
          <Download size={16} />
        </Button>
        <Button
          variant="primary"
          size="sm"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;