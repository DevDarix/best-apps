function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const ttPixelID = 'CIDEFIRC77U0O25FGTVG';
const fbPixelID = '';
const onelinkURLS = {
    'sccup': 'https://secretcleaner.onelink.me/UifS',
}
const mediaSources = ['fb', 'tiktok'];

function initSendEvent(mediaSource) {
    if (mediaSource === 'fb') {
        fbq('init', fbPixelID);
        fbq('track', 'PageView');

        return (eventName) => {
            fbq('track', eventName);
        }
    } else if (mediaSource === 'tiktok') {
        ttq.load(ttPixelID);
        ttq.page();

        return (eventName) => {
            ttq.track(eventName)
        }
    }
    return (eventName) => {}
}

window.onload = function () {
    let app = getParameterFromURL('app');
    let oneLinkURL = null;
    let mediaSource = getParameterFromURL('ms');

    window.sendEvent = initSendEvent(mediaSource)

    if (window.oneLinkURL) {
        oneLinkURL = window.oneLinkURL;
    } else if (window.oneLinkURLKey && onelinkURLS[window.oneLinkURLKey]) {
        oneLinkURL = onelinkURLS[window.oneLinkURLKey];
    } else if (app && onelinkURLS[app]) {
        oneLinkURL = onelinkURLS[app];
    }
    if (oneLinkURL && mediaSources.indexOf(mediaSource) !== -1) {
        const onelinkGenerator = new window.AF.OneLinkUrlGenerator(
            {
                oneLinkURL: oneLinkURL,
                pidStaticValue: mediaSource + '_web2app',
                campaignKeysList: ['c'],
                campaignStaticValue: 'none',
                skipList: []
            }
        );
        onelinkGenerator.setAfSub1("clid");
        onelinkGenerator.setAdset("adset");
        onelinkGenerator.setAd("ad");
        onelinkGenerator.setCustomParameter("prt", "prt");

        if (mediaSource === 'fb') {
            onelinkGenerator.setAfSub2(null, getCookie("_fbc"));
            onelinkGenerator.setAfSub3(null, getCookie("_fbp"));
            onelinkGenerator.setAfSub4(null, window.navigator.userAgent);
        } else if(mediaSource === 'tiktok') {
            onelinkGenerator.setAfSub4(null, window.navigator.userAgent);
        }

        const url = onelinkGenerator.generateUrl();
        if (url) {
            let anchors = document.getElementsByTagName("a");
            for (let i = 0; i < anchors.length; i++) {
                anchors[i].href = url;
            }
        }
    }
};

!function (w, d, t) {
    w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++
    )ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
}(window, document, 'ttq');

!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
