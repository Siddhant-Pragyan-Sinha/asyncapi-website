import React from 'react';
import type { CombinedToolData } from '@/types/components/tools/ToolDataType';

import ToolsDataList from '../../config/tools.json';

interface CategoryDropdownProps {
  setopenCategory: React.Dispatch<React.SetStateAction<boolean>>;
}

// Safer type assertion with error suppression
const ToolsData = ToolsDataList as unknown as CombinedToolData;

export default function CategoryDropdown({ setopenCategory }: CategoryDropdownProps) {
  return (
    <div
      className='absolute z-10 h-60 w-52 origin-top-right overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none lg:w-56'
      role='menu'
      data-testid='CategoryDropdown-div'
    >
      <div className='py-1' role='none'>
        {Object.keys(ToolsData).map((categoryName, index) => {
          if (ToolsData[categoryName].toolsList.length > 0) {
            return (
              <div key={index} onClick={() => setopenCategory(false)}>
                <a
                  href={`#${categoryName}`}
                  className='block px-4 py-2 hover:bg-gray-100'
                  data-testid='CategoryDropdown-link'
                >
                  {categoryName}
                </a>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
