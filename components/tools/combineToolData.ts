import allTags from '../../config/all-tags.json';
import ManualData from '../../config/tools-manual.json';
import AutomatedData from '../../config/tools-automated.json';
import type { ToolData, CombinedToolData } from '@/types/components/tools/ToolDataType';

/**
 * Combines manual and automated tool data while preserving category structure.
 * @returns {CombinedToolData} Combined tool data grouped by categories.
 */
export const combineToolData = (): CombinedToolData => {
  const combined: CombinedToolData = {};

  // Process manual tools data
  for (const category in ManualData) {
    if (!combined[category]) {
      combined[category] = {
        description: (ManualData as any)[category].description || '',
        toolsList: []
      };
    }

    const tools = (ManualData as any)[category].toolsList;
    if (tools) {
      const processedTools = tools.map((tool: any) => {
        const updatedTool = {
          ...tool,
          filters: {
            ...tool.filters,
            language: tool.filters?.language ?
              (Array.isArray(tool.filters.language) ?
                tool.filters.language :
                [tool.filters.language]) :
              [],
            technology: tool.filters?.technology ?
              (Array.isArray(tool.filters.technology) ?
                tool.filters.technology :
                [tool.filters.technology]) :
              []
          }
        };

        // Add color and borderColor from allTags if language matches
        if (updatedTool.filters?.language && updatedTool.filters.language.length > 0) {
          updatedTool.filters.language = updatedTool.filters.language.map((lang: string) => {
            const matchedLang = allTags.languages.find((l: any) => l.name === lang);
            return matchedLang ?
              { name: lang, color: matchedLang.color, borderColor: matchedLang.borderColor } :
              { name: lang, color: '#ffffff', borderColor: '#000000' };
          });
        }

        // Add color and borderColor from allTags if technology matches
        if (updatedTool.filters?.technology && updatedTool.filters.technology.length > 0) {
          updatedTool.filters.technology = updatedTool.filters.technology.map((tech: string) => {
            const matchedTech = allTags.technologies.find((t: any) => t.name === tech);
            return matchedTech ?
              { name: tech, color: matchedTech.color, borderColor: matchedTech.borderColor } :
              { name: tech, color: '#ffffff', borderColor: '#000000' };
          });
        }

        return {
          title: updatedTool.title,
          description: updatedTool.description,
          links: updatedTool.links,
          filters: updatedTool.filters,
        };
      });

      combined[category].toolsList.push(...processedTools);
    }
  }

  // Process automated tools data
  for (const category in AutomatedData) {
    if (!combined[category]) {
      combined[category] = {
        description: (AutomatedData as any)[category].description || '',
        toolsList: []
      };
    }

    const tools = (AutomatedData as any)[category].toolsList;
    if (tools) {
      const processedTools = tools.map((tool: any) => {
        const updatedTool = {
          ...tool,
          filters: {
            ...tool.filters,
            language: tool.filters?.language ?
              (Array.isArray(tool.filters.language) ?
                tool.filters.language :
                [tool.filters.language]) :
              [],
            technology: tool.filters?.technology ?
              (Array.isArray(tool.filters.technology) ?
                tool.filters.technology :
                [tool.filters.technology]) :
              []
          }
        };

        // Add color and borderColor from allTags if language matches
        if (updatedTool.filters?.language && updatedTool.filters.language.length > 0) {
          updatedTool.filters.language = updatedTool.filters.language.map((lang: string) => {
            const matchedLang = allTags.languages.find((l: any) => l.name === lang);
            return matchedLang ?
              { name: lang, color: matchedLang.color, borderColor: matchedLang.borderColor } :
              { name: lang, color: '#ffffff', borderColor: '#000000' };
          });
        }

        // Add color and borderColor from allTags if technology matches
        if (updatedTool.filters?.technology && updatedTool.filters.technology.length > 0) {
          updatedTool.filters.technology = updatedTool.filters.technology.map((tech: string) => {
            const matchedTech = allTags.technologies.find((t: any) => t.name === tech);
            return matchedTech ?
              { name: tech, color: matchedTech.color, borderColor: matchedTech.borderColor } :
              { name: tech, color: '#ffffff', borderColor: '#000000' };
          });
        }

        return {
          title: updatedTool.title,
          description: updatedTool.description,
          links: updatedTool.links,
          filters: updatedTool.filters,
        };
      });

      combined[category].toolsList.push(...processedTools);
    }
  }

  return combined;
};
