import React from 'react';
import { combineToolData } from './combineToolData';
import ToolsCard from './ToolsCard';
import type { CombinedToolData } from '@/types/components/tools/ToolDataType';

const ToolsDashboard: React.FC = () => {
  const toolsData: CombinedToolData = combineToolData();

  return (
    <div>
      {Object.entries(toolsData).map(([category, categoryData]) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{category}</h2>
          <p className="mb-4">{categoryData.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryData.toolsList.map((tool, index) => (
              <ToolsCard key={`${category}-${index}`} toolData={tool} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolsDashboard;
