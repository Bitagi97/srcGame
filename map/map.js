/**
 * Created by CPU11650_LOCAL on 11/7/2017.
 */

var SCALE_SPEED = 0.05;
var OUT_WIN = 1;
var NOT_OUT = 0;

var map = cc.Layer.extend( {
        _currentScale:1,
        _centerPoint:cc.p(cc.winSize.width/2,cc.winSize.height/2),
        _mapWidth:32,
        _mapHeight:32,
        _silo:null,
        _maTran:null,
        _widthUnit:256,
        _heightUnit:128,
        _ox:null,
        _oy:null,
        _root:null,
        _rootBg:null,
        _bgHeight:4800,
        _bgWidth:9770,
        ctor:function(){
            this._super();
            this._root = cc.p(3100,this.getContentSize().height);
           // this._root = cc.p(0,0);
            this._oy = [this._heightUnit,-this._widthUnit,-this._root.x*this._heightUnit+this._root.y*this._widthUnit];
            this._ox = [-this._heightUnit,-this._widthUnit,this._root.x*this._heightUnit+this._root.y*this._widthUnit];

            this.addBackGround();
            //this._bg = new cc.TMXTiledMap("Art/Map/bg2.tmx");
            //this._bg.setAnchorPoint(0.5,0.5);
            //this._bg.setPosition(cc.p(0,0))
            //this._bg.setScale(0.2);
            //this.addChild(this._bg,0);
           // var colorLayer = new cc.LayerColor(cc.color(255, 32, 32, 128), cc.winSize.width, cc.winSize.height);
          //  this.setAnchorPoint(0.5,0.5);

            //Set Position
            //colorLayer.x = this.getContentSize().width / 2;
            //colorLayer.y = this.getContentSize().height / 2;

            //Add to scene
            //this.addChild(colorLayer);

            this.buildMap();
            this.addEvent();
//            this.drawRoad2();
            this.drawSilo();
            this.testAddEnimation();
        },
        TAG:function(x,y){
            return (x-1)*this._mapWidth+y;
        },
        addBackGround:function(){
            var self = this;
            this._rootBg = cc.p(-1000,1300);
            var x = this._rootBg.x;
            var y = this._rootBg.y+492;
            for(var i=0;i<10;i++){
                y = y-492;
                x = this._rootBg.x;
                for(var j=0;j<20;j++){
                    var bgunit = cc.Sprite(BG_UNIT);
                    bgunit.setAnchorPoint(0,1);
                    bgunit.setPosition(cc.p(x,y));
                    x=x+492;
                    this.addChild(bgunit,0);
                }
            }
            //////////// draw cay goc trai
          //  for(var i=0)
           // for(var j=0;j<)
            var nhomcay1 = cc.Sprite(TREE_ON_CORNER);
            nhomcay1.setAnchorPoint(0, 1);
            nhomcay1.setPosition(cc.p(this._rootBg.x-50,this._rootBg.y+50));
            this.addChild(nhomcay1, 0);
            var nhomcay2 = cc.Sprite(TREE_ON_CORNER);
            nhomcay2.setAnchorPoint(0, 0);
            nhomcay2.setPosition(cc.p(-474,852));
            this.addChild(nhomcay2, 0);
            this.drawBg(TREE_ON_CORNER,-965,383,786,393,2,0,0);

            this.drawBg(TREE_ON_CORNER,-1100,210,786,393,3,0,0);

            this.drawBg(TREE_ON_CORNER,-900,50,786,393,3,0,0);

            this.drawBg(TREE_ON_CORNER,-1200,300,786,393,4,0,1);

            //////////////// draw nui
            x = -995+9.5*500;
            y = -1410+160+9.5*250;
            this.drawBg(MOUNTAIN,x,y,-500,-250,11,0,0);
            ///// draw mo + duong ray
            var mo01 = cc.Sprite(MO1);
            mo01.setAnchorPoint(0,0);
            mo01.setPosition(cc.p(-380,-460));
            this.drawBg(TRAIN,-1300,mo01.y-270,210,105,19,0,0);
            this.addChild(mo01,0);
            var mo02 = cc.Sprite(MO2);
            mo02.setAnchorPoint(0,0);
            mo02.setPosition(cc.p(450,-555));
            this.addChild(mo02,0);

            //// draw road
            this.drawBg(ROAD,-1738,-1343,258,-129,17,0,1);

            //// draw song
            for(var i=0;i<6;i++) {
                this.drawBg(RIVER3, 4128 + i * 128, -3500, 100, 50, 46, 0, 0);
            }
            this.drawBg(RIVER1,3080-524,-3500-262,524,262,12,0,0);
            this.drawBg(RIVER2,4700,-3500,150*2,150,14,0,0);


            /// draw bui cay
            this.drawBg(TREE_ON_CORNER1,153,-3609,0,0,1,0,0);
            this.drawBg(TREE_ON_CORNER1,-995,-3011,0,0,1,0,0);
            this.drawBg(TREE_ON_CORNER1,-300,this._rootBg.y-this._bgHeight,0,0,1,0,0);
            this.drawBg(TREE_ON_CORNER1,-626,this._rootBg.y-this._bgHeight,0,0,1,0,0);
            this.drawBg(TREE_ON_CORNER1,this._rootBg.x,this._rootBg.y-this._bgHeight,0,0,1,0,0);

            /// draw bui cay
            this.drawBg(TREE_ON_CORNER1,153,-3609,0,0,1,0,0);
            this.drawBg(TREE_ON_CORNER1,-995,-3011,0,0,1,0,0);
            this.drawBg(TREE_ON_CORNER1,-300,this._rootBg.y-this._bgHeight,0,0,1,0,0);
            this.drawBg(TREE_ON_CORNER1,-626,this._rootBg.y-this._bgHeight,0,0,1,0,0);
            this.drawBg(TREE_ON_CORNER1,this._rootBg.x,this._rootBg.y-this._bgHeight,0,0,1,0,0);

        },
        drawBg:function(spriteImg,x,y,xx,yy,numberOfSprite,anchorPointX,anchorPointY){
           for(var i =0;i<numberOfSprite;i++) {
               var spri = cc.Sprite(spriteImg);
               spri.setAnchorPoint(anchorPointX,anchorPointY);
               spri.setPosition(cc.p(x+xx*i,y+yy*i));
               this.addChild(spri,0);
           }
        },
        addEvent: function () {
            var self = this;
            var listenerClick = cc.EventListener.create({
                event: cc.EventListener.MOUSE,
                onMouseDown:function(event){
                    var node = event.getCurrentTarget();
                    var evenX = event.getLocationX();
                    var evenY = event.getLocationY();
                   // var node1 = event.getCurrentTarget().getChildByTag(self.TAG(0,0));
                   // cc.log("root1 "+node1.x+" "+node1.y);
                    // var node = cc.p(even.x,even.y);
                   // cc.log("Layer "+node.x+" "+node.y);
                    cc.log("event "+evenX+" "+evenY);
                     var node3 = self.winTolayer(evenX,evenY);
                     var node2 = self.physicTologic(node3.x,node3.y);
                  //   cc.log("logic: "+node2.x+" "+node2.y);
                    cc.log("ClickAt"+node3.x+" "+node3.y);
                     //for(var i=0;i<32;i++)
                     //   for(var j=0;j<32;j++)
                     //       cc.log(i+"-"+j+": "+self._maTran[i][j].x+" "+self._maTran[i][j].y);
                 //    if(self._maTran[23][23] === null) return;
                 //   cc.log("physic : "+self._maTran[23][23].x+" "+self._maTran[23][23].y);

                   // cc.log("logic : "+self._maTran[23][23].logicX+" "+self._maTran[23][23].logicY);
                }
            });
            var listenerDrag = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: function (touch, event) {
                    return true;
                },
                onTouchMoved:this.drag.bind(this)
            });
            var listenerZoom = cc.EventListener.create({
                event:  cc.EventListener.MOUSE,
                onMouseScroll: this.zoom.bind(this)
            });
            var listenerFlip = cc.EventListener.create({
                event: cc.EventListener.MOUSE,
                onMouseDown: this.testFlip.bind(this)
            });
            cc.eventManager.addListener(listenerDrag,this);
            cc.eventManager.addListener(listenerZoom,this);
            cc.eventManager.addListener(listenerClick,this);
            //  cc.eventManager.addListener(listenerFlip,this);
        },
        zoom: function(e) {
            var lstScale = this._currentScale;
            var winSize = cc.winSize;
            var cex = this.getContentSize().width/2 + this.x;
            var cey = this.getContentSize().height/2 + this.y;
            var cursorX = e.getLocation().x;
            var cursorY = e.getLocation().y;
            var cx = - cursorX + cex;
            var cy = - cursorY + cey;
            //cc.log("cex : " + cex + "; cey = " + cey);
            //cc.log("cursorX : " + cursorX + "; cursorY = " + cursorY);
            //cc.log("cx : " + cx + "; cy = " + cy);
            if (e.getScrollY() === 1) {
                if ( this._bgHeight*(this._currentScale-SCALE_SPEED)>=cc.winSize.height && this._bgWidth*(this._currentScale-SCALE_SPEED)>=cc.winSize.width) {
                    this._currentScale = this._currentScale - SCALE_SPEED;
                    this.setScale(this._currentScale);
                    this.x -= cx * SCALE_SPEED / lstScale;
                    this.y -= cy * SCALE_SPEED / lstScale;
                    if(this.checkOutWinSize()!= NOT_OUT){
                        this.x += cx * SCALE_SPEED / lstScale;
                        this.y += cy * SCALE_SPEED / lstScale;

                    }
                    var t = this.checkOutWinSize();
                    cc.log("error 1: " + t);
                    this.fixOutWinSize(t);
                }
            } else {
                if (this._currentScale < 1) {
                    this._currentScale = this._currentScale + SCALE_SPEED;
                    this.setScale(this._currentScale);

                    this.x += cx * SCALE_SPEED / lstScale;
                    this.y += cy * SCALE_SPEED / lstScale;
                    if(this.checkOutWinSize()!= NOT_OUT){
                        this.x -= cx * SCALE_SPEED / lstScale;
                        this.y -= cy * SCALE_SPEED / lstScale;
                        //cc.log("check1 : true");
                    }
                    var t = this.checkOutWinSize();
                    cc.log("error 2: " + t);
                    this.fixOutWinSize(t);

                }
            }
        },
        fixOutWinSize:function(error) {

            if(error == NOT_OUT) return;

                var node1 = this.layerToWin(this._rootBg.x,this._rootBg.y);
                var node2 =  this.layerToWin(this._rootBg.x+this._bgWidth,this._rootBg.y-this._bgHeight);
                if(node1.x>0)
                    this.x -= node1.x;
                if(node2.x<cc.winSize.width)
                    this.x -= (node2.x - cc.winSize.width);
                if(node1.y<cc.winSize.height)
                    this.y -= (node1.y-cc.winSize.height);
                if(node2.y>0)
                    this.y -= node2.y;

        },
        //checkPointInside: function(p,x,y) {
        //    var polygon = [];
        //    //polygon.push(this.physicPos(x,y));
        //    //polygon.push(this.physicPos(x+1,y));
        //    //polygon.push(this.physicPos(x+1,y+1));
        //    //polygon.push(this.physicPos(x,y+1));
        //    //polygon.push(this.physicPos(x,y));
        //    var sum = 0;
        //
        //    function lengthVec(p){
        //        return p.x* p.x + p.y* p.y;
        //    }
        //    function calculate(p1,p2,p3){
        //        var vect1 = cc.p(p2.x-p1.x,p2.y-p1.y);
        //        var vect2 = cc.p(p3.x-p1.x,p3.y-p1.y);
        //        var ang = (vect1.x * vect2.x+vect1.y*vect2.y)/(lengthVec(vect1)*lengthVec(vect2));
        //        return Math.acos(ang);
        //    }
        //    for(var i=0;i<4;i++){
        //        sum += calculate(p,polygon[i],polygon[i+1]);
        //    }
        //    cc.log("log sum " +sum);
        //    if(Math.abs(sum-2*Math.PI)<=EPS) return true;
        //    return false;
        //},
        drag: function (touch,event) {

            var target = event.getCurrentTarget();
            var delta = touch.getDelta();
            this.x += delta.x;
            this.y += delta.y;
            if(this.checkOutWinSize()){
                this.x -= delta.x;
                this.y -= delta.y;
            }

        },
        checkOutWinSize:function() {
            var node = this.layerToWin(this._rootBg.x, this._rootBg.y);
            if (node.x > 0 || node.y < cc.winSize.height)
                return OUT_WIN;
            node = this.layerToWin(this._rootBg.x, this._rootBg.y - this._bgHeight);
            if (node.x > 0 || node.y > 0)
                return OUT_WIN;
            node = this.layerToWin(this._rootBg.x+this._bgWidth,this._rootBg.y);
            if (node.x < cc.winSize.width || node.y < cc.winSize.height)
                return OUT_WIN;
            node = this.layerToWin(this._rootBg.x+this._bgWidth,this._rootBg.y-this._bgHeight);
            if (node.x < cc.winSize.width || node.y >0)
                return OUT_WIN;
            return NOT_OUT;

        }
        ,
        testFlip:function(e) {
          this.Flip(23,23);
        },
        flip: function(x,y) {
            if(this._maTran[x][y] !== null){
             //   cc.log(this._maTran[x][y].x+" "+this._maTran[x][y].y);
           //     this._maTran[x][y].setScale(Math.random());
                this._maTran[x][y].flip();
            }
        },
        logicToPhysic: function (i,j) {
            return cc.p(this._maTran[i][j].x,this._maTran[i][j].y);
        },
        physicTologic: function(x,y) {
            var self = this;
            //x=x*this._currentScale;
            //y=y*this._currentScale;


            function sqr(x){
                return x*x;
            }
            function distanceFromPointToLine(x,y,line){
                var tu = line[0]*x+line[1]*y+line[2];
                return Math.abs(tu)/(Math.sqrt(sqr(line[0])+sqr(line[1])));
            }
            var ds = Math.sqrt(64*64+128*128);
            var xx = distanceFromPointToLine(x,y,this._oy);
            var yy = distanceFromPointToLine(x,y,this._ox);


            return cc.p(Math.floor(xx*ds/sqr(128)),Math.floor(yy*ds/sqr(128)));

        },
        winTolayer:function(x,y){

            var center = cc.p(cc.winSize.width/ 2,cc.winSize.height/2);
            var cex = this.getContentSize().width/2 + this.x;  // diem chinh giua cua layer so voi man hinh
            var cey = this.getContentSize().height/2 + this.y;
            var cursorX = x;
            var cursorY = y;
            var cx = cursorX - cex;
            var cy = cursorY - cey;
            return cc.p(center.x+cx/this._currentScale,center.y+cy/this._currentScale);
        },
        layerToWin:function(x,y) {
            var center = cc.p(cc.winSize.width/ 2,cc.winSize.height/2);
            var xx = (x-center.x)*this._currentScale;
            var yy = (y-center.y)*this._currentScale;
            var cex = this.getContentSize().width/2 + this.x;  // diem chinh giua cua layer so voi man hinh
            var cey = this.getContentSize().height/2 + this.y;
            return cc.p(xx+cex,yy+cey);

        },
        buildMap:function(){
            this._maTran = new Array(this._mapHeight);
            for(var i=0;i<this._mapHeight;i++)
                this._maTran[i]= new Array(this._mapWidth);

            for(var i=0;i<this._mapHeight;i++)
                for(var j=0;j<this._mapWidth;j++){
                    var grass = new odat();
                    grass.logicX = i;
                    grass.logicY = j;
                    grass.setPosition(cc.p(this._root.x+(i-j)*this._widthUnit/2,this._root.y-(i+j)*this._heightUnit/2));
                    this._maTran[i][j] = grass;
                    this.addChild(this._maTran[i][j]);
                }

            ///////////////
            //var fileName = "mapInit.json";
            //var jsonData = cc.loader.getRes(fileName);
            //if (jsonData == null) {
            //    cc.log("Load ip config errorr");
            //}else
            //{
            //
            //}

        },
        isEmpty:function(x,y){
            return this._maTran[x][y].status === "empty";
        },
        canAdd:function(sprite,x,y){
            for(var i = x;i<x+sprite.logicWidth;i++)
                for(var j = y;j<y+sprite.logicHeight;j++)
                    if(!this.isEmpty(i,j))
                        return false;
            return true;
        },
        addObject:function(sprite,x,y) {
            if(!this.canAdd(sprite,x,y))
                return;
            sprite.logicX = x;
            sprite.logicY = y;
            sprite.setPosition(this.logicToPhysic(x,y));

            this.fill(sprite,x,y,sprite.name);
            this.addChild(sprite,2,(x-1)*this._mapWidth+y);
        }
        ,
        fill:function(sprite,x,y,t) {
            //cc.log(sprite.name+": " + sprite.logicHeight+" "+sprite.logicWidth);
            for(var i = x;i<x+sprite.logicWidth;i++)
                for(var j = y;j<y+sprite.logicHeight;j++)
                    this._maTran[i][j].status = t;
        },
        //drawRoad2:function(){
        //
        //    for(var i=16;i<30;i++){
        //        var road1 = cc.Sprite("Art/Map/road02.png");
        //        road1.setAnchorPoint(0.5,1);
        //        road1.logicHeight = 2;
        //        road1.logicWidth = 2;
        //        road1.name = "road1";
        //        this.addObject(road1,15,i);
        //    }
        //    var templeHouse = cc.Sprite("Art/Map/temple_house.png");
        //    templeHouse.setAnchorPoint(0.5,0.5);
        //    templeHouse.logicHeight = 3;
        //    templeHouse.logicWidth = 3;
        //    templeHouse.name = "tempHouse";
        //    this.addObject(templeHouse,15,14);
        //},
        deleteObject:function(x,y){
            if(this.isEmpty(x,y)) return;
            var note = this.getChildByTag((x-1)*32+y);
            this.fill(node,x,y,"empty");
            this.removeChild(note);
        },
        testDelete:function(e) {
        //   this.deleteObject(15,15);
        },
        drawSilo:function(){
           // cc.log("1");
           // cc.log("1");
            var newSilo = new silo();
            this.addObject(newSilo,23,23);
        },
        testAddEnimation: function(){
            //var bagia = fr.createAnimationById(resAniId.Cayrung,this);
            //bagia.getAnimation().gotoAndPlay("1",-1,-1,1);
            //
            //bagia.setCompleteListener(function () {
            //    bagia.getAnimation().gotoAndPlay("1",-1,-1,1);
            //}.bind(this));
            //bagia.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
            //this.addChild(bagia,100);
        }

    }
)
