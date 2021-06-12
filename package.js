Package.describe({
    name: 'meteorhubdotnet:firestorm-helpers',
    summary: 'Helper functions for Firestorm. Includes Iron Router helpers and simple operators for Blaze templates',
    version: '1.0.0',
    git: '#',
});

Package.onUse(function(api) {

    api.versionsFrom('METEOR@2.2');

    api.use([
        'meteorhubdotnet:firestorm-iron-router',
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