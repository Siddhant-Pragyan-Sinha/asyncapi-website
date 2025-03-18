import React from 'react';
import type { CombinedToolData } from '@/types/components/tools/ToolDataType';
import { HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';
import ToolsCard from './ToolsCard';

interface ToolsDashboardProps {
  toolsData: CombinedToolData; // Prop for combined tools data
}

/**
 * @description This component displays a categorized list of tools.
 *
 * @param {ToolsDashboardProps} props - Props for the ToolsDashboard component.
 * @param {CombinedToolData} props.toolsData - Combined tools data grouped by categories.
 */
const ToolsDashboard: React.FC<ToolsDashboardProps> = ({ toolsData }) => {
  return (
    <div className="tools-dashboard" data-testid="ToolsDashboard-main">
      {Object.entries(toolsData).map(([categoryName, categoryData]) => {
        if (categoryData?.toolsList?.length > 0) {
          return (
            <div key={categoryName} className="mb-8" id={categoryName}>
              <Heading typeStyle={HeadingTypeStyle.mdSemibold} className="my-2">
                {categoryName}
              </Heading>
              <Paragraph typeStyle={ParagraphTypeStyle.md}>
                {categoryData.description}
              </Paragraph>
              <hr className="my-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryData.toolsList.map((tool, index) => (
                  <ToolsCard key={`${categoryName}-${index}`} toolData={tool} />
                ))}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ToolsDashboard;
