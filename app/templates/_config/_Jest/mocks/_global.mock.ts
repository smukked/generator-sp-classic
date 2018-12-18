const mockStorage = () => {
    let storage = {};
    return {
        getItem: key => key in storage ? storage[key] : null,
        setItem: (key, value) => storage[key] = value || '',
        removeItem: key => delete storage[key],
        clear: () => storage = {},
    };
};

Object.defineProperty(window, 'localStorage', { value: mockStorage() });
Object.defineProperty(window, 'sessionStorage', { value: mockStorage() });
Object.defineProperty(window, 'getComputedStyle', {
    value: () => ['-webkit-appearance']
});
Object.defineProperty(window, '_spPageContextInfo', {
    value: {
        pageListId: "{06032526-67b3-4d9e-8741-b9f5ae737ac4}",
        pageItemId: 2,
        serverRequestPath: "/sites/<%= projectLower %>/pages/welcome.aspx",
        siteAbsoluteUrl: "https://<%= clientLower %>.sharepoint.com/sites/<%= projectLower %>",
        siteServerRelativeUrl: "/sites/<%= projectLower %>",
        webServerRelativeUrl: "/sites/<%= projectLower %>",
        webTitle: "Test"
       }
});