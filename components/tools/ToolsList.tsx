import React from 'react';
import type { CombinedToolData } from '@/types/components/tools/ToolDataType';
import { HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';
import ToolsCard from './ToolsCard';

interface ToolsListProp {
  toolsListData: CombinedToolData; // Use CombinedToolData instead of ToolsListData
}

/**
 * @description This component displays a categorized list of tools.
 */
export default function ToolsList({ toolsListData }: ToolsListProp) {
  return (
    <div className='' data-testid='ToolsList-main'>
      {Object.keys(toolsListData).map((categoryName) => {
        if (toolsListData[categoryName]?.toolsList?.length > 0) {
          return (
            <div className='my-8' key={categoryName} id={categoryName}>
              <Heading typeStyle={HeadingTypeStyle.mdSemibold} className='my-2'>
                {categoryName}
              </Heading>
              <Paragraph typeStyle={ParagraphTypeStyle.md}>
                {toolsListData[categoryName].description}
              </Paragraph>
              <hr className='my-8' />
              <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'> {/* Fixed grid layout */}
                {toolsListData[categoryName].toolsList.map((tool, toolIndex) => (
                  <ToolsCard key={toolIndex} toolData={tool} />
                ))}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
