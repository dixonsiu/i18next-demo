/**
 * Personium
 * Copyright 2017 FUJITSU LIMITED
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * The followings should be shared among applications and/or within the same application.
 */
var Common = Common || {};

Common.PERSONIUM_LOCALUNIT = "personium-localunit:";

//Default timeout limit - 60 minutes.
Common.IDLE_TIMEOUT =  3600000;
// 55 minutes
Common.IDLE_CHECK = 3300000;
// Records last activity time.
Common.lastActivity = new Date().getTime();

Common.accessData = {
    targetUrl: null,
    unitUrl: null,
    cellUrl: null,
    cellName: null,
    appUrl: null,
    token: null,
    refToken: null,
    expires: null,
    refExpires: null
};

/*
 * The followings should be shared among applications and/or within the same application.
 */
$(document).ready(function() {
    i18next
        .use(i18nextXHRBackend)
        .use(i18nextBrowserLanguageDetector)
        .init({
            fallbackLng: 'en',
            ns: getNamesapces(),
            defaultNS: 'common',
            debug: true,
            backend: {
                // load from i18next-gitbook repo
                loadPath: './locales/{{lng}}/{{ns}}.json',
                crossDomain: true
            }
        }, function(err, t) {
            Common.initJqueryI18next();

            // define your own additionalCallback for each App/screen
            if ((typeof additionalCallback !== "undefined") && $.isFunction(additionalCallback)) {
                additionalCallback();
            }

            Common.updateContent();
        });
});

/*
 * Need to move to a function to avoid conflicting with the i18nextBrowserLanguageDetector initialization.
 */
Common.initJqueryI18next = function() {
    // for options see
    // https://github.com/i18next/jquery-i18next#initialize-the-plugin
    jqueryI18next.init(i18next, $, {
        useOptionsAttr: true
    });
}

Common.updateContent = function() {
    // start localizing, details:
    // https://github.com/i18next/jquery-i18next#usage-of-selector-function
    $('[data-i18n]').localize();
}

Common.displayMessageByKey = function(msg_key) {
    if (msg_key) {
        $('#dispMsg').attr("data-i18n", '[html]' + msg_key)
            .localize()
            .show();
    } else {
        $('#dispMsg').hide();
    }
};
