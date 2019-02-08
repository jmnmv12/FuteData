define(['knockout'],function (ko) {
    var vm = function () {
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var self = this;
        var baseUri = 'http://192.168.160.28/football/api/teams';
        
        self.className = 'Teams';
        
        self.error = ko.observable();
        self.teams = ko.observableArray([]);
        self.term = ko.observable('');
        //--- Internal functions
        function ajaxHelper(uri, method, data) {
            self.error(''); // Clear error message
            return $.ajax({
                type: method,
                url: uri,
                dataType: 'json',
                contentType: 'application/json',
                data: data ? JSON.stringify(data) : null,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Call[" + uri + "] Fail...");
                    self.error(errorThrown);
                }
            })
        }
        //--- Externel functions (accessible outside)
        getTeams = function () {

            console.log('CALL: getTeams...')
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.teams(data);
            });
        };
        //---- initial call
        getTeams();

        getTeams2 = function (searchvalue) {           
            console.log('CALL: getTeams term...')
            console.log(term)
            ajaxHelper(baseUri + '/search?srcStr=' + searchvalue, 'GET').done(function (data) {
                self.teams(data);
            });
        };

        this.gTeams2 = function () {
            getTeams2(self.term());

        };
        this.deleteTeams = function () {
            self.teams.removeAll()
        };
    };
    return vm
});