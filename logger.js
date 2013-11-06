
(function() {

var o_requestLogin = 'manual';
var o_requestPassword = 'manual';

var BZWBK = {
    options: null,
    startup: function()
    {
        var port = chrome.extension.connect();
        port.onMessage.addListener(this.onMessage);
    },
    onDOMLoad: function()
    {
        var d = document.getElementsByTagName("input");
		for (var i = d.length-1; i > -1; i--) {
			if (d[i].getAttribute('name') == "nik") {
				d[i].setAttribute("value", o_requestLogin);
				
			} else if (d[i].getAttribute('id') == "pass0") {
				for (var j = 1; j < 20; j++) {
					if (!(d[i+j].getAttribute('disabled') == "true") && o_requestPassword[j-1] != null)
						d[i+j].setAttribute("value", o_requestPassword[j-1]);
			}
			}
		}
        
    },
    onMessage: function(message)
    {
        if (message.topic == 'options') {
            var init = BZWBK.options == null;
            BZWBK.options = message.data;
            BZWBK.updateCachedOptions();

            if (init)
                BZWBK.onDOMLoad();
        }
    },
    updateCachedOptions: function()
    {
        o_requestLogin = BZWBK.options['login'];
        o_requestPassword = BZWBK.options['password'];
    }
};
BZWBK.startup();
})();