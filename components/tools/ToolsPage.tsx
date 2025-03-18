import { useMemo, useState } from 'react';
import { combineToolData } from './combineToolData';
import Filters from './Filters';
import ToolsDashboard from './ToolsDashboard';
import type { Language, Technology, CombinedToolData } from '@/types/components/tools/ToolDataType';

/**
 * @description Parent component for the Tools page that manages data and filters.
 */
const ToolsPage = () => {
  // Combine tool data once at the parent level
  const toolsData: CombinedToolData = combineToolData();

  // Extract unique languages and technologies for filters
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

  // State for filter panel visibility
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="tools-page-container">
      {/* Filters component with dynamic lists */}
      <Filters
        setOpenFilter={setIsFilterOpen}
        languageList={languageList}
        technologyList={technologyList}
      />

      {/* Tools dashboard with pre-combined data */}
      <ToolsDashboard toolsData={toolsData} />
    </div>
  );
};

export default ToolsPage;
