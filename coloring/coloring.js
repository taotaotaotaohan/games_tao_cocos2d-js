//*created by tao 5/25*//
var HelloWorldLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var test=json_parse(config);
        cc.log(test);
        var size=cc.winSize;
        var res={
            bg:"res/194505.png",
            //color是专有变量，不得占用
            colorr:"res/194506.png"
        };
        var sprite=["bg","colorr"];
        var location={
            bg:[size.width/2,size.height/2],
            colorr:[size.width/6.2,size.height/4.5]
        };
        self=this;
        var create=function(sprite,res,location){
            self[sprite]=new cc.Sprite(res);
            self[sprite].setPosition(location[0],location[1]);
            self.addChild(self[sprite]);
            if(sprite=="colorr"){
                self[sprite].scale=0.38;
                //self.addChild(self[sprite]);
            }
        }

        //this.addChild(white,11);
        //this.addChild(green,12);
        //this.addChild(red,13);
        for(var i=0;i<sprite.length;i++){
           create(sprite[i],res[sprite[i]],location[sprite[i]]);
        }
        /*
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:function(touch, event){
                cc.log("start");
                var target = event.getCurrentTarget();
                var location=touch.getLocation();
                cc.log(location);
                var pixelArr = readPixels(location.x, location.y, 1, 1);
                cc.log(pixelArr);
            }
        }, this.colorr);
        */
        //橡皮擦

        self=this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:function(touch, event){
                cc.log("start");
                var target = event.getCurrentTarget();
                target.pEraser.setPosition(touch.getLocation());
                target.eraseByBlend();
                return true;
            },
            onTouchMoved:function (touch, event) {
                var target = event.getCurrentTarget();
                target.pEraser.setPosition(touch.getLocation());
                target.eraseByBlend();
            }
        }, this);
        ////////////////
        var listener_sprite_click = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,

            onTouchBegan:function(touch, event){
                var x0=size.width/2-398;
                var y0=size.height/2-224;
                var target = event.getCurrentTarget();
                var location=touch.getLocation();
                var bPixels = new Uint8Array(4);
                gl.readPixels(location.x, location.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, bPixels);
                //gl.readPixels(-1, -1, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, bPixels);
                cc.log(bPixels);

                return true;
            },
            onTouchMoved:function(touch, event){
                return true;
            },
            onTouchEnded:function(touch, event){
                return true;
            }
        });
        cc.eventManager.addListener(listener_sprite_click, 1);

    },


});
var StartScene = cc.Scene.extend({
    onEnter:function () {
        //cc.log(this._super());
        this._super();
        var layer = new HelloWorldLayer();
        //cc.log(layer);
        this.addChild(layer);

    }
});