var gleam = angular.element($(".popup-blocks-container")).scope();
$('.entry-method').each(function() {
    var elem = $(this);
    var scop = elem.data('$scope');
    if(scop !== null) {
        var sype = scop.entry_method.entry_type;
        if(sype != 'share_action' && gleam.canEnter(scop.entry_method) && !gleam.isEntered(scop.entry_method)){
            var type = $('span.icon-wrapper i', elem);
            var text = $.trim($('.text .ng-binding.ng-scope', elem).text());
            console.log("[GLEAM] Processing: "+text);
            scop.entry_method.entering = true;
            switch(sype) {
                case "youtube_watch":
                case "vimeo_watch":
                    scop.entry_method.watched = true;
                    scop.videoWatched(scop.entry_method);
                    break;
                default:
                    scop.triggerVisit(scop.entry_method.id);
                    break;
            }
            scop.entry_method.entering = false;
            scop.enterLinkClick(scop.entry_method);
            scop.verifyEntryMethod();
        }
    }
});
