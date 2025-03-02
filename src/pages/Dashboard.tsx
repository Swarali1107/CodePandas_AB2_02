import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, MoreVertical, Folder, Clock, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardBody } from '../components/ui/Card';
import { useUserStore } from '../store/userStore';
import Modal from '../components/ui/Modal';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { state, loadProjects, createProject } = useUserStore();
  const { projects, isLoading } = state;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);
  
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description &&
        project.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;
    
    const project = await createProject(newProjectName, newProjectDescription);
    setIsCreateModalOpen(false);
    setNewProjectName('');
    setNewProjectDescription('');
    
    // Navigate to the editor with the new project
    navigate(`/editor/${project.id}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">UI Designer</h1>
            </div>
            <div className="flex items-center">
              <div className="ml-4 flex items-center md:ml-6">
                <Button
                  variant="primary"
                  onClick={() => setIsCreateModalOpen(true)}
                  leftIcon={<Plus size={16} />}
                >
                  New Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Projects</h2>
            <div className="w-64">
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={16} className="text-gray-400" />}
              />
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <Folder className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No projects</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new project.
              </p>
              <div className="mt-6">
                <Button
                  variant="primary"
                  onClick={() => setIsCreateModalOpen(true)}
                  leftIcon={<Plus size={16} />}
                >
                  New Project
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  hoverable
                  onClick={() => navigate(`/editor/${project.id}`)}
                >
                  <div className="relative h-48 bg-gray-200">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Folder className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    <button className="absolute top-2 right-2 p-1 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100">
                      <MoreVertical size={16} className="text-gray-700" />
                    </button>
                  </div>
                  <CardBody>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {project.name}
                    </h3>
                    {project.description && (
                      <p className="text-sm text-gray-500 mb-3">{project.description}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>
                          {new Date(project.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Star size={14} className="mr-1" />
                        <span>{project.collaborators.length + 1} members</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Project"
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateProject}>
              Create Project
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Project Name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="My Awesome UI"
            fullWidth
          />
          <Input
            label="Description (optional)"
            value={newProjectDescription}
            onChange={(e) => setNewProjectDescription(e.target.value)}
            placeholder="A brief description of your project"
            fullWidth
          />
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;