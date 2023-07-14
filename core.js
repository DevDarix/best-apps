function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const onelinkURLS = {
    'sccup': 'https://secretcleaner.onelink.me/UifS',
}
const mediaSources = ['fb', 'tiktok'];

window.onload = function () {
    let app = getParameterFromURL('app');
    let oneLinkURL = null;
    let mediaSource = getParameterFromURL('ms');
    window.sendEvent = (eventName) =>{
        if (mediaSource === 'fb') {
            //fbq('track', eventName);
        }
    }
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
        onelinkGenerator.setAdset("adset");
        onelinkGenerator.setAd("ad");
        onelinkGenerator.setCustomParameter("prt", "prt");

        if (mediaSource === 'fb') {
            onelinkGenerator.setAfSub1("fbclid");
            onelinkGenerator.setAfSub2(null, getCookie("_fbc"));
            onelinkGenerator.setAfSub3(null, getCookie("_fbp"));
            onelinkGenerator.setAfSub4(null, window.navigator.userAgent);
        } else if(mediaSource === 'tiktok') {

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