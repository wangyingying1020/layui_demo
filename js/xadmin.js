$(function() {
    //加载弹出层
    layui.use(['form', 'element'],
        function() {
            layer = layui.layer;
            element = layui.element;
        });

    //触发事件
    var tab = {
        tabAdd: function(title, url, id) {
            //新增一个Tab项
            // console.log(url, 'url-----', title, 'title----', id, '点击')
            element.tabAdd('xbs_tab', {
                title: title,
                content: '<iframe tab-id="' + id + '" frameborder="0" src="' + url + '" scrolling="yes" class="x-iframe"></iframe>',
                id: id
            })
        },

        tabDelete: function(othis) {
            //删除指定Tab项
            element.tabDelete('xbs_tab', id); //删除：“商品管理”
            othis.addClass('layui-btn-disabled');
        },
        tabChange: function(id) {
            //切换到指定Tab项
            element.tabChange('xbs_tab', id); //切换到：用户管理
        },

        contabAdd: function(title, url, id) {
            //新增一个Tab项
            // console.log(url, 'url-----', title, 'title----', id, '点击')
            parent.layui.element.tabAdd('xbs_tab', {
                title: title,
                content: '<iframe tab-id="' + id + '" frameborder="0" src="' + url + '" scrolling="yes" class="x-iframe"></iframe>',
                id: id
            })
        },

        contabDelete: function(othis) {
            //删除指定Tab项
            parent.layui.element.tabDelete('xbs_tab', id); //删除：“商品管理”
            othis.addClass('layui-btn-disabled');
        },
        contabChange: function(id) {
            //切换到指定Tab项
            parent.layui.element.tabChange('xbs_tab', id); //切换到：用户管理
        }
    };
    // var  tabcon=false;




    tableCheck = {
        init: function() {
            $(".layui-form-checkbox").click(function(event) {
                if ($(this).hasClass('layui-form-checked')) {
                    $(this).removeClass('layui-form-checked');
                    if ($(this).hasClass('header')) {
                        $(".layui-form-checkbox").removeClass('layui-form-checked');
                    }
                } else {
                    $(this).addClass('layui-form-checked');
                    if ($(this).hasClass('header')) {
                        $(".layui-form-checkbox").addClass('layui-form-checked');
                    }
                }

            });
        },
        getData: function() {
            var obj = $(".layui-form-checked").not('.header');
            var arr = [];
            obj.each(function(index, el) {
                arr.push(obj.eq(index).attr('data-id'));
            });
            return arr;
        }
    }

    //开启表格多选
    tableCheck.init();


    $('.container .left_open i').click(function(event) {
        if ($('.left-nav').css('left') == '0px') {
            $('.left-nav').animate({ left: '-221px' }, 100);
            $('.page-content').animate({ left: '0px' }, 100);
            $('.page-content-bg').hide();
        } else {
            $('.left-nav').animate({ left: '0px' }, 100);
            $('.page-content').animate({ left: '221px' }, 100);
            if ($(window).width() < 768) {
                $('.page-content-bg').show();
            }
        }

    });

    $('.page-content-bg').click(function(event) {
        $('.left-nav').animate({ left: '-221px' }, 100);
        $('.page-content').animate({ left: '0px' }, 100);
        $(this).hide();
    });

    $('.layui-tab-close').click(function(event) {
        $('.layui-tab-title li').eq(0).find('i').remove();
    });

    $("tbody.x-cate tr[fid!='0']").hide();
    // 栏目多级显示效果
    $('.x-show').click(function() {
        if ($(this).attr('status') == 'true') {
            $(this).html('&#xe625;');
            $(this).attr('status', 'false');
            cateId = $(this).parents('tr').attr('cate-id');
            $("tbody tr[fid=" + cateId + "]").show();
        } else {
            cateIds = [];
            $(this).html('&#xe623;');
            $(this).attr('status', 'true');
            cateId = $(this).parents('tr').attr('cate-id');
            getCateId(cateId);
            for (var i in cateIds) {
                $("tbody tr[cate-id=" + cateIds[i] + "]").hide().find('.x-show').html('&#xe623;').attr('status', 'true');
            }
        }
    })

    //左侧菜单效果
    // $('#content').bind("click",function(event){
    $('#nav li').click(function(event) {
        var that = this;
        if ($(that).children('.sub-menu').length) {
            if ($(that).hasClass('open')) {
                $(that).removeClass('open');
                $(that).find('.nav_right').html('&#xe697;');
                $(that).children('.sub-menu').stop().slideUp();
                $(that).siblings().children('.sub-menu').slideUp();
            } else {
                $(that).addClass('open');
                $(that).children('a').find('.nav_right').html('&#xe6a6;');
                $(that).children('.sub-menu').stop().slideDown();
                $(that).siblings().children('.sub-menu').stop().slideUp();
                $(that).siblings().find('.nav_right').html('&#xe697;');
                $(that).siblings().removeClass('open');
            }
        } else {

            var url = $(that).children('a').attr('_href');
            var title = $(that).find('cite').html();
            var index = $('#nav li').index($(that));

            for (var i = 0; i < $('.x-iframe').length; i++) {
                if ($('.x-iframe').eq(i).attr('tab-id') == index + 1) {
                    tab.tabChange(index + 1);
                    event.stopPropagation();
                    return;
                }
            };
            tab.tabAdd(title, url, index + 1);
            tab.tabChange(index + 1);
        }
        event.stopPropagation();
    })

    $('.tabcon').on('click', function() {
        var that = this;

        var url = $(that).attr('_href');
        var title = $(that).attr('_title');
        var id = '1000' + $(that).attr('_id');
        for (var i = 0; i < window.parent.$('.x-iframe').length; i++) {
            if (window.parent.$('.x-iframe').eq(i).attr('tab-id') == id) {
                tab.contabChange(id);
                event.stopPropagation();
                return;
            }
        };

        tab.contabAdd(title, url, id);
        tab.contabChange(id);
    })




    // 顶部导航操作 刷新 一键关闭，关闭自己
    $('.kit-item').on('click', function(e) {
        var a = $(this).attr('data-target');

        $('.layui-tab-item').each(function(i, v) {
            switch (a) {
                // 刷新
                case "refresh":
                    if ($(v).hasClass('layui-show')) {
                        var n = $(v).children("iframe");
                        n.attr("src", n.attr("src"));
                    }
                    $(".kit-tab-tool-body").hide();
                    // console.log(n)
                    break;
                case "closeCurrent":
                    // 关闭自己
                    if ($(v).hasClass('layui-show')) {
                        var id = $(v).children("iframe").attr('tab-id');
                        //删除指定Tab项
                        element.tabDelete('xbs_tab', id);
                    }
                    $(".kit-tab-tool-body").hide();
                    break;
                case "closeOther":
                    // 关闭除自己外的其他
                    if ($(v).hasClass('layui-show') || i == 0) {

                    } else {
                        var id = $(v).children("iframe").attr('tab-id');
                        //删除指定Tab项
                        element.tabDelete('xbs_tab', id);
                    }
                    $(".kit-tab-tool-body").hide();
                    break;
                case "closeAll":
                    // 关闭所有
                    if (i != 0) {
                        var id = $(v).children("iframe").attr('tab-id');
                        //删除指定Tab项
                        element.tabDelete('xbs_tab', id);
                    }
                    $(".kit-tab-tool-body").hide();
            }

        })

    })
})
var cateIds = [];

function getCateId(cateId) {

    $("tbody tr[fid=" + cateId + "]").each(function(index, el) {
        id = $(el).attr('cate-id');
        cateIds.push(id);
        getCateId(id);
    });
}




/*弹出层*/
/*
    参数解释：
    title   标题
    url     请求的url
    id      需要操作的数据id
    w       弹出层宽度（缺省调默认值）
    h       弹出层高度（缺省调默认值）
*/
function x_admin_show(title, url, w, h) {
    if (title == null || title == '') {
        title = false;
    };
    if (url == null || url == '') {
        url = "404.html";
    };
    if (w == null || w == '') {
        w = ($(window).width() * 0.9);
    };
    if (h == null || h == '') {
        h = ($(window).height() - 50);
    };
    layer.open({
        type: 2,
        area: [w + 'px', h + 'px'],
        fix: false, //不固定
        maxmin: true,
        shadeClose: true,
        shade: 0.4,
        title: title,
        content: url
    });
}

/*关闭弹出框口*/
function x_admin_close() {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}