import { useMemo, useState } from 'react';
import { combineToolData } from './combineToolData';
import Filters from './Filters';
import ToolsList from './ToolsList';
import type { Language, Technology, CombinedToolData } from '@/types/components/tools/ToolDataType';

/**
 * @description This is the parent component for the Tools page.
 * It combines tool data, extracts unique languages/technologies, and manages filter state.
 */
const ToolsPage = () => {
  // Combine manual and automated tool data
  const toolsData: CombinedToolData = combineToolData();

  // Extract unique languages and technologies
  const { languageList, technologyList } = useMemo(() => {
    const allLanguages = new Set<string>();
    const allTechnologies = new Set<string>();

    Object.values(toolsData).forEach((category) => {
      category.toolsList.forEach((tool) => {
        tool.filters.language?.forEach((lang) => allLanguages.add(lang.name));
        tool.filters.technology?.forEach((tech) => allTechnologies.add(tech.name));
      });
    });

    return {
      languageList: Array.from(allLanguages).map((name) => ({ name, popularity: 0 })),
      technologyList: Array.from(allTechnologies).map((name) => ({ name, type: 'unknown' }))
    };
  }, [toolsData]);

  // State for managing filter visibility
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div>
      {/* Filters Component */}
      <Filters
        setOpenFilter={setIsFilterOpen}
        languageList={languageList}
        technologyList={technologyList}
      />

      {/* ToolsList Component */}
      <ToolsList toolsListData={toolsData} />
    </div>
  );
};

export default ToolsPage;
