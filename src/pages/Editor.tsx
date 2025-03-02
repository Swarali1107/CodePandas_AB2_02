import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import {
  Sidebar,
  PanelRightOpen,
  PanelLeftOpen,
  Sparkles,
  Users,
  Layout,
  Code,
} from 'lucide-react';
import { useCanvasStore } from '../store/canvasStore';
import Toolbar from '../components/editor/Toolbar';
import Canvas from '../components/editor/Canvas';
import ComponentLibrary from '../components/editor/ComponentLibrary';
import PropertyPanel from '../components/editor/PropertyPanel';
import AIPanel from '../components/editor/AIPanel';
import CollaborationPanel from '../components/editor/CollaborationPanel';
import TemplatesPanel from '../components/editor/TemplatesPanel';
import ExportPanel from '../components/editor/ExportPanel';
import Button from '../components/ui/Button';

const Editor: React.FC = () => {
  const { addComponent, moveComponent, selectComponent } = useCanvasStore();
  
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [rightPanelContent, setRightPanelContent] = useState<
    'properties' | 'ai' | 'collaboration' | 'templates' | 'export'
  >('properties');
  
  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'existing-component') {
      selectComponent(event.active.data.current.component.id);
    }
  };
  
  const handleDragOver = (event: DragOverEvent) => {
    // Handle drag over events if needed
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    // Handle dropping a new component from the library
    if (
      active.data.current?.type === 'component' &&
      over.data.current?.type === 'canvas'
    ) {
      addComponent(active.data.current.component);
    }
    
    // Handle dropping a new component into a container
    if (
      active.data.current?.type === 'component' &&
      over.data.current?.type === 'component-container'
    ) {
      const newComponent = { ...active.data.current.component };
      newComponent.parentId = over.data.current.componentId;
      addComponent(newComponent);
    }
    
    // Handle moving an existing component
    if (
      active.data.current?.type === 'existing-component' &&
      over.data.current?.type === 'component-container' &&
      active.data.current.component.id !== over.data.current.componentId
    ) {
      moveComponent(
        active.data.current.component.id,
        over.data.current.componentId,
        0
      );
    }
    
    // Handle moving an existing component to the canvas (root level)
    if (
      active.data.current?.type === 'existing-component' &&
      over.data.current?.type === 'canvas'
    ) {
      moveComponent(active.data.current.component.id, undefined, 0);
    }
  };
  
  const renderRightPanel = () => {
    switch (rightPanelContent) {
      case 'properties':
        return <PropertyPanel />;
      case 'ai':
        return <AIPanel />;
      case 'collaboration':
        return <CollaborationPanel />;
      case 'templates':
        return <TemplatesPanel />;
      case 'export':
        return <ExportPanel />;
    }
  };
  
  return (
    <div className="h-screen flex flex-col">
      <Toolbar />
      
      <div className="flex-1 flex overflow-hidden">
        <DndContext
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <PanelGroup direction="horizontal">
            {leftPanelOpen && (
              <>
                <Panel defaultSize={20} minSize={15}>
                  <ComponentLibrary />
                </Panel>
                <PanelResizeHandle className="w-1 hover:w-1 panel-resize-handle" />
              </>
            )}
            
            <Panel>
              <div className="relative h-full">
                <Canvas />
                
                {!leftPanelOpen && (
                  <Button
                    variant="secondary"
                    className="absolute top-4 left-4 p-2"
                    onClick={() => setLeftPanelOpen(true)}
                  >
                    <PanelLeftOpen size={16} />
                  </Button>
                )}
                
                {!rightPanelOpen && (
                  <Button
                    variant="secondary"
                    className="absolute top-4 right-4 p-2"
                    onClick={() => setRightPanelOpen(true)}
                  >
                    <PanelRightOpen size={16} />
                  </Button>
                )}
              </div>
            </Panel>
            
            {rightPanelOpen && (
              <>
                <PanelResizeHandle className="w-1 hover:w-1 panel-resize-handle" />
                <Panel defaultSize={25} minSize={20}>
                  <div className="h-full flex flex-col">
                    <div className="border-b border-gray-200 bg-white">
                      <div className="flex">
                        <button
                          className={`flex-1 py-2 px-4 text-sm font-medium ${
                            rightPanelContent === 'properties'
                              ? 'text-indigo-600 border-b-2 border-indigo-500'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                          onClick={() => setRightPanelContent('properties')}
                        >
                          <div className="flex items-center justify-center">
                            <Layout size={16} className="mr-2" />
                            Properties
                          </div>
                        </button>
                        <button
                          className={`flex-1 py-2 px-4 text-sm font-medium ${
                            rightPanelContent === 'ai'
                              ? 'text-indigo-600 border-b-2 border-indigo-500'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                          onClick={() => setRightPanelContent('ai')}
                        >
                          <div className="flex items-center justify-center">
                            <Sparkles size={16} className="mr-2" />
                            AI
                          </div>
                        </button>
                        <button
                          className={`flex-1 py-2 px-4 text-sm font-medium ${
                            rightPanelContent === 'collaboration'
                              ? 'text-indigo-600 border-b-2 border-indigo-500'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                          onClick={() => setRightPanelContent('collaboration')}
                        >
                          <div className="flex items-center justify-center">
                            <Users size={16} className="mr-2" />
                            Team
                          </div>
                        </button>
                      </div>
                      <div className="flex">
                        <button
                          className={`flex-1 py-2 px-4 text-sm font-medium ${
                            rightPanelContent === 'templates'
                              ? 'text-indigo-600 border-b-2 border-indigo-500'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                          onClick={() => setRightPanelContent('templates')}
                        >
                          <div className="flex items-center justify-center">
                            <Sidebar size={16} className="mr-2" />
                            Templates
                          </div>
                        </button>
                        <button
                          className={`flex-1 py-2 px-4 text-sm font-medium ${
                            rightPanelContent === 'export'
                              ? 'text-indigo-600 border-b-2 border-indigo-500'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                          onClick={() => setRightPanelContent('export')}
                        >
                          <div className="flex items-center justify-center">
                            <Code size={16} className="mr-2" />
                            Export
                          </div>
                        </button>
                      </div>
                    </div>
                    {renderRightPanel()}
                  </div>
                </Panel>
              </>
            )}
          </PanelGroup>
        </DndContext>
      </div>
    </div>
  );
};

export default Editor;