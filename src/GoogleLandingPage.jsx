import React, { useState } from 'react';
import { Search, Mic, Camera, Grid3X3, User, Bookmark, Plus, X, ArrowLeft, ArrowRight, RotateCcw, Star, FileText, Minimize, Maximize, Settings } from 'lucide-react';

const GoogleLandingPage = () => {
  const [tabs, setTabs] = useState([
    { id: 1, title: 'New Tab', isActive: true, url: '' }
  ]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [nextTabId, setNextTabId] = useState(2);
  const [searchValue, setSearchValue] = useState('');

  const shortcuts = [
    { name: 'WhatsApp', icon: '💬', color: 'bg-green-500', url: 'https://web.whatsapp.com' },
    { name: 'ChatGPT', icon: '🤖', color: 'bg-gray-700', url: 'https://chat.openai.com' },
    { name: 'Claude', icon: '🟠', color: 'bg-orange-500', url: 'https://claude.ai' },
    { name: 'Grok', icon: '🚀', color: 'bg-gray-800', url: 'https://x.com/grok' },
    { name: 'YouTube', icon: '▶️', color: 'bg-red-600', url: 'https://youtube.com' },
    { name: 'GitHub', icon: '🐱', color: 'bg-gray-900', url: 'https://github.com' },
    { name: 'LinkedIn', icon: '💼', color: 'bg-blue-600', url: 'https://linkedin.com' },
    { name: 'Vercel', icon: '▲', color: 'bg-black', url: 'https://vercel.com' },
    { name: 'Stack Overflow', icon: '🔧', color: 'bg-orange-600', url: 'https://stackoverflow.com' },
  ];

  const createNewTab = () => {
    const newTab = {
      id: nextTabId,
      title: 'New Tab',
      isActive: true,
      url: ''
    };
    
    // Update all tabs to inactive
    const updatedTabs = tabs.map(tab => ({ ...tab, isActive: false }));
    
    setTabs([...updatedTabs, newTab]);
    setActiveTabId(nextTabId);
    setNextTabId(nextTabId + 1);
    setSearchValue('');
  };

  const closeTab = (tabId, e) => {
    e.stopPropagation();
    
    if (tabs.length === 1) {
      // If it's the last tab, just reset it
      setTabs([{ id: 1, title: 'New Tab', isActive: true, url: '' }]);
      setActiveTabId(1);
      setSearchValue('');
      return;
    }

    const tabIndex = tabs.findIndex(tab => tab.id === tabId);
    const updatedTabs = tabs.filter(tab => tab.id !== tabId);
    
    // If we closed the active tab, activate another tab
    if (tabId === activeTabId) {
      const newActiveIndex = tabIndex > 0 ? tabIndex - 1 : 0;
      const newActiveTab = updatedTabs[newActiveIndex];
      updatedTabs[newActiveIndex] = { ...newActiveTab, isActive: true };
      setActiveTabId(newActiveTab.id);
    }
    
    setTabs(updatedTabs);
  };

  const switchTab = (tabId) => {
    const updatedTabs = tabs.map(tab => ({
      ...tab,
      isActive: tab.id === tabId
    }));
    
    setTabs(updatedTabs);
    setActiveTabId(tabId);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      // Update current tab title based on search
      const updatedTabs = tabs.map(tab => 
        tab.id === activeTabId 
          ? { ...tab, title: searchValue.length > 15 ? searchValue.substring(0, 15) + '...' : searchValue, url: searchValue }
          : tab
      );
      setTabs(updatedTabs);
    }
  };

  const handleShortcutClick = (shortcut) => {
    // Update current tab with shortcut info
    const updatedTabs = tabs.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, title: shortcut.name, url: shortcut.url }
        : tab
    );
    setTabs(updatedTabs);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 relative">
      {/* Header */}
      <header className="flex justify-between items-center p-1 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center">
          {/* Tabs */}
          <div className="flex items-center">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => switchTab(tab.id)}
                className={`flex items-center px-4 py-2 mx-px cursor-pointer group relative ${
                  tab.isActive 
                    ? 'bg-white border-t-2 border-blue-500' 
                    : 'bg-gray-100 hover:bg-gray-200'
                } rounded-t-lg max-w-60`}
              >
                <div className="w-4 h-4 bg-gray-300 rounded-full mr-2 flex-shrink-0"></div>
                <span className="text-sm truncate flex-1 min-w-0">
                  {tab.title}
                </span>
                <button
                  onClick={(e) => closeTab(tab.id, e)}
                  className="ml-2 p-1 hover:bg-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            
            {/* New Tab Button */}
            <button
              onClick={createNewTab}
              className="p-2 hover:bg-gray-200 rounded-full ml-1 transition-colors"
              title="New Tab"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-200 rounded" title="Minimize">
            <Minimize className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded" title="Maximize">
            <Maximize className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-red-500 hover:text-white rounded" title="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Navigation Bar */}
      <div className="flex items-center px-4 py-2 bg-white border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50" disabled>
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50" disabled>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 mx-4">
          <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 hover:border-gray-400 focus-within:border-blue-500 focus-within:shadow-md transition-all">
            <Search className="w-4 h-4 text-gray-400 mr-3" />
            <input 
              type="text" 
              placeholder="Search Google or type a URL"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleSearch}
              className="flex-1 outline-none text-gray-900"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full" title="Bookmark">
            <Star className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full" title="Extensions">
            <FileText className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full" title="Settings">
            <Settings className="w-4 h-4 text-gray-600" />
          </button>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Top Right Corner */}
      <div className="absolute top-20 right-6 flex items-center space-x-2 text-sm">
        {/* <Bookmark className="w-4 h-4 text-gray-600" /> */}
        {/* <span className="text-gray-600">All Bookmarks</span> */}
      </div>

      {/* Top Right Services */}
      <div className="absolute top-32 right-6 flex items-center space-x-6 text-sm">
        <span className="hover:underline cursor-pointer text-gray-700 hover:text-gray-900">Gmail</span>
        <span className="hover:underline cursor-pointer text-gray-700 hover:text-gray-900">Images</span>
        <Grid3X3 className="w-6 h-6 cursor-pointer hover:bg-gray-100 rounded p-1 text-gray-600" />
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center pt-16">
        {/* Google Logo */}
        <div className="mb-8">
          <h1 className="text-8xl font-light text-center">
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-green-500">l</span>
            <span className="text-red-500">e</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-xl mb-8">
          <div className="relative">
            <div className="flex items-center bg-white hover:shadow-lg border border-gray-200 hover:border-gray-300 rounded-full px-4 py-3 transition-all duration-200">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleSearch}
                placeholder="Search Google or type a URL"
                className="flex-1 outline-none text-gray-900 text-lg"
              />
              <div className="flex items-center space-x-3 ml-3">
                <Mic className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
                <Camera className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Shortcuts */}
        <div className="w-full max-w-4xl px-8">
          <div className="grid grid-cols-5 md:grid-cols-9 gap-6 mb-8">
            {shortcuts.map((shortcut, index) => (
              <div 
                key={index} 
                onClick={() => handleShortcutClick(shortcut)}
                className="flex flex-col items-center space-y-2 group cursor-pointer"
              >
                <div className={`w-12 h-12 ${shortcut.color} rounded-full flex items-center justify-center text-white text-lg hover:scale-110 transition-transform shadow-md hover:shadow-lg`}>
                  {shortcut.icon}
                </div>
                <span className="text-xs text-gray-600 group-hover:text-gray-900 text-center max-w-16 truncate">
                  {shortcut.name}
                </span>
              </div>
            ))}
            
            {/* Add Shortcut Button */}
            <div className="flex flex-col items-center space-y-2 group cursor-pointer">
              <div className="w-12 h-12 bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center transition-all">
                <Plus className="w-6 h-6 text-gray-400 group-hover:text-gray-600" />
              </div>
              <span className="text-xs text-gray-500 group-hover:text-gray-700 text-center">
                Add shortcut
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Right Corner */}
      <div className="absolute bottom-6 right-6">
        <button className="flex items-center space-x-2 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md">
          <span className="text-sm text-gray-700">🎨 Customise Chrome</span>
        </button>
      </div>
    </div>
  );
};

export default GoogleLandingPage;