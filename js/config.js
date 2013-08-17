require.config({
    //By default load any module IDs from js
    baseUrl: 'js',

    deps: ['main'],

    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        //Library folders
        easeljs: 'lib/easeljs/easeljs-0.6.0.min',        
        components: 'game/components',
        nodes: 'game/nodes',
        systems: 'game/systems',
        graphics: 'game/graphics',
        brejep: 'lib/brejep',
        
        //Modules
        ash: 'lib/ash/ash',
        jquery: 'lib/vendor/jquery-1.9.1',        
    }


});