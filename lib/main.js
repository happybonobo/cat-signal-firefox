// Set defaults.
var saved = require('sdk/simple-storage').storage;
if (!saved.lastRequest) {
    saved.lastRequest = 0;
}

// Create widget.
require("sdk/widget").Widget({
    id: 'happy-bonobo--cat-signal-firefox',
    label: 'Cat Signal',
    contentURL: require('sdk/self').data.url('catface.png'),
    onClick: function() {
        saved.lastRequest = 0;
        makeRequest();
    }
});

// Append timestamp to URL.
var url = 'http://mothership.fightforthefuture.org/campaigns/query?since_timestamp=' + saved.lastRequest;

// Show notification, if there's a new campaign.
function onResponse(res) {
    // Update saved timestamp.
    saved.lastRequest = Date.now();

    // Check for new campaigns.
    var campaigns = res.json.campaigns;
    if (!campaigns.length) {
        return;
    }

    // Select first campaign.
    var campaign = campaigns[0];

    // Get cat signal image.
    var image = require('sdk/self').data.url('cat-signal.png');

    // Shorten description.
    var description = campaign.description.split('\n')[0];

    // Notify.
    var Notifications = require('sdk/notifications');
    Notifications.notify({
        title: campaign.name,
        text: description,
        iconURL: image,
        onClick: function(data) {
            var Tabs = require('sdk/tabs');
            Tabs.open(campaign.url);
        }
    });
}

function makeRequest() {
    var Request = require('sdk/request').Request;
    Request({
        url: url,
        onComplete: onResponse
    }).get();
}

makeRequest();
