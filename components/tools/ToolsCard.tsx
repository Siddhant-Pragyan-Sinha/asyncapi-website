import React, { useEffect, useRef, useState } from 'react';

import type { ToolData, VisibleDataListType, ToolCategory, TagItem } from '../../types/components/tools/ToolDataType';
import { HeadingTypeStyle } from '../../types/typography/Heading';
import { ParagraphTypeStyle } from '../../types/typography/Paragraph';

// Import both manual and automated tools data
import ManualData from '../../config/tools-manual.json';
import AutomatedData from '../../config/tools-automated.json';
import Data from '../../scripts/tools/tools-schema.json';

import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';
import { CardData } from './CardData';
import Tag from './Tags';

interface ToolsCardProp {
  toolData: ToolData;
}

/**
 * @description This component displays a card for a tool.
 *
 * @param {ToolsCardProp} props - Props for the ToolsCard component.
 * @param {ToolData} props.toolData - Data of the tool.
 */
const combineToolData = () => {
  const combined: ToolData[] = [];

  // Add manual tools
  for (const category in ManualData) {
    const tools = (ManualData as any)[category].toolsList;
    if (tools) {
      combined.push(...tools.map((tool: any) => ({
        ...tool,
        filters: {
          ...tool.filters,
          language: tool.filters?.language ? [{ name: tool.filters.language, color: '#ffffff', borderColor: '#000000' }] : undefined,
          technology: tool.filters?.technology?.map((tech: string) => ({ name: tech, color: '#ffffff', borderColor: '#000000' }))
        }
      })));
    }
  }

  // Add automated tools
  for (const category in AutomatedData) {
    const tools = (AutomatedData as any)[category].toolsList;
    if (tools) {
      combined.push(...tools.map((tool: any) => ({
        ...tool,
        filters: {
          ...tool.filters,
          language: tool.filters?.language ? [{ name: tool.filters.language, color: '#ffffff', borderColor: '#000000' }] : undefined,
          technology: tool.filters?.technology?.map((tech: string) => ({ name: tech, color: '#ffffff', borderColor: '#000000' }))
        }
      })));
    }
  }

  return combined;
};

