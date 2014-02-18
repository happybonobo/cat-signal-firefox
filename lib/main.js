// Add sandboxed script to pages.
require("page-mod").PageMod({
    include: "*",
    contentScriptWhen: 'end',
    contentScriptFile: require('sdk/self').data.url('idl.js')
});
