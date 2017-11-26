/**
 * Created by CPU11650_LOCAL on 11/7/2017.
 */
var TAG_TILE_MAP = 1;

var map = cc.Layer.extend( {

        _winsize:null,
        _currentScale:1,
        _centerPoint:cc.p(cc.winSize.width/2,cc.winSize.height/2),
        _bg:null,
        _mmap:null,

        ctor:function(){
            this._super();

            console.log(cc.winSize.width +" "+ cc.winSize.height);

            //var slX = cc.winSize.width/bg.width+1;
            //var slY = cc.winSize.height/bg.height+1;
            //
            //for(var j=0;j<slY;j++) {
            //   var y = -bg.height/2+bg.height*j/2;
            //    for (var i = 0; i < slX+2; i++) {
            //        var map = new cc.Sprite(grassImage);
            //        map.setAnchorPoint(cc.p(0, 0));
            //        map.setPosition(cc.p( -map.width/2 + i * map.width/2, y));
            //        this.addChild(map,1);
            //    }
            //}

            //this._bg = new cc.TMXTiledMap("Art/Map/bg2.tmx");
            //this._bg.setAnchorPoint(cc.p(0.5, 0.5));
            //this._bg.setPosition(this._centerPoint);
            //this.addChild(this._bg,0);

            this._mmap = new cc.TMXTiledMap("Art/Map/mmap.tmx");
            this._mmap.setAnchorPoint(cc.p(0.5,0.5));
            this._mmap.setPosition(this._centerPoint);
            this.addChild(this._mmap,1,TAG_TILE_MAP);



            var listener1 = cc.EventListener.create({
                event: cc.EventListener.MOUSE,
                onMouseMove: this.Drag.bind(this)
            });
            var listener2 = cc.EventListener.create({
                event: cc.EventListener.MOUSE,
                onMouseScroll: this.Zoom.bind(this)
            });
            cc.eventManager.addListener(listener2,this);
            cc.eventManager.addListener(listener1,this);




        },
        Zoom: function(e) {
            var lstScale = this._currentScale;
            var winSize = cc.winSize;
            var cex = this._centerPoint.x + this.getPosition().x;
            var cey = this._centerPoint.y + this.getPosition().y;
            var cursorX = e.getLocation().x;
            var cursorY = e.getLocation().y;

            var cx = - cursorX + cex;
            var cy = - cursorY + cey;
            cc.log("cex : " + cex + "; cey = " + cey);
            cc.log("cursorX : " + cursorX + "; cursorY = " + cursorY);
            cc.log("cx : " + cx + "; cy = " + cy);
            if (e.getScrollY() === 1) {
                if (this._currentScale > 0.5) {
                    this._currentScale = this._currentScale - 0.1;
                    this.setScale(this._currentScale);
                    this.x -= cx * 0.1 / lstScale;
                    this.y -= cy * 0.1 / lstScale;
                    // this.x -= 10;
                    // this.y -= 10;
                }
            } else {
                if (this._currentScale < 2) {
                    this._currentScale = this._currentScale + 0.1;
                    this.setScale(this._currentScale);
                    this.x += cx * 0.1 / lstScale;
                    this.y += cy * 0.1 / lstScale;
                    // this.x += 100 * 0.1;
                    // this.y += 100 * 0.1;
                }
            }
        },

        Drag: function (event) {

            //console.log(cursorX+" drag  "+cursorY);
            if(cc.rectContainsPoint(this._mmap.getBoundingBox(),event.getLocation()))
                if(event.getButton() == cc.EventMouse.BUTTON_LEFT){
                    var node = event.getCurrentTarget();
                    //cc.log(node.x + " " + node.y);

                    node.x += event.getDeltaX();
                    node.y += event.getDeltaY();

                }
        },
        addObject:function(sprite,x,y) {

        }




    }
)
