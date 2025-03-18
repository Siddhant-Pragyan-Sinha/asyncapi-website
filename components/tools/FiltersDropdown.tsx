import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { Language, Technology } from '@/types/components/tools/ToolDataType';
import type { CategoryListItem } from '@/types/scripts/tools';

import Checkbox from './Checkbox';

type DataList = Language[] | Technology[] | CategoryListItem[]; // Fixed type definition

interface FiltersDropdownProps {
  dataList?: DataList;
  checkedOptions?: string[];
  setCheckedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
}

export default function FiltersDropdown({
  dataList = [],
  checkedOptions = [],
  setCheckedOptions,
  className = ''
}: FiltersDropdownProps) {
  const handleClickOption = (option: string) => {
    const isChecked = checkedOptions.includes(option);
    const updatedOptions = isChecked ? checkedOptions.filter((item) => item !== option) : [...checkedOptions, option];
    setCheckedOptions(updatedOptions);
  };

  return (
    <div
      className={twMerge(`max-w-lg flex gap-2 flex-wrap p-2 duration-200 delay-150 ${className}`)}
      data-testid='FiltersDropdown-div'
    >
      {dataList.map((data, index) => {
        const checked = checkedOptions.includes(data.name);
        return <Checkbox key={index} name={data.name} checked={checked} handleClickOption={handleClickOption} />;
      })}
    </div>
  );
}
