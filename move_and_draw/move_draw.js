var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        //读取配置信息
        var config_info=json_parse(config);
        var size = cc.winSize;
        //场景配置，背景
        this.sprite = new cc.Sprite(config_info.background_img);
        this.sprite.setPosition(size.width/2,size.height/2);
        this.sprite.scale=config_info.back_ground_scale;
        this.addChild(this.sprite, 0);
        //纹理上面的精灵（等待擦除）
        this.lion=new cc.Sprite(config_info.images[0].res);
        this.lion.setPosition(config_info.images[0].x,config_info.images[0].y);
        this.lion.scale=config_info.images[0].scale;
        //纹理下面层的精灵（不被擦除）
        this.lion_bg=new cc.Sprite(config_info.images[0].res);
        this.lion_bg.setPosition(config_info.images[0].x,config_info.images[0].y);
        this.lion_bg.scale=config_info.images[0].scale;
        //等待显示的图片
        this.dirty=new cc.Sprite(config_info.draw_layer[0].res);
        this.dirty.setPosition(config_info.draw_layer[0].pos_x,config_info.draw_layer[0].pos_y);
        this.dirty.scale=config_info.draw_layer[0].scale;
        this.addChild(this.dirty,2);
        this.addChild(this.lion_bg,1);
        //布置画布
        this.draw_page=new cc.RenderTexture(size.width,size.height);
        this.draw_page.setPosition(size.width/2,size.height/2);
        this.addChild(this.draw_page,3);
        this.draw_page.begin();
        this.lion.visit();
        this.draw_page.end();
        //布置画笔
        this.pen=new cc.DrawNode();
        this.pen.drawCircle(cc.p(0,0), 35, 360, 28, 0, 35, cc.color(0,0,0,0));
        this.pen.retain();
        self=this;
        //布置画笔形状
        this.pen_shape=new cc.Sprite(config_info.draw_tool[0].res);
        this.pen_shape.setPosition(config_info.draw_tool[0].pos_x,config_info.draw_tool[0].pos_y);
        this.pen_shape.scale=config_info.draw_tool[0].scale;
        this.pen_shape.setOpacity(0);
        this.pen_shape.runAction(cc.fadeIn(1));
        this.addChild(this.pen_shape,4);
        //设置事件监听
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:function(touch, event){
                var target = event.getCurrentTarget();
                var location=touch.getLocation();
                self.pen_shape.setPosition(location.x,location.y);
                return true;
            },
            onTouchMoved:function (touch, event) {
                var target = event.getCurrentTarget();
                var location = touch.getLocation();
                var blendfunc  = {src:cc.ONE, dst: cc.ZERO};
                self.pen.setPosition(location.x,location.y);
                self.pen_shape.setPosition(location.x,location.y);
                self.eraseByBlend();
                return true;
            },
            onTouchEnded:function(touch,event){
                return true;
            }
        }, this);

        return true;

    },
    eraseByBlend :function() {
        var blendfunc  = {src:1, dst: cc.ZERO};
        self.pen.setBlendFunc(blendfunc);
        self.draw_page.begin();
        self.pen.visit();
        self.draw_page.end();
    }

});

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);

    }
});
