/* 
    Based on the original angular-resize module by Reklino <yakub89@gmail.com>
    https://github.com/Reklino/angular-resizable

    Instead of inserting DOM elements we have the user specifify which element is draggable and
    how, with the 'grabber' attribute.
    
    Provides an optional grab-handle class utilizing css pseudo-elements
    
    MIT License    
*/

angular.module('angularResizable', [])
    .directive('resizable', function() {
        return {
            restrict: 'AE',
            scope: {
                rCenteredX: "=",
                rCenteredY: "=",
            },
            link: function(scope, element, attr) {

                element.addClass('resizable');
             
                var w, h, min_w, min_h,
                    dir = scope.rDirections,
                    vx = scope.rCenteredX ? 2 : 1, // if centered double velocity
                    vy = scope.rCenteredY ? 2 : 1, // if centered double velocity
                    start_x, start_y,
                    dragDir;

                var grabber, direction;
                
                var dragMove = function(e) {

                    var newWidth = element.width();
                    var newHeight = element.height();
                
                    var x_offset = start_x - e.clientX;
                    var y_offset = start_y - e.clientY;
                    
                    switch(dragDir) {
                        case 'right':
                            newWidth = w - (x_offset * vx); 
                            break;
                        case 'bottom':
                            newHeight = h - (y_offset * vy); 
                            break;
                        case 'bottomright':
                            newWidth = w - (x_offset * vx); 
                            newHeight = h - (y_offset * vy); 
                            break;
                    }

                    if( newWidth > min_w ) {
                        element.width(newWidth + 'px');
                    }

                    if( newHeight > min_h ) {
                        element.height(newHeight + 'px');
                    }
                };
                
                var dragStart = function(e, direction) {
                
                    dragDir = direction;
                    
                    start_x = e.clientX;
                    start_y = e.clientY; 

                    w = element.width();
                    h = element.height();

                    min_w = parseInt(element.css("min-width"));
                    min_h = parseInt(element.css("min-height"));
                    min_w = min_w ? min_w : 0;
                    min_h = min_h ? min_h : 0;
                    
                    // Prevent transition while dragging
                    element.addClass('resizing no-transition');

                    document.addEventListener('mouseup', function() {
                        document.removeEventListener('mousemove', dragMove, false);
                        element.removeClass('no-transition');
                    });
                    
                    document.addEventListener('mousemove', dragMove, false);
                    
                    // Disable highlighting while dragging
                    if(e.stopPropagation) {
                        e.stopPropagation();
                    }
                    if(e.preventDefault) {
                        e.preventDefault();
                    }
                    e.cancelBubble = true;
                    e.returnValue = false;
                };

                element.find("[handle]").each( function() {
                        $(this).mousedown( function(e) {
                                dragStart(e, $(this).attr("handle") );
                            });
                    });
            }
        }
    });