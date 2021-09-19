Package.describe({
    name: 'meteorhubdotnet:firestorm-helpers',
    summary: 'Helper functions for Firestorm. Includes Iron Router and Blaze helpers.',
    version: '1.0.3',
    git: 'https://github.com/meteorhubdotnet/firestorm-helpers',
});

Package.onUse(function(api) {

    api.versionsFrom('METEOR@2.3.6');

    api.use([
        'meteorhubdotnet:firestorm-iron-router@1.0.5',
        'ui@1.0.13',
        'templating@1.4.0',
        'modules',
        'ecmascript'
    ], 'client');
    api.use('meteor');

    api.addFiles(['helpers.js'], 'client');

});

Npm.depends({
    'date-fns': '2.22.1'
});