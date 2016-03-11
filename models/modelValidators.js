
var languageSymbolRegex = /^[a-z]{2}$/;

var languageSymbolValidator = {
    validator: function(symbol) {
        return languageSymbolRegex.test(symbol);
    },
    message: 'invalid language symbol, should be 2 lowercase letters'
};

var subtitlesSubtitleSourceLangValidator = {
    validator: function(subtitles) {
        return languageSymbolRegex.test(subtitles.sourceLang);
    },
    message: 'invalid source language, should be 2 lowercase letters'
};

var subtitlesSubtitleTargetLangValidator = {
    validator: function(subtitles) {
        return languageSymbolRegex.test(subtitles.targetLang);
    },
    message: 'invalid target language, should be 2 lowercase letters'
};

var subtitlesSubtitleTextValidator = {
    validator: function(subtitles) {
        var text = subtitles.text;
        if (!text || text.length < 1) {
            return false;
        }

        for (var i = 0; i < text.length; i++) {
            var subtitle = text[i];

            if (!isFinite(subtitle.from) ||
                !isFinite(subtitle.to) ||
                !subtitle.source) {
                return false;
            }
        }

        return true;
    },
    message: 'invalid subtitles, from and to should be numbers, source should exist'
};

exports.languageSymbolValidators = [
    languageSymbolValidator
];

exports.subtitleSubtitlesValidators = [
    subtitlesSubtitleSourceLangValidator,
    subtitlesSubtitleTargetLangValidator,
    subtitlesSubtitleTextValidator
];