export default function ToolsCard({ toolData }: ToolsCardProp) {
  // Use combined data if no specific toolData is provided
  const data = toolData || combineToolData();
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [isTruncated, setIsTruncated] = useState<boolean>(false);
  const [readMore, setReadMore] = useState<boolean>(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  // Decide whether to show full description or not in the card based on the number of lines occupied by the description.
  useEffect(() => {
    if (descriptionRef.current) {
      setIsTruncated(descriptionRef.current?.scrollHeight! > descriptionRef.current?.clientHeight!);
    }
  }, [descriptionRef.current]);

  let onGit = false;

  if (toolData?.links?.repoUrl) {
    const url = new URL(toolData.links.repoUrl);

    if (url.host === 'github.com') {
      onGit = true;
    } else {
      onGit = false;
    }
  }

  const [visible, setVisible] = useState<VisibleDataListType>({
    lang: false,
    tech: false,
    desc: false,
    category: false,
    pricing: false,
    ownership: false
  });

  // Handle both single tool and array of tools
  const tools = Array.isArray(data) ? data : [data];

  // Check for language and technology data
  const hasLanguageData = tools.some(tool => tool.filters?.language && tool.filters.language.length > 0);
  const hasTechnologyData = tools.some(tool => tool.filters?.technology && tool.filters.technology.length > 0);

  return (
    <div className='flex h-auto flex-col rounded-lg border shadow-md'>
      {tools.map((tool, index) => (
        <div key={index} className="w-full">
          <div className='mb-6 px-6 pt-8'>
            <div className='flex flex-col gap-2'>
              <div className='flex w-full justify-between gap-4'>
                <Heading typeStyle={HeadingTypeStyle.smSemibold}>{tool.title}</Heading>
                <div
                  className='size-fit min-w-[5.3rem] rounded-md border border-green-600 bg-green-100 p-1 text-center text-xs text-green-600'
                  onMouseEnter={() => setVisible({ ...visible, desc: true })}
                  onMouseLeave={() => setVisible({ ...visible, desc: false })}
                >
                  <span className='group relative'>
                    {tool.filters?.hasCommercial === false ? 'Open Source' : 'Commercial'}
                    {visible.desc && (
                      <span className='absolute -left-2/3 top-8 z-10 w-48 -translate-x-12 rounded border border-gray-200 bg-white px-2 py-1 text-left text-gray-700 shadow-md'>
                        {Data.properties.filters.properties.hasCommercial.description}
                      </span>
                    )}
                  </span>
                </div>
              </div>
              <div className='relative'>
                <Paragraph typeStyle={ParagraphTypeStyle.sm}>
                  <span
                    className={`w-full ${isTruncated ? 'cursor-pointer' : ''}`}
                    onMouseEnter={() => isTruncated && setShowDescription(true)}
                  >
                    <span
                      ref={descriptionRef}
                      className={`line-clamp-3 inline-block ${isTruncated && 'after:ml-1 after:content-["..."]'}`}
                    >
                      {tool.description}
                    </span>
                  </span>
                </Paragraph>

                {showDescription && (
                  <div
                    className='absolute top-0 z-10 w-full border border-gray-200 bg-white p-2 shadow-md'
                    onMouseLeave={() => setShowDescription(false)}
                  >
                    <Paragraph typeStyle={ParagraphTypeStyle.sm}>
                      {tool.description}
                    </Paragraph>
                  </div>
                )}
              </div>
            </div>
          </div>
          <hr className='mx-6' />
          <div className='grow flex flex-col'>
            {(hasLanguageData || hasTechnologyData) ? (
              <div className='my-6'>
                {hasLanguageData && (
                  <div className='mx-6 flex flex-col gap-2'>
                    <CardData
                      className='text-sm'
                      heading='LANGUAGE'
                      data={Data.properties.filters.properties.language.description}
                      type='lang'
                      visible={visible}
                      setVisible={setVisible}
                      read={readMore}
                      setRead={setReadMore}
                    />
                {tool.filters?.language && (
                  <div className='flex gap-2'>
                    {Array.isArray(tool.filters.language)
                      ? tool.filters.language.map((item: string | TagItem, index: number) => (
                          <Tag
                            key={index}
                            name={typeof item === 'string' ? item : item.name}
                            bgColor={typeof item === 'string' ? '#ffffff' : item.color}
                            borderColor={typeof item === 'string' ? '#000000' : item.borderColor}
                          />
                        ))
                      : <Tag
                          name={tool.filters.language}
                          bgColor="#ffffff"
                          borderColor="#000000"
                        />
                    }
                  </div>
                )}

                  </div>
                )}
                {hasTechnologyData && (
                  <div className='mx-6 my-4 flex flex-col gap-2'>
                    <CardData
                      className='text-sm'
                      heading='TECHNOLOGIES'
                      data={Data.properties.filters.properties.technology.description}
                      type='tech'
                      visible={visible}
                      setVisible={setVisible}
                      read={readMore}
                      setRead={setReadMore}
                    />
                    <div className='flex flex-wrap gap-2'>
                    {tool.filters?.technology && (
                      <div className='flex flex-wrap gap-2'>
                        {Array.isArray(tool.filters.technology)
                          ? tool.filters.technology.map((item: string | TagItem, index: number) => (
                              <Tag
                                key={index}
                                name={typeof item === 'string' ? item : item.name}
                                bgColor={typeof item === 'string' ? '#ffffff' : item.color}
                                borderColor={typeof item === 'string' ? '#000000' : item.borderColor}
                              />
                            ))
                          : <Tag
                              name={tool.filters.technology}
                              bgColor="#ffffff"
                              borderColor="#000000"
                            />
                        }
                      </div>
                    )}

                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className='relative size-full p-8 text-center text-gray-700'>
                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                  No further details provided
                </div>
              </div>
            )}
          </div>
          {(tool.links?.repoUrl || tool.links?.websiteUrl || tool.links?.docsUrl) && (
            <>
              <hr />
              <div className='flex'>
                {tool.links.repoUrl && (
                  <>
                    {onGit ? (
                      <a
                        className='w-full cursor-pointer border-x px-1 py-6 text-center hover:bg-gray-200 flex items-center justify-center'
                        href={tool.links.repoUrl}
                        target='_blank'
                        rel='noreferrer'
                        data-testid='ToolsCard-repoUrl'
                      >
                        <div className='m-auto flex w-fit gap-2'>
                          <img src='/img/logos/github-black.svg' alt='GitHub' className='w-5' />
                          <div className='text-sm text-gray-700'>View Github</div>
                        </div>
                      </a>
                    ) : (
                      <a
                        className='w-full cursor-pointer border-x border-gray-200 px-1 py-6 text-center hover:bg-gray-200'
                        href={tool.links.repoUrl}
                        target='_blank'
                        rel='noreferrer'
                      >
                        <div className='m-auto flex w-fit gap-2'>
                          <div className='text-sm text-gray-700'>View Source Code</div>
                        </div>
                      </a>
                    )}
                  </>
                )}
                {tool.links.websiteUrl && (
                    <a
                      className='w-full cursor-pointer border-x border-gray-200 px-1 py-6 text-center hover:bg-gray-200 flex items-center justify-center'
                      href={tool.links.websiteUrl}
                      target='_blank'
                      rel='noreferrer'
                      data-testid='ToolsCard-websiteUrl'
                    >

                    <div className='m-auto flex w-fit gap-2'>
                      <img src='/img/illustrations/icons/share.svg' alt='Share' className='w-5' />
                      <div className='text-sm text-gray-700'>Visit Website</div>
                    </div>
                  </a>
                )}
                {tool.links.docsUrl && (
                  <a
                    className='w-full cursor-pointer border-x border-gray-200 px-1 py-6 text-center hover:bg-gray-200 flex items-center justify-center'
                    href={tool.links.docsUrl}
                    target='_blank'
                    rel='noreferrer'
                    data-testid='ToolsCard-docsUrl'
                  >
                    <div className='m-auto flex w-fit gap-2'>
                      <img src='/img/illustrations/icons/docs-icon.svg' alt='Docs' className='w-5' />
                      <div className='text-sm text-gray-700'>Visit Docs</div>
                    </div>
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
