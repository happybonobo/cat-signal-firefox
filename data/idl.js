// Wait 3 seconds.
setTimeout(function() {

    // Skip iFrames.
    if (window !== top) {
        return;
    }

    // Check for IDL script on page.
    var scripts = document.getElementsByTagName('script');
    for (var key in scripts) {
        var script = scripts[key];
        if (script && script.src && script.src.match(/internetdefenseleague/)) {
            return;
        }
    }

    // Embed!
    window._idl = {};
    _idl.variant = "banner";
    (function() {
        var idl = document.createElement('script');
        idl.type = 'text/javascript';
        idl.async = true;
        idl.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'members.internetdefenseleague.org/include/?url=' + (_idl.url || '') + '&campaign=' + (_idl.campaign || '') + '&variant=' + (_idl.variant || 'banner');
        document.getElementsByTagName('body')[0].appendChild(idl);
    })();

}, 3000);