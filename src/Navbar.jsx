import React, { useState } from 'react';
import { X, Plus, Minus, Square, MoreHorizontal,Pause,StepBackIcon, Backpack } from 'lucide-react';
import back from './assets/back.png'

const Navbar = () => {
  const [tabs, setTabs] = useState([
    { id: 1, title: 'New Tab', isActive: true, favicon: '' }
  ]);

  const addNewTab = () => {
    const newTab = {
      id: tabs.length + 1,
      title: 'New Tab',
      isActive: false,
      favicon: '🌐'
    };
    setTabs([...tabs, newTab]);
  };

  const closeTab = (tabId) => {
    if (tabs.length > 1) {
      setTabs(tabs.filter(tab => tab.id !== tabId));
    }
  };

  const setActiveTab = (tabId) => {
    setTabs(tabs.map(tab => ({
      ...tab,
      isActive: tab.id === tabId
    })));
  };

  return (
    <div>
    <div className="w-full bg-gradient-to-b from-gray-100 to-gray-200 border-b border-gray-300">
     
      

      {/* Tab Bar */}
      <div className="flex items-end h-10 px-1 bg-gradient-to-b from-gray-100 to-gray-200">
        {/* Tabs */}
        <div className='pr-3 -pt-3'>
<img src={back} width="20px" alt="" />
        </div>
        
        <div className="flex items-end flex-1">
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              className={`group relative flex items-center h-8 min-w-0 max-w-60 px-3 cursor-pointer transition-all duration-200 ${
                tab.isActive
                  ? 'bg-white border-t border-l border-r border-gray-300 rounded-t-lg z-10 shadow-sm'
                  : ' border border-gray-300 rounded-t-lg hover:bg-gradient-to-b hover:from-gray-100 hover:to-gray-150 ml-[-1px]'
              }`}
              style={{
                clipPath: tab.isActive ? 'none' : 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)'
              }}
              onClick={() => setActiveTab(tab.id)}
            >
             
              <span className="text-xs mr-2 flex-shrink-0">{tab.favicon}</span>
              
             
              <span className="truncate text-xs text-gray-700 flex-1 min-w-0">
                {tab.title}
              </span>
              
              {/* Close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                className={`ml-2 p-0.5 rounded hover:bg-gray-300 transition-all duration-200 flex-shrink-0 ${
                  tab.isActive ? 'opacity-60 hover:opacity-100' : 'opacity-0 group-hover:opacity-60 group-hover:hover:opacity-100'
                }`}
              >
                <X size={10} className="text-gray-600" />
              </button>
            </div>
          ))}
          
          {/* New Tab Button */}
          <button
            onClick={addNewTab}
            className="flex items-center justify-center w-8 h-6 ml-1 rounded-t hover:bg-gray-300 transition-colors duration-200 bg-gradient-to-b from-gray-150 to-gray-200"
          >
            <Plus size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-1 -mt-3 pr-2">
         <div className="hidden md:flex items-center space-x-1">
          <button className="p-1 hover:bg-gray-200 rounded text-gray-600">
            <Minus size={14} />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded text-gray-600">
            <Square size={14} />
          </button>
          <button className="p-1 hover:bg-red-500 hover:text-white rounded text-gray-600">
            <X size={14} />
          </button>
        </div>
        </div>
      </div>
     
    </div>
    
         <div className='flex gap-3 justify-end px-10 font-[600] pt-3'>
        <div>Gmail</div>
        <div>Image</div>
        <div> <Pause size={20} className="text-gray-600 mt-1" /></div>
      </div>
    </div>
  );
};

export default Navbar;