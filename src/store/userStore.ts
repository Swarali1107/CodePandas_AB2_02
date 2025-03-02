import { create } from 'zustand';
import { User, Project } from '../types';

interface UserState {
  currentUser: User | null;
  projects: Project[];
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useUserStore = create<{
  state: UserState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  loadProjects: () => Promise<void>;
  createProject: (name: string, description?: string) => Promise<Project>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}>((set, get) => ({
  state: {
    currentUser: null,
    projects: [],
    isAuthenticated: false,
    isLoading: false,
  },
  
  login: async (email, password) => {
    set((state) => ({ state: { ...state.state, isLoading: true } }));
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock user data
    const user: User = {
      id: '1',
      name: 'Demo User',
      email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    };
    
    set((state) => ({
      state: {
        ...state.state,
        currentUser: user,
        isAuthenticated: true,
        isLoading: false,
      },
    }));
    
    // Load projects after login
    await get().loadProjects();
  },
  
  logout: () => {
    set((state) => ({
      state: {
        ...state.state,
        currentUser: null,
        projects: [],
        isAuthenticated: false,
      },
    }));
  },
  
  register: async (name, email, password) => {
    set((state) => ({ state: { ...state.state, isLoading: true } }));
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock user data
    const user: User = {
      id: '1',
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    };
    
    set((state) => ({
      state: {
        ...state.state,
        currentUser: user,
        isAuthenticated: true,
        isLoading: false,
      },
    }));
  },
  
  loadProjects: async () => {
    set((state) => ({ state: { ...state.state, isLoading: true } }));
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock projects data
    const projects: Project[] = [
      {
        id: '1',
        name: 'E-commerce Dashboard',
        description: 'Admin dashboard for an e-commerce platform',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        components: [],
        collaborators: [],
        owner: get().state.currentUser || {
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
        },
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '2',
        name: 'Social Media App',
        description: 'Mobile-first social media application',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        components: [],
        collaborators: [],
        owner: get().state.currentUser || {
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
        },
        thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
    ];
    
    set((state) => ({
      state: {
        ...state.state,
        projects,
        isLoading: false,
      },
    }));
  },
  
  createProject: async (name, description) => {
    set((state) => ({ state: { ...state.state, isLoading: true } }));
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const newProject: Project = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      components: [],
      collaborators: [],
      owner: get().state.currentUser || {
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
      },
      thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    };
    
    set((state) => ({
      state: {
        ...state.state,
        projects: [...state.state.projects, newProject],
        isLoading: false,
      },
    }));
    
    return newProject;
  },
  
  updateProject: async (id, updates) => {
    set((state) => ({ state: { ...state.state, isLoading: true } }));
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    set((state) => ({
      state: {
        ...state.state,
        projects: state.state.projects.map((project) =>
          project.id === id
            ? {
                ...project,
                ...updates,
                updatedAt: new Date().toISOString(),
              }
            : project
        ),
        isLoading: false,
      },
    }));
  },
  
  deleteProject: async (id) => {
    set((state) => ({ state: { ...state.state, isLoading: true } }));
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    set((state) => ({
      state: {
        ...state.state,
        projects: state.state.projects.filter((project) => project.id !== id),
        isLoading: false,
      },
    }));
  },
}));