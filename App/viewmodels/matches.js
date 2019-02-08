define(['knockout'], function (ko) {

    
    var vm = function () {
        console.log('ViewModel initiated...')
        var url = window.location.href;
        var site = url.split('#')[1];
        console.log(site)
        var final = site.split('/')[1];
        console.log(final)
        //---Variáveis locais
        var self = this;
        var baseUri = 'http://192.168.160.28/football/api/matches/' + final;        
        self.error = ko.observable();
        self.matches = ko.observableArray([null]);
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
        getMatch = function () {

            console.log('CALL: getTeams...')
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.matches(data);
                console.log(data)
            });
        };
        //---- initial call
        getMatch();

        

        
    };
    return vm
    
    
});