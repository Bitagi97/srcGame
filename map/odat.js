/**
 * Created by CPU11650_LOCAL on 11/17/2017.
 */

var TAG_ODAT = 2;
var odat = cc.Sprite.extend({
    logicHeight:1,
    logicWidth:1,
    logicX:null,
    logicY:null,
    name:"odat",
    status:null,
    ctor:function(){
        this._super(GRASS);
   //     this.setColor(cc.color(0,0,0,255));
        this.setScaleX(256/this.width);
        this.setScaleY(128/this.height);
        this.setAnchorPoint(0.5,1);
        this.addEvent();
        this.status = "empty";
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
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);

                    return true;
                }
                return false;
            },
            onTouchMoved: this.drag.bind(this),
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                cc.log("sprite onTouchesEnded.. ");
                var par = self.getParent();
                var node = par.logicPos(self.x,self.y);
                par.fill(par._matran[self.logicX][self.logicY],self.logicX,self.logicY,"empty");

                self.logicX = node.x;
                self.logicY = node.y;
                self.setPosition(par.physicPos(node.x,node.y));
                par.fill(self,self.logicX,self.logicY,self.name);
                //Reset zOrder and the display sequence will change

            }
        });
     //   cc.eventManager.addListener(listenerDrag,this);
    },
    drag: function (touch,event) {
        var par = this.getParent();
        var delta = touch.getDelta();
        this.x += delta.x/par._currentScale;
        this.y += delta.y/par._currentScale;
    },
    flip:function(){
        this.flippedX = !this.flippedX;
        this._siloImg.flippedX = !this._siloImg.flippedX;
    }
})