/**
 * Created by CPU11650_LOCAL on 11/17/2017.
 */

var TAG_SILO = 1;
var silo = cc.Sprite.extend({
    logicHeight:2,
    logicWidth:2,
    logicX:null,
    logicY:null,
    _layerSilo:LAYER_SILO,
    _siloImg: null,
    deltaX:0,
    deltaY:0,
    name:"silo",

    ctor:function(){

        this._super(this._layerSilo);
        this._siloImg = new cc.Sprite(SILO_IMG);
        this._siloImg.setAnchorPoint(0.5,0);
        this._siloImg.setPosition(cc.p(this.width/2,this.height/4.5));
        this.addChild(this._siloImg,1,TAG_SILO);
        this.setAnchorPoint(0.5,1);
        this.addEvent();
    },
    addEvent: function () {
        var self = this;
        var listenerDrag = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan: function(touch,event) {
                var target = event.getCurrentTarget();

                //Get the position of the current point relative to the button
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                //Check the click area
                if (cc.rectContainsPoint(rect, locationInNode)) {
           //         cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);

                    return true;
                }
                return false;
            },
            onTouchMoved: this.drag.bind(this),
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
           //     cc.log("sprite onTouchesEnded..at..::  " + touch.x+" "+touch.y);
                var par = self.getParent();
                //Reset zOrder and the display sequence will change

            }
        });
        cc.eventManager.addListener(listenerDrag,this);
    },
    drag: function (touch,event) {
        var par = this.getParent();
        var delta = touch.getDelta();
      //  cc.log("silo: "+touch.getLocationX()+" "+touch.getLocationY());
        this.deltaX += delta.x/par._currentScale;
        this.deltaY += delta.y/par._currentScale;
        //cc.log("silo: "+delta.x+" "+delta.y);
        var xx = this.x+ this.deltaX;
        var yy = this.y+ this.deltaY;
        var node1 = touch.getLocation();
        var node2 = par.winTolayer(node1.x,node1.y);
        var node = par.physicTologic(node2.x,node2.y);
      //  cc.log("silo :"+this.logicX+" + "+this.logicY+" : "+node.x+" "+node.y);
        if((node.x !== this.logicX || node.y !== this.logicY )) {
            this.deltaX = 0;
            this.deltaY = 0;
            par.fill(this, this.logicX, this.logicY, "empty");
            this.logicX = node.x;
            this.logicY = node.y;
            this.setPosition(par.logicToPhysic(node.x, node.y));
            par.fill(this, this.logicX, this.logicY, this.name);
        }

    },
    flip:function(){
        this.flippedX = !this.flippedX;
        this._siloImg.flippedX = !this._siloImg.flippedX;
    }
})