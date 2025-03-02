import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { CanvasState, ComponentInstance } from '../types';

const initialState: CanvasState = {
  components: [],
  selectedId: null,
  history: {
    past: [],
    future: [],
  },
  viewMode: 'edit',
  deviceType: 'desktop',
  zoom: 1,
  showGrid: true,
};

export const useCanvasStore = create<{
  state: CanvasState;
  addComponent: (component: Omit<ComponentInstance, 'id'>) => void;
  updateComponent: (id: string, updates: Partial<ComponentInstance>) => void;
  removeComponent: (id: string) => void;
  selectComponent: (id: string | null) => void;
  moveComponent: (id: string, parentId: string | undefined, index: number) => void;
  setViewMode: (mode: 'edit' | 'preview') => void;
  setDeviceType: (type: 'desktop' | 'tablet' | 'mobile') => void;
  setZoom: (zoom: number) => void;
  toggleGrid: () => void;
  undo: () => void;
  redo: () => void;
  clearCanvas: () => void;
  loadComponents: (components: ComponentInstance[]) => void;
}>((set, get) => ({
  state: initialState,
  
  addComponent: (component) => {
    set((state) => {
      const newComponent = {
        ...component,
        id: nanoid(),
      };
      
      const newComponents = [...state.state.components, newComponent];
      
      return {
        state: {
          ...state.state,
          components: newComponents,
          history: {
            past: [...state.state.history.past, state.state.components],
            future: [],
          },
        },
      };
    });
  },
  
  updateComponent: (id, updates) => {
    set((state) => {
      const newComponents = state.state.components.map((component) =>
        component.id === id ? { ...component, ...updates } : component
      );
      
      return {
        state: {
          ...state.state,
          components: newComponents,
          history: {
            past: [...state.state.history.past, state.state.components],
            future: [],
          },
        },
      };
    });
  },
  
  removeComponent: (id) => {
    set((state) => {
      // Remove the component and its children recursively
      const removeComponentAndChildren = (components: ComponentInstance[], id: string): ComponentInstance[] => {
        const filtered = components.filter((component) => component.id !== id);
        const childrenToRemove = components.filter((component) => component.parentId === id);
        
        return childrenToRemove.reduce(
          (acc, child) => removeComponentAndChildren(acc, child.id),
          filtered
        );
      };
      
      const newComponents = removeComponentAndChildren(state.state.components, id);
      
      return {
        state: {
          ...state.state,
          components: newComponents,
          selectedId: state.state.selectedId === id ? null : state.state.selectedId,
          history: {
            past: [...state.state.history.past, state.state.components],
            future: [],
          },
        },
      };
    });
  },
  
  selectComponent: (id) => {
    set((state) => ({
      state: {
        ...state.state,
        selectedId: id,
      },
    }));
  },
  
  moveComponent: (id, parentId, index) => {
    set((state) => {
      const component = state.state.components.find((c) => c.id === id);
      if (!component) return state;
      
      // Remove the component from its current position
      const componentsWithoutMoved = state.state.components.filter((c) => c.id !== id);
      
      // Update the component with its new parent
      const updatedComponent = {
        ...component,
        parentId,
      };
      
      // Insert the component at the new position
      const newComponents = [...componentsWithoutMoved];
      
      // Find the index where to insert the component
      let insertIndex = 0;
      if (parentId) {
        // Find the last child of the parent
        const parentChildren = componentsWithoutMoved.filter((c) => c.parentId === parentId);
        if (parentChildren.length > 0) {
          const lastChildIndex = componentsWithoutMoved.findIndex(
            (c) => c.id === parentChildren[parentChildren.length - 1].id
          );
          insertIndex = lastChildIndex + 1;
        } else {
          // Insert after the parent
          const parentIndex = componentsWithoutMoved.findIndex((c) => c.id === parentId);
          insertIndex = parentIndex + 1;
        }
      }
      
      newComponents.splice(insertIndex, 0, updatedComponent);
      
      return {
        state: {
          ...state.state,
          components: newComponents,
          history: {
            past: [...state.state.history.past, state.state.components],
            future: [],
          },
        },
      };
    });
  },
  
  setViewMode: (mode) => {
    set((state) => ({
      state: {
        ...state.state,
        viewMode: mode,
      },
    }));
  },
  
  setDeviceType: (type) => {
    set((state) => ({
      state: {
        ...state.state,
        deviceType: type,
      },
    }));
  },
  
  setZoom: (zoom) => {
    set((state) => ({
      state: {
        ...state.state,
        zoom: Math.max(0.25, Math.min(2, zoom)),
      },
    }));
  },
  
  toggleGrid: () => {
    set((state) => ({
      state: {
        ...state.state,
        showGrid: !state.state.showGrid,
      },
    }));
  },
  
  undo: () => {
    set((state) => {
      const { past, future } = state.state.history;
      if (past.length === 0) return state;
      
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      
      return {
        state: {
          ...state.state,
          components: previous,
          history: {
            past: newPast,
            future: [state.state.components, ...future],
          },
        },
      };
    });
  },
  
  redo: () => {
    set((state) => {
      const { past, future } = state.state.history;
      if (future.length === 0) return state;
      
      const next = future[0];
      const newFuture = future.slice(1);
      
      return {
        state: {
          ...state.state,
          components: next,
          history: {
            past: [...past, state.state.components],
            future: newFuture,
          },
        },
      };
    });
  },
  
  clearCanvas: () => {
    set((state) => ({
      state: {
        ...state.state,
        components: [],
        selectedId: null,
        history: {
          past: [...state.state.history.past, state.state.components],
          future: [],
        },
      },
    }));
  },
  
  loadComponents: (components) => {
    set((state) => ({
      state: {
        ...state.state,
        components,
        history: {
          past: [...state.state.history.past, state.state.components],
          future: [],
        },
      },
    }));
  },
}));