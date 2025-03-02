import React, { useState } from 'react';
import { Code, Download, Copy, Check } from 'lucide-react';
import Button from '../ui/Button';
import { Tabs } from '../ui/Tabs';
import { useCanvasStore } from '../../store/canvasStore';

const ExportPanel: React.FC = () => {
  const { state } = useCanvasStore();
  const { components } = state;
  
  const [copied, setCopied] = useState(false);
  
  const generateReactCode = () => {
    // This is a simplified implementation
    // A real implementation would generate proper React components
    
    const indent = (level: number) => '  '.repeat(level);
    
    const generateComponentCode = (component: any, level: number = 0): string => {
      switch (component.type) {
        case 'container':
          return `${indent(level)}<div className="${component.props.className || ''}">\n${
            component.children?.map((child: any) => generateComponentCode(child, level + 1)).join('\n') || ''
          }\n${indent(level)}</div>`;
        
        case 'row':
          return `${indent(level)}<div className="${component.props.className || ''}">\n${
            component.children?.map((child: any) => generateComponentCode(child, level + 1)).join('\n') || ''
          }\n${indent(level)}</div>`;
        
        case 'column':
          return `${indent(level)}<div className="${component.props.className || ''}">\n${
            component.children?.map((child: any) => generateComponentCode(child, level + 1)).join('\n') || ''
          }\n${indent(level)}</div>`;
        
        case 'text':
          return `${indent(level)}<p className="${component.props.className || ''}">${component.props.content || ''}</p>`;
        
        case 'heading':
          const HeadingTag = component.props.level || 'h2';
          return `${indent(level)}<${HeadingTag} className="${component.props.className || ''}">${component.props.content || ''}</${HeadingTag}>`;
        
        case 'image':
          return `${indent(level)}<img src="${component.props.src || ''}" alt="${component.props.alt || ''}" className="${component.props.className || ''}" />`;
        
        case 'button':
          return `${indent(level)}<button className="${component.props.className || ''}">${component.props.content || ''}</button>`;
        
        default:
          return `${indent(level)}<!-- Component type ${component.type} not supported -->`;
      }
    };
    
    const rootComponents = components.filter((c) => !c.parentId);
    
    const componentCode = rootComponents.map((component) => generateComponentCode(component)).join('\n\n');
    
    return `import React from 'react';

function MyComponent() {
  return (
${componentCode.split('\n').map(line => `    ${line}`).join('\n')}
  );
}

export default MyComponent;`;
  };
  
  const generateHTMLCode = () => {
    // This is a simplified implementation
    // A real implementation would generate proper HTML
    
    const indent = (level: number) => '  '.repeat(level);
    
    const generateComponentCode = (component: any, level: number = 0): string => {
      switch (component.type) {
        case 'container':
        case 'row':
        case 'column':
          return `${indent(level)}<div class="${component.props.className?.replace(/\bflex\b/g, 'display: flex') || ''}">\n${
            component.children?.map((child: any) => generateComponentCode(child, level + 1)).join('\n') || ''
          }\n${indent(level)}</div>`;
        
        case 'text':
          return `${indent(level)}<p class="${component.props.className || ''}">${component.props.content || ''}</p>`;
        
        case 'heading':
          const HeadingTag = component.props.level || 'h2';
          return `${indent(level)}<${HeadingTag} class="${component.props.className || ''}">${component.props.content || ''}</${HeadingTag}>`;
        
        case 'image':
          return `${indent(level)}<img src="${component.props.src || ''}" alt="${component.props.alt || ''}" class="${component.props.className || ''}" />`;
        
        case 'button':
          return `${indent(level)}<button class="${component.props.className || ''}">${component.props.content || ''}</button>`;
        
        default:
          return `${indent(level)}<!-- Component type ${component.type} not supported -->`;
      }
    };
    
    const rootComponents = components.filter((c) => !c.parentId);
    
    const componentCode = rootComponents.map((component) => generateComponentCode(component)).join('\n\n');
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Design</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body>
${componentCode.split('\n').map(line => `  ${line}`).join('\n')}
</body>
</html>`;
  };
  
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDownloadCode = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const reactCode = generateReactCode();
  const htmlCode = generateHTMLCode();
  
  return (
    <div className="h-full overflow-y-auto p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Export</h2>
      
      <Tabs
        tabs={[
          {
            id: 'react',
            label: (
              <div className="flex items-center">
                <Code size={16} className="mr-2" />
                React
              </div>
            ),
            content: (
              <div className="mt-4">
                <div className="flex justify-between mb-2">
                  <h3 className="text-sm font-medium">React JSX</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyCode(reactCode)}
                      leftIcon={copied ? <Check size={16} /> : <Copy size={16} />}
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownloadCode(reactCode, 'MyComponent.jsx')}
                      leftIcon={<Download size={16} />}
                    >
                      Download
                    </Button>
                  </div>
                </div>
                <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto text-xs">
                  <code>{reactCode}</code>
                </pre>
              </div>
            ),
          },
          {
            id: 'html',
            label: (
              <div className="flex items-center">
                <Code size={16} className="mr-2" />
                HTML
              </div>
            ),
            content: (
              <div className="mt-4">
                <div className="flex justify-between mb-2">
                  <h3 className="text-sm font-medium">HTML</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyCode(htmlCode)}
                      leftIcon={copied ? <Check size={16} /> : <Copy size={16} />}
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownloadCode(htmlCode, 'index.html')}
                      leftIcon={<Download size={16} />}
                    >
                      Download
                    </Button>
                  </div>
                </div>
                <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto text-xs">
                  <code>{htmlCode}</code>
                </pre>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default ExportPanel;