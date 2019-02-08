define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        activate: function () {
            router.map([
                { route: '', title: 'Welcome', moduleId: 'viewmodels/welcome', nav: true, menu: 'Welcome' },
                { route: 'Countries', moduleId: 'viewmodels/countries', nav: true, menu: 'Countries' },
                { route: 'Leagues', moduleId: 'viewmodels/leagues', nav: true, menu: 'Leagues' },
                { route: 'Teams', moduleId: 'viewmodels/Teams', nav: true, menu: 'Teams' },
                { route: 'Players', moduleId: 'viewmodels/players', nav: true, menu: 'Players' },               
                { route: 'Leagues/:id', moduleId: 'viewmodels/leagues_especific', nav: false, menu: 'leagues2' },
                { route: 'Teams/:id/:team_fifa_api_id', moduleId: 'viewmodels/teams_especific', nav: false, menu: 'macthes2' },
                { route: 'matches/:id', moduleId: 'viewmodels/matches', nav: false, menu: 'leagues2' },
                { route: 'Players/:id', moduleId: 'viewmodels/infoplayers', nav: false, menu: 'Players2' },
                { route: 'Countries/:id', moduleId: 'viewmodels/Countries_especific', nav: false, menu: 'countries2' },
                { route: 'About', moduleId: 'viewmodels/About', nav: true, menu: 'About' }
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});