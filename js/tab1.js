var that;
class Tab {
    constructor(id) {
        that = this;
        //获取元素
        this.main = document.querySelector(id);
        this.add = this.main.querySelector(".tabadd")

        this.ul = this.main.querySelector(".fisrstnav ul:first-child")
        this.fsection = this.main.querySelector(".tabscon")
        this.init();
    }

    init() {
        //绑定添加功能
        this.updateNode()
        this.add.onclick = this.addTab;
        //初始化操作 让相关的元素绑定事件
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.removes[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick=this.editTab;
        }
    }
    //获取所有li和section
    updateNode() {
        this.lis = this.main.querySelectorAll("li");
        this.sections = this.main.querySelectorAll("section");
        this.removes = this.main.querySelectorAll(".icon-guanbi")
        this.spans = this.main.querySelectorAll(".fisrstnav li span:first-child")
    }
    //切换功能
    toggleTab() {
        //console.log(this.index);
        that.clearClass()
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';

    }
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    //添加功能
    addTab() {
        that.clearClass();
        /* alert(11); */
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>'
        var section = '<section class="conactive">新选项卡</section>'
        //追加到两个追加到对应的元素里面
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML('beforeend', section);
        that.init();
    }
    //删除功能
    // 3. 删除功能
    removeTab(e) {
        e.stopPropagation(); // 阻止冒泡 防止触发li 的切换点击事件
        var index = this.parentNode.index;
        console.log(index);
        // 根据索引号删除对应的li 和section   remove()方法可以直接删除指定的元素
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        // 当我们删除的不是选中状态的li 的时候,原来的选中状态li保持不变
        if (document.querySelector('.liactive')) return;
        // 当我们删除了选中状态的这个li 的时候, 让它的前一个li 处于选定状态
        index--;
        // 手动调用我们的点击事件  不需要鼠标触发
        that.lis[index] && that.lis[index].click();
    }
    //修改功能
    editTab() {
        var str=this.innerHTML;
       //栓剂禁止选定文字
       window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML='<input type=text />'
        var input=this.children[0];
        input.value=str;
        input.select();//文本框里面的文字处于选定状态
        //我们离开文本框 值给span
        input.onblur=function(){
            this.parentNode.innerHTML=this.value
        }
        input.onkeyup=function(e){
            if(e.keyCode===13)
            {//手动调用离开表单失去焦点
                this.blur();
            }
        }
    }
}
var tab = new Tab('#tab');

