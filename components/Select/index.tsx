import React, {Fragment} from "react";
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

type SelectItem = {
  label: string,
  value: string,
}

type SelectProps = {
  selectedItem: String,
  items: Array<SelectItem>,
  onChange: Function,
  multiple: boolean,
  selectedItems: Array<SelectItem>
  labelText: String
}

const Select:React.FC<SelectProps> = ({
  onChange, items, selectedItem, multiple,labelText
})=>{
  const label = () => {
    if (multiple){
      return selectedItem?.length >1 ?  `${selectedItem?.length} selected`: items.find(item => item.value === selectedItem[0])?.label || labelText
    }
    return items.find(item => item.value === selectedItem)?.label
  }
  return(
    <Listbox value={selectedItem} onChange={onChange} multiple={multiple}>
    <div className="relative mt-1">
      <Listbox.Button className="focus:outline-none relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
        <span className="block truncate">{label()}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
          <Listbox.Options className="focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm z-10">
            {items.map(({value, label}, i) => (
              <Listbox.Option
                key={`item-${value}-${i}`}
                className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}`}
                value={value}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{label}</span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default Select