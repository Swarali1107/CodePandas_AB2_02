export interface ComponentDefinition {
  id: string;
  type: string;
  name: string;
  icon: string;
  props: Record<string, any>;
  children?: ComponentInstance[];
  allowsChildren?: boolean;
  defaultProps?: Record<string, any>;
}

export interface ComponentInstance extends ComponentDefinition {
  parentId?: string;
  position?: {
    x: number;
    y: number;
  };
  size?: {
    width: number | string;
    height: number | string;
  };
  style?: Record<string, any>;
}

export interface CanvasState {
  components: ComponentInstance[];
  selectedId: string | null;
  history: {
    past: ComponentInstance[][];
    future: ComponentInstance[][];
  };
  viewMode: 'edit' | 'preview';
  deviceType: 'desktop' | 'tablet' | 'mobile';
  zoom: number;
  showGrid: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  components: ComponentInstance[];
  collaborators: User[];
  owner: User;
  thumbnail?: string;
}

export interface AIDesignSuggestion {
  id: string;
  type: 'layout' | 'color' | 'accessibility' | 'responsive';
  description: string;
  preview?: string;
  components?: ComponentInstance[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  components: ComponentInstance[];
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
}

export interface BreakPoint {
  id: string;
  name: string;
  width: number;
}

export interface HistoryAction {
  type: string;
  payload: any;
}