import React, { useState } from 'react';
import { Sparkles, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Card, CardHeader, CardBody } from '../ui/Card';
import { AIDesignSuggestion } from '../../types';
import { useCanvasStore } from '../../store/canvasStore';

const mockSuggestions: AIDesignSuggestion[] = [
  {
    id: '1',
    type: 'layout',
    description: 'Improve spacing between elements for better readability',
    preview: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '2',
    type: 'color',
    description: 'Use a more harmonious color palette with better contrast',
    preview: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '3',
    type: 'accessibility',
    description: 'Increase button size and add more descriptive labels',
    preview: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '4',
    type: 'responsive',
    description: 'Optimize layout for mobile devices with stacked elements',
    preview: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];

const AIPanel: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AIDesignSuggestion[]>(mockSuggestions);
  
  const handleGenerateSuggestions = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In a real implementation, this would call an AI service
      // and return actual suggestions based on the current design
    }, 1500);
  };
  
  const handleApplySuggestion = (suggestion: AIDesignSuggestion) => {
    // In a real implementation, this would apply the suggested changes
    // to the canvas components
    alert(`Applied suggestion: ${suggestion.description}`);
  };
  
  const handleFeedback = (suggestionId: string, isPositive: boolean) => {
    // In a real implementation, this would send feedback to improve the AI
    alert(`Feedback ${isPositive ? 'positive' : 'negative'} for suggestion ${suggestionId}`);
  };
  
  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-900 mb-2">AI Design Assistant</h2>
        <p className="text-sm text-gray-500 mb-4">
          Get AI-powered suggestions to improve your design's layout, colors, accessibility, and responsiveness.
        </p>
        
        <div className="flex mb-4">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to create or improve..."
            className="flex-1 mr-2"
          />
          <Button
            onClick={handleGenerateSuggestions}
            isLoading={isLoading}
            leftIcon={isLoading ? <RefreshCw className="animate-spin" /> : <Sparkles />}
          >
            Generate
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Suggestions</h3>
        
        {suggestions.map((suggestion) => (
          <Card key={suggestion.id} className="overflow-hidden">
            <CardHeader className="py-2 px-3 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium">{suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFeedback(suggestion.id, true)}
                    className="p-1"
                  >
                    <ThumbsUp size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFeedback(suggestion.id, false)}
                    className="p-1"
                  >
                    <ThumbsDown size={14} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              {suggestion.preview && (
                <img
                  src={suggestion.preview}
                  alt={`Preview for ${suggestion.description}`}
                  className="w-full h-32 object-cover"
                />
              )}
              <div className="p-3">
                <p className="text-sm text-gray-700 mb-3">{suggestion.description}</p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleApplySuggestion(suggestion)}
                  fullWidth
                >
                  Apply Changes
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIPanel;