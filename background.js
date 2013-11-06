(function(){

var clients = [],
    startup = function() {
        chrome.extension.onConnect.addListener(registerTab);
        chrome.extension.onRequest.addListener(onRequest);
        window.addEventListener('storage', broadcastOptions, false);
    },
    registerTab = function(port) {
        clients.push(port);
        sendOptions(port);

        port.onDisconnect.addListener(unregisterTab);
    },
    unregisterTab = function(port) {
        var portId = clients.indexOf(port);
        delete clients[portId];
    },
    onRequest = function(request, sender, callback) {
        if (request.action == 'GetContentLength')
            getContentLength(request.uri, callback);
    },

    sendOptions = function(port) {
        var options = {};
		options['login'] = localStorage['login'];
		options['password'] = localStorage['password'];

        port.postMessage({
            topic: 'options',
            data: options
        });
    },
    broadcastOptions = function() {
        clients.map(sendOptions);
    },

    contentLengthCache = {},
    getContentLength = function(uri, onLength) {
        var cache = contentLengthCache;
        if (uri in cache) {
            var length = cache[uri];
            onLength(length);
            return;
        }

        var req = new XMLHttpRequest();
        req.open('HEAD', uri, true);
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                var length = null;
                if (req.status == 200) {
                    length = parseFloat(req.getResponseHeader('Content-Length'));
                    if (length)
                        cache[uri] = length;
                }
                onLength(length);
            }
        };
        req.send(null);
    };

startup();

})();
