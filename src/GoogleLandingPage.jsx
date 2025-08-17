import React, { useState, useEffect } from 'react';
import { Search, Mic, Camera, Grid3X3, User, Bookmark, Plus, X, ArrowLeft, ArrowRight, RotateCcw, Star, FileText, Minimize, Maximize, Settings, Menu, Volume2, VolumeX, Home, Download, History, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const GoogleLandingPage = () => {
  const [tabs, setTabs] = useState([
    { id: 1, title: 'New Tab', isActive: true, url: '', canGoBack: false, canGoForward: false, isBookmarked: false, history: [] }
  ]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [nextTabId, setNextTabId] = useState(2);
  const [searchValue, setSearchValue] = useState('');
  const [isMaximized, setIsMaximized] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showAppsMenu, setShowAppsMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showExtensionsMenu, setShowExtensionsMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showCustomizePanel, setShowCustomizePanel] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bookmarks, setBookmarks] = useState(['Gmail', 'YouTube', 'GitHub']);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(true);

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

  const googleApps = [
    { name: 'Gmail', icon: '📧', color: 'bg-red-500' },
    { name: 'Drive', icon: '📁', color: 'bg-blue-500' },
    { name: 'Calendar', icon: '📅', color: 'bg-blue-600' },
    { name: 'Photos', icon: '📷', color: 'bg-yellow-500' },
    { name: 'Maps', icon: '🗺️', color: 'bg-green-500' },
    { name: 'YouTube', icon: '▶️', color: 'bg-red-600' },
    { name: 'News', icon: '📰', color: 'bg-blue-700' },
    { name: 'Translate', icon: '🌐', color: 'bg-blue-400' },
    { name: 'Play Store', icon: '🎯', color: 'bg-green-600' },
  ];

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowAppsMenu(false);
      setShowProfileMenu(false);
      setShowExtensionsMenu(false);
      setShowSettingsMenu(false);
      setShowMobileMenu(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const createNewTab = () => {
    const newTab = {
      id: nextTabId,
      title: 'New Tab',
      isActive: true,
      url: '',
      canGoBack: false,
      canGoForward: false,
      isBookmarked: false,
      history: []
    };
    
    const updatedTabs = tabs.map(tab => ({ ...tab, isActive: false }));
    setTabs([...updatedTabs, newTab]);
    setActiveTabId(nextTabId);
    setNextTabId(nextTabId + 1);
    setSearchValue('');
  };

  const closeTab = (tabId, e) => {
    e.stopPropagation();
    
    if (tabs.length === 1) {
      setTabs([{ id: 1, title: 'New Tab', isActive: true, url: '', canGoBack: false, canGoForward: false, isBookmarked: false, history: [] }]);
      setActiveTabId(1);
      setSearchValue('');
      return;
    }

    const tabIndex = tabs.findIndex(tab => tab.id === tabId);
    const updatedTabs = tabs.filter(tab => tab.id !== tabId);
    
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
    
    const activeTab = tabs.find(tab => tab.id === tabId);
    setSearchValue(activeTab?.url || '');
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      const updatedTabs = tabs.map(tab => 
        tab.id === activeTabId 
          ? { 
              ...tab, 
              title: searchValue.length > 15 ? searchValue.substring(0, 15) + '...' : searchValue, 
              url: searchValue,
              canGoBack: tab.history.length > 0,
              history: [...tab.history, tab.url].filter(url => url)
            }
          : tab
      );
      setTabs(updatedTabs);
    }
  };

  const handleShortcutClick = (shortcut) => {
    const updatedTabs = tabs.map(tab => 
      tab.id === activeTabId 
        ? { 
            ...tab, 
            title: shortcut.name, 
            url: shortcut.url,
            canGoBack: tab.history.length > 0,
            history: [...tab.history, tab.url].filter(url => url)
          }
        : tab
    );
    setTabs(updatedTabs);
    setSearchValue(shortcut.url);
  };

  const handleBackNavigation = () => {
    const activeTab = tabs.find(tab => tab.id === activeTabId);
    if (activeTab && activeTab.canGoBack && activeTab.history.length > 0) {
      const previousUrl = activeTab.history[activeTab.history.length - 1];
      const newHistory = activeTab.history.slice(0, -1);
      
      const updatedTabs = tabs.map(tab => 
        tab.id === activeTabId 
          ? { 
              ...tab, 
              url: previousUrl,
              title: previousUrl.split('/')[2] || 'Previous Page',
              canGoBack: newHistory.length > 0,
              canGoForward: true,
              history: newHistory
            }
          : tab
      );
      setTabs(updatedTabs);
      setSearchValue(previousUrl);
    }
  };

  const handleRefresh = () => {
    const button = document.querySelector('[data-refresh-button]');
    if (button) {
      button.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        button.style.transform = 'rotate(0deg)';
      }, 500);
    }
  };

  const toggleBookmark = () => {
    const updatedTabs = tabs.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, isBookmarked: !tab.isBookmarked }
        : tab
    );
    setTabs(updatedTabs);
    
    const activeTab = tabs.find(tab => tab.id === activeTabId);
    if (activeTab && !activeTab.isBookmarked && activeTab.title !== 'New Tab') {
      setBookmarks([...bookmarks, activeTab.title]);
    }
  };

  const handleWindowClose = () => {
    if (window.confirm('Close all tabs and exit?')) {
      window.close();
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setTimeout(() => setIsMinimized(false), 1000);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchValue(transcript);
      };
      
      recognition.start();
    } else {
      alert('Voice recognition not supported in this browser');
    }
  };

  const currentTab = tabs.find(tab => tab.id === activeTabId);

  return (
    <div className={`min-h-screen bg-white text-gray-900 relative transition-all duration-300 ${isMaximized ? '' : 'mx-2 sm:mx-4 my-2 sm:my-4 rounded-lg shadow-2xl'} ${isMinimized ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
      
      {/* Mobile Header */}
      {isMobile && (
        <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMobileMenu(!showMobileMenu);
              }}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium truncate max-w-32">
              {currentTab?.title || 'New Tab'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">
              {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </span>
            <button 
              onClick={createNewTab}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <header className="flex justify-between items-center p-1 bg-gray-50 border-b border-gray-200 rounded-t-lg">
          <div className="flex items-center flex-1 overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center overflow-x-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => switchTab(tab.id)}
                  className={`flex items-center px-2 sm:px-4 py-2 mx-px cursor-pointer group relative min-w-16 sm:min-w-32 ${
                    tab.isActive 
                      ? 'bg-white border-t-2 border-blue-500' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  } rounded-t-lg`}
                >
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 rounded-full mr-1 sm:mr-2 flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm truncate flex-1 min-w-0">
                    {tab.title}
                  </span>
                  {tab.isBookmarked && <Star className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-500 mr-1 fill-current" />}
                  <button
                    onClick={(e) => closeTab(tab.id, e)}
                    className="ml-1 sm:ml-2 p-1 hover:bg-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  >
                    <X className="w-2 h-2 sm:w-3 sm:h-3" />
                  </button>
                </div>
              ))}
              
              <button
                onClick={createNewTab}
                className="p-1 sm:p-2 hover:bg-gray-200 rounded-full ml-1 transition-colors"
                title="New Tab (Ctrl+T)"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Window Controls */}
          <div className="flex items-center space-x-1">
          
           
            <button 
              onClick={handleMinimize}
              className="p-1 sm:p-2 hover:bg-gray-200 rounded transition-colors" 
              title="Minimize"
            >
              <Minimize className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button 
              onClick={toggleMaximize}
              className="p-1 sm:p-2 hover:bg-gray-200 rounded transition-colors" 
              title={isMaximized ? "Restore" : "Maximize"}
            >
              <Maximize className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button 
              onClick={handleWindowClose}
              className="p-1 sm:p-2 hover:bg-red-500 hover:text-white rounded transition-colors" 
              title="Close"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </header>
      )}

      {/* Mobile Menu */}
      {isMobile && showMobileMenu && (
        <div className="bg-white border-b border-gray-200 p-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  switchTab(tab.id);
                  setShowMobileMenu(false);
                }}
                className={`flex items-center px-3 py-2 rounded-lg text-sm ${
                  tab.isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}
              >
                <span className="truncate max-w-24">{tab.title}</span>
                <button
                  onClick={(e) => closeTab(tab.id, e)}
                  className="ml-2 p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleBackNavigation}
              disabled={!currentTab?.canGoBack}
              className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleRefresh}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button 
              onClick={toggleBookmark}
              className={`p-2 hover:bg-gray-100 rounded-full ${currentTab?.isBookmarked ? 'text-yellow-500' : 'text-gray-600'}`}
            >
              <Star className={`w-4 h-4 ${currentTab?.isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      )}

      {/* Navigation Bar - Desktop */}
      {!isMobile && (
        <div className="flex items-center px-2 sm:px-4 py-2 bg-white border-b border-gray-100">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button 
              onClick={handleBackNavigation}
              disabled={!currentTab?.canGoBack}
              className="p-1 sm:p-2 hover:bg-gray-100 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Back"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button 
              disabled={!currentTab?.canGoForward}
              className="p-1 sm:p-2 hover:bg-gray-100 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
              title="Forward"
            >
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button 
              onClick={handleRefresh}
              data-refresh-button
              className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-all duration-500"
              title="Reload"
            >
              <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button 
              onClick={createNewTab}
              className="p-1 sm:p-2 hover:bg-gray-100 rounded-full hidden sm:block"
              title="Home"
            >
              <Home className="w-4 h-4" />
            </button>
          </div>
          
          {/* Address Bar */}
          <div className="flex-1 mx-2 sm:mx-4">
            <div className="flex items-center bg-white border border-gray-300 rounded-full px-2 sm:px-4 py-1 sm:py-2 hover:border-gray-400 focus-within:border-blue-500 focus-within:shadow-md transition-all">
              <Search className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-2 sm:mr-3 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Search Google or type a URL"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleSearch}
                className="flex-1 outline-none text-gray-900 text-sm sm:text-base min-w-0"
              />
              {currentTab?.isBookmarked && <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current mr-1 sm:mr-2 flex-shrink-0" />}
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center space-x-1">
            <button 
              onClick={toggleBookmark}
              className={`p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors ${currentTab?.isBookmarked ? 'text-yellow-500' : 'text-gray-600'}`}
              title="Bookmark this page"
            >
              <Star className={`w-3 h-3 sm:w-4 sm:h-4 ${currentTab?.isBookmarked ? 'fill-current' : ''}`} />
            </button>
            
            <div className="relative hidden sm:block">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowExtensionsMenu(!showExtensionsMenu);
                }}
                className="p-2 hover:bg-gray-100 rounded-full" 
                title="Extensions"
              >
                <FileText className="w-4 h-4 text-gray-600" />
              </button>
              {showExtensionsMenu && (
                <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-48 sm:w-64 z-50">
                  <h3 className="font-semibold mb-2">Extensions</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">AdBlock</span>
                      <button className="text-xs bg-green-500 text-white px-2 py-1 rounded">ON</button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Password Manager</span>
                      <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded">ON</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSettingsMenu(!showSettingsMenu);
                }}
                className="p-1 sm:p-2 hover:bg-gray-100 rounded-full" 
                title="Settings"
              >
                <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
              </button>
              {showSettingsMenu && (
                <div className="absolute right-0 top-8 sm:top-12 bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-40 sm:w-48 z-50">
                  <div className="space-y-1">
                    <button className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded text-sm">
                      <Download className="w-4 h-4 mr-2" />
                      Downloads
                    </button>
                    <button className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded text-sm">
                      <History className="w-4 h-4 mr-2" />
                      History
                    </button>
                    <button className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded text-sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfileMenu(!showProfileMenu);
                }}
                className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
                title="Profile"
              >
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 top-8 sm:top-12 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 sm:w-72 z-50">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">John Doe</h3>
                      <p className="text-xs sm:text-sm text-gray-600">john.doe@gmail.com</p>
                    </div>
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-xs sm:text-sm">
                      Manage your Google Account
                    </button>
                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-xs sm:text-sm">
                      Add another account
                    </button>
                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-xs sm:text-sm">
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bookmarks Bar */}
      {!isMobile && showBookmarks && (
        <div className="flex items-center px-2 sm:px-4 py-1 bg-gray-50 border-b border-gray-100 text-xs sm:text-sm overflow-x-auto">
          <Bookmark className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 mr-2 flex-shrink-0" />
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {bookmarks.slice(0, isMobile ? 3 : bookmarks.length).map((bookmark, index) => (
              <button 
                key={index}
                onClick={() => handleShortcutClick({ name: bookmark, url: `https://${bookmark.toLowerCase()}.com` })}
                className="hover:bg-gray-200 px-2 py-1 rounded text-gray-700 hover:text-gray-900 whitespace-nowrap"
              >
                {bookmark}
              </button>
            ))}
          </div>
          <span className="ml-auto text-gray-500 hidden sm:inline">All Bookmarks</span>
          <button 
            onClick={() => setShowBookmarks(false)}
            className="ml-2 p-1 hover:bg-gray-200 rounded sm:hidden"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Right Services - Desktop Only */}
      {!isMobile && (
        <div className="absolute top-24 sm:top-32 right-2 sm:right-6 mt-3 flex items-center space-x-3 sm:space-x-6 text-xs sm:text-sm">
          <span className="hover:underline cursor-pointer text-gray-700 hover:text-gray-900">Gmail</span>
          <span className="hover:underline cursor-pointer text-gray-700 hover:text-gray-900">Images</span>
          
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowAppsMenu(!showAppsMenu);
              }}
              className="p-1 sm:p-2 hover:bg-gray-100 rounded-full"
              title="Google apps"
            >
              <Grid3X3 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
            
            {showAppsMenu && (
              <div className="absolute right-0 top-8 sm:top-12 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-72 sm:w-80 z-50">
                <h3 className="font-semibold mb-4">Google apps</h3>
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {googleApps.map((app, index) => (
                    <div 
                      key={index}
                      onClick={() => handleShortcutClick({ name: app.name, url: `https://${app.name.toLowerCase()}.google.com` })}
                      className="flex flex-col items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                    >
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 ${app.color} rounded-lg flex items-center justify-center text-white text-lg mb-2`}>
                        {app.icon}
                      </div>
                      <span className="text-xs text-center">{app.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-4 sm:px-8 pt-8 sm:pt-12 md:pt-16">
        {/* Google Logo */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-center">
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-green-500">l</span>
            <span className="text-red-500">e</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mb-6 sm:mb-8">
          <div className="relative">
            <div className="flex items-center bg-white hover:shadow-lg border border-gray-200 hover:border-gray-300 rounded-full px-4 py-3 transition-all duration-200">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-3 flex-shrink-0" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleSearch}
                placeholder="Search Google or type a URL"
                className="flex-1 outline-none text-gray-900 text-base sm:text-lg min-w-0"
              />
              <div className="flex items-center space-x-2 sm:space-x-3 ml-3">
                <button onClick={handleVoiceSearch} title="Voice Search">
                  <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
                </button>
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Buttons */}
     

        {/* Shortcuts */}
        <div className="w-full max-w-7xl">
          <div className="flex justify-center flex-wrap mx-auto gap-6 sm:gap-6 mb-8">
            {shortcuts.slice(0, isMobile ? 6 : shortcuts.length).map((shortcut, index) => (
              <div 
                key={index} 
                onClick={() => handleShortcutClick(shortcut)}
                className="flex flex-col items-center space-y-2 group cursor-pointer"
                title={shortcut.url}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${shortcut.color} rounded-full flex items-center justify-center text-white text-base sm:text-lg hover:scale-110 transition-transform shadow-md hover:shadow-lg`}>
                  {shortcut.icon}
                </div>
                <span className="text-xs text-gray-600 group-hover:text-gray-900 text-center max-w-16 truncate">
                  {shortcut.name}
                </span>
              </div>
            ))}
            
            {/* Add Shortcut Button */}
            <div className="flex flex-col items-center space-y-2 group cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center transition-all">
                <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-gray-600" />
              </div>
              <span className="text-xs text-gray-500 group-hover:text-gray-700 text-center">
                Add shortcut
              </span>
            </div>
          </div>
          
          {/* Show More Shortcuts on Mobile */}
          {isMobile && shortcuts.length > 6 && (
            <div className="text-center mb-8">
              <button className="text-blue-500 text-sm hover:underline">
                Show {shortcuts.length - 6} more shortcuts
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Google Apps Menu - Mobile */}
      {isMobile && showAppsMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Google apps</h2>
              <button 
                onClick={() => setShowAppsMenu(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {googleApps.map((app, index) => (
                <div 
                  key={index}
                  onClick={() => {
                    handleShortcutClick({ name: app.name, url: `https://${app.name.toLowerCase()}.google.com` });
                    setShowAppsMenu(false);
                  }}
                  className="flex flex-col items-center p-3 hover:bg-gray-100 rounded cursor-pointer"
                >
                  <div className={`w-12 h-12 ${app.color} rounded-lg flex items-center justify-center text-white text-lg mb-2`}>
                    {app.icon}
                  </div>
                  <span className="text-xs text-center">{app.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Customize Panel */}
      {showCustomizePanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm sm:max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold">Customize Chrome</h2>
              <button 
                onClick={() => setShowCustomizePanel(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Background</label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="w-full h-12 sm:h-16 bg-gradient-to-r from-blue-400 to-purple-600 rounded cursor-pointer hover:scale-105 transition-transform"></div>
                  <div className="w-full h-12 sm:h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded cursor-pointer hover:scale-105 transition-transform"></div>
                  <div className="w-full h-12 sm:h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded cursor-pointer hover:scale-105 transition-transform"></div>
                </div>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Show shortcuts</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    className="rounded" 
                    checked={showBookmarks}
                    onChange={(e) => setShowBookmarks(e.target.checked)}
                  />
                  <span className="text-sm">Show bookmarks bar</span>
                </label>
              </div>
              <div>
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="flex items-center space-x-2 w-full px-3 py-2 hover:bg-gray-100 rounded text-sm"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isMuted ? 'Unmute' : 'Mute'} sounds</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Right Corner */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40">
        <button 
          onClick={() => setShowCustomizePanel(true)}
          className="flex items-center space-x-2 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 px-3 sm:px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md text-sm"
        >
          <span className="text-gray-700">🎨 Customise Chrome</span>
        </button>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-around items-center">
          <button 
            onClick={handleBackNavigation}
            disabled={!currentTab?.canGoBack}
            className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={handleRefresh}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowAppsMenu(!showAppsMenu);
            }}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button 
            onClick={toggleBookmark}
            className={`p-2 hover:bg-gray-100 rounded-full ${currentTab?.isBookmarked ? 'text-yellow-500' : 'text-gray-600'}`}
          >
            <Star className={`w-5 h-5 ${currentTab?.isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <div className="relative">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowProfileMenu(!showProfileMenu);
              }}
              className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
            >
              <User className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Collapsed Bookmarks Toggle */}
      {!showBookmarks && !isMobile && (
        <div className="absolute top-32 left-4">
          <button 
            onClick={() => setShowBookmarks(true)}
            className="p-1 hover:bg-gray-100 rounded text-gray-500"
            title="Show bookmarks"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}

     
    </div>
  );
};

export default GoogleLandingPage;