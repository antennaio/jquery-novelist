/**
 * jQuery Novelist Plugin
 *
 * http://github.com/antennaio/jquery-novelist
 *
 * Copyright (c) 2012 Kazik Pietruszewski
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function ($) {
    var Novelist, root;
    root = typeof window !== "undefined" && window !== null ? window : global;

    root.Novelist = Novelist = (function () {

        function Novelist() {
            this.show = function () {

                var $this = $(this.elem),
                    userOptions = this.options,
                    repositionBackground,
                    backgroundWidth,
                    backgroundImage,
                    $img = $('<img/>');

                // run only once
                if (!$this.data('novelist')) {

                    $this.data('novelist', {
                        currentWidth:($this).outerWidth(),
                        currentHeight:($this).outerHeight(),
                        limit:userOptions.maxCharacters
                    });

                    if (userOptions.backgroundImage) {
                        backgroundImage = userOptions.backgroundImage;

                        // after image is loaded, save its width and reposition background
                        $img.load(function () {

                            if (userOptions.backgroundScale) {
                                $this.css('backgroundSize',
                                    $this.data('novelist').currentWidth + 'px ' +
                                        $this.data('novelist').currentHeight + 'px'
                                );

                                backgroundWidth = $this.data('novelist').currentWidth;
                            } else {
                                backgroundWidth = this.width;
                            }

                            repositionBackground();
                        });
                        $img.attr('src', backgroundImage);

                    } else {
                        backgroundImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAASwCAMAAADc/0P9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowOTRGQzE3OTEwRDAxMUUyOUM4OEY0MTkyNDg4MEU5RiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowOTRGQzE3QTEwRDAxMUUyOUM4OEY0MTkyNDg4MEU5RiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA5NEZDMTc3MTBEMDExRTI5Qzg4RjQxOTI0ODgwRTlGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjA5NEZDMTc4MTBEMDExRTI5Qzg4RjQxOTI0ODgwRTlGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+QK/yXwAAAAZQTFRF8/PzAAAArSZBvAAABY9JREFUeNrswTEBAAAAwqD1T+1pCaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4CaAAAMA/usAAWqGph8AAAAASUVORK5CYII=';
                        backgroundWidth = 1200;
                    }

                    if (userOptions.backgroundScale) {
                        $this.css('backgroundRepeat', 'no-repeat');
                    } else {
                        $this.css('backgroundRepeat',
                            (userOptions.direction == 'vertical') ?
                                'repeat-x' :
                                'repeat-y'
                        );
                    }

                    $this.css('backgroundImage', 'url(\'' + backgroundImage + '\')');

                    repositionBackground = function () {
                        var characters, percent, posX, posY;

                        characters = $this.val().length;
                        percent = (characters / userOptions.maxCharacters) * 100;

                        if (userOptions.direction == 'vertical') {
                            posY = $this.data('novelist').currentHeight -
                                ((percent / 100) * $this.data('novelist').currentHeight);

                            $this.css('backgroundPosition', 'left ' + posY + 'px');
                        } else {
                            posX = $this.data('novelist').currentWidth -
                                ((percent / 100) * $this.data('novelist').currentWidth);

                            posX += -$this.data('novelist').currentWidth + backgroundWidth;

                            $this.css('backgroundPosition', '-' + posX + 'px top');
                        }

                        return Math.floor(percent);
                    };

                    repositionBackground();

                    // a few adjustments are necessary on textarea/text field resize
                    $this.mouseup(function () {
                        $this.data('novelist').currentWidth = $this.outerWidth();
                        $this.data('novelist').currentHeight = $this.outerHeight();

                        if (userOptions.backgroundScale) {
                            $this.css('backgroundSize', $this.data('novelist').currentWidth + 'px ' +
                                $this.data('novelist').currentHeight + 'px');

                            backgroundWidth = $this.data('novelist').currentWidth;
                        }

                        repositionBackground();
                    });

                    $this.keyup(function (event) {
                        var percent,
                            characters = $this.val().length;

                        if (characters >= userOptions.maxCharacters) {

                            // pass correct value to the onInput callback
                            characters = userOptions.maxCharacters;

                            // remove chars over the limit
                            if (userOptions.hardLimit) {
                                $this.val($this.val().substr(0, userOptions.maxCharacters));
                            }

                            // onLimitReached callback
                            userOptions.onLimitReached.call(this, $this.val());
                        }

                        percent = repositionBackground();

                        // onInput callback
                        userOptions.onInput.call(this, $this.val(), characters, percent, userOptions.maxCharacters);
                    });

                }
            }
            this.destroy = function () {
                var $this = $(this.elem);
                $this.removeData('novelist');
                $this.off('mouseup', 'keyup');
            }
        }

        Novelist.prototype.init = function (options, elem) {
            var self, limit;
            self = this;
            self.elem = elem;
            limit = $(elem).data('max-characters');

            options = options || {};

            if ((options.maxCharacters === undefined) && limit) {
                options.maxCharacters = limit;
            }

            return self.options = $.extend({}, $.fn.novelist.defaults, options);
        };

        return Novelist;

    })();

    $.fn.novelist = function (method, options) {
        return this.each(function () {
            var plugin = new Novelist();

            // method supplied
            if (plugin.hasOwnProperty(method)) {
                plugin.init(options, this);
                return plugin[method]();

                // no method supplied or only options supplied
            } else if (typeof method === 'object' || !method) {
                options = method;
                plugin.init(options, this);
                return plugin.show();

            } else {
                $.error('Method ' + method + ' does not exist on jQuery.novelist');
            }
        });
    };
    return $.fn.novelist.defaults = {
        maxCharacters:100, // maximum character limit
        hardLimit:true, // truncate characters that go over the limit
        backgroundImage:'', // custom background image
        backgroundScale:false, // should the background image be scaled to textarea/text field dimensions (CSS3)?
        direction:'vertical', // vertical or horizontal?
        onInput:function (value, characters, percent, limit) {
        }, // callback fired on input
        onLimitReached:function (value) {
        } // callback fired when the maximum character limit is reached
    };
})(jQuery);
