import React, { useState } from 'react';
import classNames from 'classnames';

interface Tab {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  onChange,
  variant = 'default',
  className,
}) => {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  const getTabHeaderClasses = (tabId: string) => {
    const isActive = activeTabId === tabId;
    
    switch (variant) {
      case 'pills':
        return classNames(
          'px-3 py-2 text-sm font-medium rounded-md',
          isActive
            ? 'bg-indigo-100 text-indigo-700'
            : 'text-gray-500 hover:text-gray-700'
        );
      case 'underline':
        return classNames(
          'px-1 py-2 text-sm font-medium border-b-2',
          isActive
            ? 'border-indigo-500 text-indigo-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        );
      default:
        return classNames(
          'px-4 py-2 text-sm font-medium rounded-t-lg',
          isActive
            ? 'bg-white text-indigo-600 border-l border-t border-r border-gray-200'
            : 'bg-gray-50 text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        );
    }
  };

  return (
    <div className={className}>
      <div className={classNames('flex', variant === 'underline' && 'border-b border-gray-200')}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={getTabHeaderClasses(tab.id)}
            onClick={() => handleTabClick(tab.id)}
            role="tab"
            aria-selected={activeTabId === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-2">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`tabpanel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            className={tab.id === activeTabId ? 'block' : 'hidden'}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;

export { Tabs }