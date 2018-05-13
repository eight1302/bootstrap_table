var wrapObj = {
    changeTable:function(){}
  };
//判断点击
function Tab(query){
    this.btns = query.btns;
    this.tabItem = query.tabItem;
    this.init();
}
//绘制
Tab.prototype.init = function(){
    var that = this;
    var len = this.btns.length;
    for(var i =0;i<len;i++){
        this.btns[i].index = i;
        this.btns[i].addEventListener('click',function(){
            for(var j=0;j<len;j++){
                that.tabItem[j].classList.remove('active');
                that.btns[j].classList.remove('btn-primary');
                that.btns[j].classList.add('btn-default');
            }
            this.classList.add('btn-primary');
            this.classList.remove('btn-default');
            that.tabItem[this.index].classList.add('active');
        },false);
    }
};
var wrapObj={};
var $mcRepmentTable1 = $('#mcRepmentTable1'), $mcRepmentTable2 = $('mcRepmentTable2'), $mcRepmentTable1Wrap = $('#mcRepmentTable1Wrap'),$mcRepmentTable2Wrap = $('#mcRepmentTable2Wrap'),$mcRepmentTable3Wrap = $('#mcRepmentTable3Wrap'),$mcRepmentTable3 = $('mcRepmentTable3'),
 $reportData=$('#reportData'), $reportData1 = $('#reportData1'),$reportData2 = $('#reportData2'), $historyactive = $('#historyactive'), $newactives = $('#newactives'),old_activity1 = "00000000",$abnormalsales = $('#abnormalsales'),$multiple = $('#multiple'), $modal = $('#model'),$mcStartDate1 = $('#mcStartDate1'),$key_prescribed = $('.key_prescribed');
 var $day = $('.day'),$day_one = $('.day_one'), $day_two = $('.day_two'), $day_three = $('.day_three'),$day_four = $('.day_four'), $day_five = $('.day_five'),
 $day_six = $('.day_six'), $day_server = $('.day_server'), $day_all = $('.day_all');
var old_activity,ditch='maochao';
$all_tr = $("#mcRepmentTable3 tr")
var $table = $('#table');
var new_days = getNowFormatDate();
var va_day1=getBeforeDate(new_days,0),va_day2=getBeforeDate(new_days,1),va_day3=getBeforeDate(new_days,2),va_day4=getBeforeDate(new_days,3);
va_day5=getBeforeDate(new_days,4),va_day6=getBeforeDate(new_days,5),va_day7=getBeforeDate(new_days,6),va_day8=getBeforeDate(new_days,7);

var $time_left = $('#time_left'), $time_right = $('#time_right');
    //获取当前日期
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
//前七天的数据展示
function getBeforeDate(date,n){ 
    var days = date.split('-');
    var year = parseInt(days[0]),mon = parseInt(days[1]),day = parseInt(days[2]);
    var first_day =day;
    var n = n;
    var day_mon = 1;
    var cont = 0;
    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
        if(mon == 2){
            day_mon = 29;
        }
    } else {day_mon = 28;}
    if(day>n){
        day = day-n;
    }else{
        if(mon>1) {  
            mon1=mon-1;
            mon = mon1;
            if ((mon1 == 4) || (mon1 == 6) || (mon1 == 9) || (mon1 == 11)) {day_mon = 30;} else {day_mon = 31;}
            day = day_mon+day-n;
        }  
        else {  
            year = year-1;  
            mon = 12;  
        }
    }
    s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);  
    return s;  
}


var create_name=0;
var create_account =0;
function searchFunction(){}
(function(){
	//初始选型卡
    new Tab({
        btns:document.querySelectorAll('.tab'),
        tabItem:document.querySelectorAll('.tab-item')
    });
    //点击历史活动按钮
    $historyactive.on('click',function(){
        getrepmentData1();
    });
    //点击活动按钮
    $newactives.on('click',function(){
        getrepmentData2();
    });
    //点击异常销量按钮、

    $mcStartDate1.val(new_day);
    var new_day = getNowFormatDate();
    $mcStartDate1.val(new_day);
    $abnormalsales.on('click',function(){
        getrepmentData3();
    });
    //点击按钮展示当前七天的数据
    function getDate(n){  
       var d1=$mcStartDate1.val();//格式：（例如）2017－04-08
        var d= new Date(d1);//这里日期是传递过来的，可以自己改
        d.setDate(d.getDate() + n);//天数+1
       
        var month  = d.getMonth()+1;
        var  day = d.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
         return d.getFullYear()+"-"+month+"-"+day;//新日期
      }  
     //前七天
    $time_left.on('click',function(){
        new_days=getDate(-7);
        $mcStartDate1.val(new_days);
        va_day1=getBeforeDate(new_days,0);
        va_day2=getBeforeDate(new_days,1);
        va_day3=getBeforeDate(new_days,2);
        va_day4=getBeforeDate(new_days,3);
        va_day5=getBeforeDate(new_days,4);
        va_day6=getBeforeDate(new_days,5);
        va_day7=getBeforeDate(new_days,6);
        va_day8=getBeforeDate(new_days,7);
        getrepmentData3();
                
    });

    //后七天
    $time_right.on('click',function(){
        new_days = getDate(7);
        $mcStartDate1.val(new_days);
        va_day1=getBeforeDate(new_days,0);
        va_day2=getBeforeDate(new_days,1);
        va_day3=getBeforeDate(new_days,2);
        va_day4=getBeforeDate(new_days,3);
        va_day5=getBeforeDate(new_days,4);
        va_day6=getBeforeDate(new_days,5);
        va_day7=getBeforeDate(new_days,6);
        va_day8=getBeforeDate(new_days,7);
        getrepmentData3();
    })
    
    //获取当前日期
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }

    //监听时间变化
    $mcStartDate1.change(function(){
       
        var data = $mcStartDate1.val();
        va_day1=getBeforeDate(data,0);
        va_day2=getBeforeDate(data,1);
        va_day3=getBeforeDate(data,2);
        va_day4=getBeforeDate(data,3);
        va_day5=getBeforeDate(data,4);
        va_day6=getBeforeDate(data,5);
        va_day7=getBeforeDate(data,6);
        va_day8=getBeforeDate(data,7);
        getrepmentData3();
        
        
    });
    
    //前七天的数据展示
    function getBeforeDate(date,n){ 
        var days = date.split('-');
        var year = parseInt(days[0]),mon = parseInt(days[1]),day = parseInt(days[2]);
        var first_day =day;
        var n = n;
        var day_mon = 1;
        var cont = 0;
        if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
            if(mon == 2){
                day_mon = 29;
            }
        } else {day_mon = 28;}
        if(day>n){
            day = day-n;
        }else{
            if(mon>1) {  
                mon1=mon-1;
                mon = mon1;
                if ((mon1 == 4) || (mon1 == 6) || (mon1 == 9) || (mon1 == 11)) {day_mon = 30;} else {day_mon = 31;}
                day = day_mon+day-n;
            }  
            else {  
                year = year-1;  
                mon = 12;  
            }
        }
        s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);  
        return s;  
    } 

    wrapObj.days = getrepmentData1;

     //加载tab按钮的勾选方法
    function tab_confirm(){
        var brandCode = $reportData.val();
        $.ajax({
           // url:"",
            dataType:'json',
            method : 'POST',
            data : {
                "brandCode" : brandCode
            },
            success : function(data){
               
                if(data.length>0){
                    old_activity  = data[0].replenishment_status?data[0].replenishment_status:old_activity1;
                }else{
                    old_activity = old_activity1;
                }
                
                var num1 = old_activity?old_activity.charAt(1):'',
                    num2 = old_activity?old_activity.charAt(2):'',
                    num3 = old_activity?old_activity.charAt(3):'';
                //未结束的历史活动按钮
                if(num1 == 1){
                    $historyactive.find('.ok').show();
                    $historyactive.find('.remove').hide();
                }else{
                    $historyactive.find('.remove').show();
                    $historyactive.find('.ok').hide();
                }

                //新活动的按钮
                if(num2 == 1){
                    $newactives.find('.ok').show();
                    $newactives.find('.remove').hide();
                }else{
                    $newactives.find('.remove').show();
                    $newactives.find('.ok').hide();
                }

                //异常销量的按钮
                if(num3 == 1){
                    $abnormalsales.find('.ok').show();
                    $abnormalsales.find('.remove').hide();
                }else{
                    $abnormalsales.find('.remove').show();
                    $abnormalsales.find('.ok').hide();
                }

            },
            error : function(){
                alert("请求失败,请重试");
            }
        });
    }

    //默认加载tab 按钮勾选方法
    tab_confirm();
    var outStockTableParams1 = function(params){
        if(!params){
            params.limit = 1;
            params.offset = 10;
        }
        return {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            pageSize: params.limit,   //页面大小
            page: (params.offset / params.limit) + 1,  //页码
            brandName:$reportData.val()
        };
    }

    var outStockTableParams2 = function(params){
        if(!params){
            params.limit = 1;
            params.offset = 10;
        }
        return {   
            //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            pageSize: params.limit,   //页面大小
            page: (params.offset / params.limit) + 1,  //页码
            brandCode:$reportData1.val()
        };
    }

    var outStockTableParams3 = function(params){
        if(!params){
            params.limit = 1;
            params.offset = 10;
        }
        var multiple = $multiple.val();
        var mcStartDate1 = $mcStartDate1.val();
        return {   
            //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            pageSize: params.limit,   //页面大小
            page: (params.offset / params.limit) + 1,  //页码
            brandCode:$reportData1.val(),
            multiple : multiple,
            data :mcStartDate1
        };
        
    }
    

    //监听品牌下拉框点击事件 未结束的历史捕获
    $reportData.on('change',function(){
        getrepmentData1();
    });
    //监听品牌下拉框点击事件 新活动
    $reportData1.on('change',function(){
        getrepmentData2();
    });
     //监听品牌下拉框点击事件 异常销量处理
     $reportData2.on('change',function(){
        var data = $mcStartDate1.val();
        getrepmentData3();
        $mcRepmentTable3.find('th:eq(6)').find('.th-inner').html(getBeforeDate(data,0)); 
        $mcRepmentTable3.find('th:eq(7)').find('.th-inner').html(getBeforeDate(data,1));
        $mcRepmentTable3.find('th:eq(8)').find('.th-inner').html(getBeforeDate(data,2)); 
        $mcRepmentTable3.find('th:eq(9)').find('.th-inner').html(getBeforeDate(data,3)); 
        $mcRepmentTable3.find('th:eq(10)').find('.th-inner').html(getBeforeDate(data,4)); 
        $mcRepmentTable3.find('th:eq(11)').find('.th-inner').html(getBeforeDate(data,5)); 
        $mcRepmentTable3.find('th:eq(12)').find('.th-inner').html(getBeforeDate(data,6)); 
        $mcRepmentTable3.find('th:eq(13)').find('.th-inner').html(getBeforeDate(data,7)); 
        va_day1=getBeforeDate(data,0);
        va_day2=getBeforeDate(data,1);
        va_day3=getBeforeDate(data,2);
        va_day4=getBeforeDate(data,3);
        va_day5=getBeforeDate(data,4);
        va_day6=getBeforeDate(data,5);
        va_day7=getBeforeDate(data,6);
        va_day8=getBeforeDate(data,7);
    });
    //监听异常销量处理 倍数现在
    $multiple.on('change',function(){
        var data = $mcStartDate1.val();
        getrepmentData3();
        $mcRepmentTable3.find('th:eq(6)').find('.th-inner').html(getBeforeDate(data,0)); 
        $mcRepmentTable3.find('th:eq(7)').find('.th-inner').html(getBeforeDate(data,1));
        $mcRepmentTable3.find('th:eq(8)').find('.th-inner').html(getBeforeDate(data,2)); 
        $mcRepmentTable3.find('th:eq(9)').find('.th-inner').html(getBeforeDate(data,3)); 
        $mcRepmentTable3.find('th:eq(10)').find('.th-inner').html(getBeforeDate(data,4)); 
        $mcRepmentTable3.find('th:eq(11)').find('.th-inner').html(getBeforeDate(data,5)); 
        $mcRepmentTable3.find('th:eq(12)').find('.th-inner').html(getBeforeDate(data,6)); 
        $mcRepmentTable3.find('th:eq(13)').find('.th-inner').html(getBeforeDate(data,7)); 
        va_day1=getBeforeDate(data,0);
        va_day2=getBeforeDate(data,1);
        va_day3=getBeforeDate(data,2);
        va_day4=getBeforeDate(data,3);
        va_day5=getBeforeDate(data,4);
        va_day6=getBeforeDate(data,5);
        va_day7=getBeforeDate(data,6);
        va_day8=getBeforeDate(data,7);
    });

    //未结束的历史活动主表数据
    function getrepmentData1(){
    	$mcRepmentTable1Wrap.html('<table id="mcRepmentTable1" class="table table-striped  table-hover table-responsive"></table>');
    	$mcRepmentTable1 = $('#mcRepmentTable1');
   		$mcRepmentTable1.trigger('destroy');
    	$mcRepmentTable1.bootstrapTable('destroy');
    	$mcRepmentTable1.bootstrapTable({
    		url : '',
    		method : 'POST',
            queryParams: outStockTableParams1,
    		paginationPreText:"上一页",
           	paginationNextText:'下一页',
    		search : false,
    		detailView : true,
    		uniqueId: "id",      //每一行的唯一标识，一般为主键列
	        detailView: true,     //是否显示父子表
	        showToggle:false,     //是否显示详细视图和列表视图的切换按钮
	        cardView: false,     //是否显示详细视图
	        striped: true,      //是否显示行间隔色
	        cache: false,      //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	        pagination: true,     //是否显示分页（*）
	        pageNumber:1,      //初始化加载第一页，默认第一页
	        pageSize: 50,      //每页的记录行数（*）
	        pageList: [10, 30, 60, 100],  //可供选择的每页的行数（*）
	        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
	        clickToSelect: false,                //是否启用点击选中行
	        search: false, //不显示 搜索框
	        searchOnEnterKey:false,				//设置为 true时，按回车触发搜索方法，否则自动触发搜索方法
	        searchText:'',					//初始化搜索文字
	        showRefresh:false,	//刷新
	        maintainSelected:true,		//设置为 true 在点击分页按钮或搜索按钮时，将记住checkbox的选择项
	        contentType: "application/x-www-form-urlencoded",
	        columns : [
	            {
	                field:'activity_name',
	                title:'活动名称',
	                align:'center',
	                valign:'middle'
	            },{
	                field:'activity_type',
	                title:'活动类型',
	                align:'center',
	                valign:'middle'
	            },{
	                field:'old_activity_replenish_ratio',
	                title:'剩余天数比例',
	                align:'center',
	                valign:'middle'
	            },{
	                field:'old_activity_replenish_rate',
	                title:'达成率',
                    formatter:function(value,row,index1){
                        return '<input type="text" class="dcl_name" value="'+row.old_activity_replenish_rate+'" style="margin-right:40px;width:60px;">'+
                            '<button class="btn btn-primary dcl_btn" data-id="'+ row.id +'" >确认</button>';
                    },
	                align:'center',
	                valign:'middle'
	            }
	        ],onLoadSuccess:function(data){
                

            },onExpandRow: function (index, row, $detail) {  
                InitSubTable1(index, row, $detail);
            }
    	});
    }
    getrepmentData1();
    //加载未结束的历史活动子表
    var InitSubTable1= function(index,row,$detail){
            var subTable1 =$detail.html('<div><table class="table table-striped detail  table-hover"></table></div>').find('.table');
            var queryParams = function(params){
                 params.limit = 1;
                 params.offset = 10;
                 return {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                     pageSize: 100,   //页面大小
                     page: 1,  //页码
                     id : row.id
                 };
             }
            subTable1.bootstrapTable({
                url:'',
                method:'post',
                queryParams:queryParams,
                search: false, //不显示 搜索框
                uniqueId: "id",      //每一行的唯一标识，一般为主键列
                detailView: false,     //是否显示父子表
                showToggle:false,     //是否显示详细视图和列表视图的切换按钮
                cardView: false,     //是否显示详细视图
                striped: true,      //是否显示行间隔色
                cache: false,      //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: false,     //是否显示分页（*）
                pageNumber:1,      //初始化加载第一页，默认第一页
                pageSize: 100,      //每页的记录行数（*）
                pageList: [100,1000],  //可供选择的每页的行数（*）
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                clickToSelect: false,                //是否启用点击选中行
                searchOnEnterKey:true,              //设置为 true时，按回车触发搜索方法，否则自动触发搜索方法
                searchText:true,                    //初始化搜索文字
                showRefresh:false,  //刷新
                maintainSelected:true,      //设置为 true 在点击分页按钮或搜索按钮时，将记住checkbox的选择项
                contentType: "application/x-www-form-urlencoded",
                columns:[
                    {
                        field:'goods_name',
                        title:'商品名称',
                        align:'center',
                        valign:'middle'
                    },{
                        field:'goods_no',
                        title:'商品id',
                        align:'center',
                        valign:'middle'
                    },{
                        field:'old_activity_replenish_rate',
                        title:'预估活动达成率',
                        formatter:function(value,row,index1){
                            return '<input type="text" class="dcl_name" value="'+row.old_activity_replenish_rate+'" style="margin-right:40px;width:60px;">'+
                                    '<button class="btn btn-primary playokrote_btn" data-id="'+ row.parent_id +'" data-goodsNo="'+ row.goods_no +'" >确认</button>';
                        },
                        align:'center',
                        valign:'middle'
                    },{
                        field:null,
                        title:'实际活动达成率',
                        align:'center',
                        valign:'middle'
                    }
                ]
            });
    };


    
    //新活动加载主表数据
    function getrepmentData2(){
    	$mcRepmentTable2Wrap.html('<table id="mcRepmentTable2" class="table table-striped  table-hover table-responsive"></table>');
    	$mcRepmentTable2 = $('#mcRepmentTable2');
    	$mcRepmentTable2.bootstrapTable('destroy');
    	$mcRepmentTable2.bootstrapTable({
   		url : '',
    		method : 'POST',
            queryParams: outStockTableParams2,
    		paginationPreText:"上一页",
         	paginationNextText:'下一页',
    		search : false,
    		detailView : true,
    		uniqueId: "id",      //每一行的唯一标识，一般为主键列
	        detailView: true,     //是否显示父子表
	        showToggle:false,     //是否显示详细视图和列表视图的切换按钮
	        cardView: false,     //是否显示详细视图
	        striped: true,      //是否显示行间隔色
	        cache: false,      //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	        pagination: true,     //是否显示分页（*）
	        pageNumber:1,      //初始化加载第一页，默认第一页
	        pageSize: 50,      //每页的记录行数（*）
	        pageList: [10, 30, 60, 100],  //可供选择的每页的行数（*）
	        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
	        clickToSelect: false,                //是否启用点击选中行
	        search: false, //不显示 搜索框
	        searchOnEnterKey:false,				//设置为 true时，按回车触发搜索方法，否则自动触发搜索方法
	        searchText:'',					//初始化搜索文字
	        showRefresh:false,	//刷新
	        maintainSelected:true,		//设置为 true 在点击分页按钮或搜索按钮时，将记住checkbox的选择项
	        contentType: "application/x-www-form-urlencoded",
	        columns : [
	            {
	                field:'activity_name',
	                title:'活动名称',
	                align:'center',
	                valign:'middle'
	            },{
	                field:'activity_type',
	                title:'活动类型',
	                align:'center',
	                valign:'middle'
	            },{
	                field:'start_date',
	                title:'开始时间',
	                align:'center',
	                valign:'middle'
	            },{
                    field:'end_date',
                    title:'结束时间',
                    align:'center',
                    valign:'middle'
                },{
                    field:'apply_replenished_sum',
                    title:'已补货数',
                    align:'center',
                    valign:'middle'
                },{
                    field:null,
                    title:'操作',
                    align:'center',
                    valign:'middle'
                }
	        ],onLoadSuccess:function(data){
	        },onExpandRow:function (index, row, $detail) {
                InitSubTable2(index, row, $detail);
            }
    	});
    }
    //加载新活动子表
    var InitSubTable2= function(index,row1,$detail){
            var queryParams = function(params){
                 params.limit = 1;
                 params.offset = 10;
                 return {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                     pageSize: 100,   //页面大小
                     page: 1,  //页码
                     id : row1.id
                 };
             }
            var subTable =$detail.html('<div><table class="table table-striped detail  table-hover"></table></div>').find('.table');
            subTable.bootstrapTable({
               url:'',
                method:'post',
                queryParams:queryParams,
                search: false, //不显示 搜索框
                uniqueId: "id",      //每一行的唯一标识，一般为主键列
                detailView: false,     //是否显示父子表
                showToggle:false,     //是否显示详细视图和列表视图的切换按钮
                cardView: false,     //是否显示详细视图
                striped: true,      //是否显示行间隔色
                cache: false,      //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: false,     //是否显示分页（*）
                pageNumber:1,      //初始化加载第一页，默认第一页
                pageSize: 100,      //每页的记录行数（*）
                pageList: [100,1000],  //可供选择的每页的行数（*）
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                clickToSelect: false,                //是否启用点击选中行
                searchOnEnterKey:true,              //设置为 true时，按回车触发搜索方法，否则自动触发搜索方法
                searchText:true,                    //初始化搜索文字
                showRefresh:false,  //刷新
                maintainSelected:true,      //设置为 true 在点击分页按钮或搜索按钮时，将记住checkbox的选择项
                contentType: "application/x-www-form-urlencoded",
                columns:[
                    {
                        field:'goods_name',
                        title:'商品名称',
                        align:'center',
                        valign:'middle'
                    },{
                        field:'goods_no',
                        title:'商品id',
                        align:'center',
                        valign:'middle'
                    },{
                        field:'first_replenish_ratio',
                        title:'本次补货比例',
                        align:'center',
                        valign:'middle'
                    },{
                        field:'first_replenish_sum',
                        title:'本次补货数量',
                        align:'center',
                        valign:'middle'
                    },{
                        field:'replenish_sum',
                        title:'本次补货总数量',
                        align:'center',
                        valign:'middle'
                    }
                ]
            });
    };
    data_detail=[
        {"id":1,"data_date":"2018-04-01","goodsName":"青蛙","goods_id":"85001","activity_name":"七折活动","activity_type":"天猫","ditch":"猫超","brand":"丽得姿","data1" : "2018-05-11:123,2018-05-08:10,2018-05-10:09"},
        {"id":2,"data_date":"2018-04-01","goodsName":"科林可怜","goods_id":"85002","activity_name":"七折活动","activity_type":"猫超","ditch":"猫超","brand":"丽得姿","data1" : "2018-05-11:123,2018-05-08:3"},
        {"id":3,"data_date":"2018-04-01","goodsName":"丽得姿","goods_id":"85003","activity_name":"七折活动","activity_type":"自营","ditch":"猫超","brand":"丽得姿","data1" : "2018-05-09:1"}
        ];

    //异常销量处理数据主表数据
    function getrepmentData3(){
        $mcRepmentTable3Wrap.html('<table id="mcRepmentTable3" class="table table-striped  table-hover table-responsive"></table>');
    	$mcRepmentTable3 = $('#mcRepmentTable3');
    	$mcRepmentTable3.bootstrapTable('destroy');
    	$mcRepmentTable3.bootstrapTable({
   		url : '',
    		method : 'POST',
            queryParams: outStockTableParams3,
    		paginationPreText:"上一页",
         	paginationNextText:'下一页',
    		search : false,
    		detailView : true,
    		uniqueId: "id",      //每一行的唯一标识，一般为主键列
	        detailView: false,     //是否显示父子表
	        showToggle:false,     //是否显示详细视图和列表视图的切换按钮
	        cardView: false,     //是否显示详细视图
	        striped: true,      //是否显示行间隔色
	        cache: false,      //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	        pagination: true,     //是否显示分页（*）
	        pageNumber:1,      //初始化加载第一页，默认第一页
	        pageSize: 50,      //每页的记录行数（*）
	        pageList: [10, 30, 60, 100],  //可供选择的每页的行数（*）
	        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
	        clickToSelect: false,                //是否启用点击选中行
	        search: false, //不显示 搜索框
	        searchOnEnterKey:false,				//设置为 true时，按回车触发搜索方法，否则自动触发搜索方法
	        searchText:'',					//初始化搜索文字
	        showRefresh:false,	//刷新
	        maintainSelected:true,		//设置为 true 在点击分页按钮或搜索按钮时，将记住checkbox的选择项
            contentType: "application/x-www-form-urlencoded",
            data : data_detail,
	        columns : [
	           {
	                field:'goods_id',
	                title:'商品id',
	                align:'center',
	                valign:'middle'
	            },{
	                field:'goodsName',
	                title:'商品名称',
	                align:'center',
	                valign:'middle'
	            },{
	                field:'data_date',
	                title:'销售日期',
	                align:'center',
	                valign:'middle'
	            },{
                    field:'average_sales',
                    title:'单品当日日均销量',
                    align:'center',
                    valign:'middle'
                },{
                    field:'firstDaySalesNum',
                    title:'当日实际销量',
                    align:'center',
                    valign:'middle'
                },{
                    field:'multiple',
                    title:'N倍日均销量（1位小数）',
                    align:'center',
                    valign:'middle'
                },{
                    field:null,
                    title:va_day1,
                    align:'center',
                    formatter:function(value,row,index1){
                        let mite = row.data1.split(',');
                        let data_time =0;
                        let detail =0;
                        let data_detail = [];
                        for(var i=0; i<mite.length;i++){
                            data_detail.push(mite[i].split(':'));
                            for(var j=0;j<data_detail.length;j++){
                                const time = data_detail[j][0]
                                if( time== va_day1){
                                    data_time = data_detail[j][0];
                                    detail =data_detail[j][1];
                                }
                            } 
                        }
                        if(detail!=0){
                            return '<input type="checkbox" data_time = "'+data_time+'" data_goodId = "'+row.goods_id+'" >'+
                                    '<span style="margin-left: 10px;">'+detail+'</span>';
                        }
                        return '<span style="margin-left: 10px;">-</span>';   
                    },
                    valign:'middle'
                    },{
                        field:null,
                        title:va_day2,
                        align:'center',
                        formatter:function(value,row,index1){
                            let mite = row.data1.split(',');
                            let data_time =0;
                            let detail =0;
                            let data_detail = [];
                            for(var i=0; i<mite.length;i++){
                                data_detail.push(mite[i].split(':'));
                                for(var j=0;j<data_detail.length;j++){
                                    if(data_detail[j][0] == va_day2){
                                        data_time = data_detail[j][0];
                                        detail =data_detail[j][1];
                                    }
                                } 
                            }
                            if(detail!=0){
                                return '<input type="checkbox" data_time = "'+data_time+'" data_goodId = "'+row.goods_id+'" >'+
                                    '<span style="margin-left: 10px;">'+detail+'</span>';
                            }
                            return '<span style="margin-left: 10px;">-</span>';       
                        },
                        valign:'middle'
                    },
                    {
                      field:null,
                      title:va_day3,
                      align:'center',
                     formatter:function(value,row,index1){
                        let mite = row.data1.split(',');
                        let data_time =0;
                        let detail =0;
                        let data_detail = [];
                        for(var i=0; i<mite.length;i++){
                            data_detail.push(mite[i].split(':'));
                            for(var j=0;j<data_detail.length;j++){
                                if(data_detail[j][0] == va_day3){
                                    data_time = data_detail[j][0];
                                    detail =data_detail[j][1];
                                }
                            } 
                        }
                        if(detail!=0){
                            return '<input type="checkbox" data_time = "'+data_time+'" data_goodId = "'+row.goods_id+'" >'+
                            '<span style="margin-left: 10px;">'+detail+'</span>';
                        }
                        return '<span style="margin-left: 10px;">-</span>';       
                     },
                      valign:'middle'
                    },{
                      field:null,
                      title:va_day4,
                    align:'center',
                    formatter:function(value,row,index1){
                        let mite = row.data1.split(',');
                        let data_time =0;
                        let detail =0;
                        let data_detail = [];
                        for(var i=0; i<mite.length;i++){
                            data_detail.push(mite[i].split(':'));
                            for(var j=0;j<data_detail.length;j++){
                                if(data_detail[j][0] == va_day4){
                                    data_time = data_detail[j][0];
                                    detail =data_detail[j][1];
                                }
                            } 
                        }
                        if(detail!=0){
                            return '<input type="checkbox" data_time = "'+data_time+'" data_goodId = "'+row.goods_id+'" >'+
                                    '<span style="margin-left: 10px;">'+detail+'</span>';
                        }
                        return '<span style="margin-left: 10px;">-</span>';        
                        
                    },
                      valign:'middle'
                    },{
                      field:null,
                      title:va_day5,
                    align:'center',
                    formatter:function(value,row,index1){
                        let mite = row.data1.split(',');
                            let data_time =0;
                            let detail =0;
                            let data_detail = [];
                            for(var i=0; i<mite.length;i++){
                                data_detail.push(mite[i].split(':'));
                                for(var j=0;j<data_detail.length;j++){
                                    if(data_detail[j][0] == va_day5){
                                        data_time = data_detail[j][0];
                                        detail =data_detail[j][1];
                                    }
                                } 
                            }
                            if(detail!=0){
                                return '<input type="checkbox" data_time = "'+data_time+'" data_goodId = "'+row.goods_id+'" >'+
                                '<span style="margin-left: 10px;">'+detail+'</span>';
                            }
                            return '<span style="margin-left: 10px;">-</span>';       
                        
                    },
                      valign:'middle'
                    },{
                      field:null,
                      title:va_day6,
                    align:'center',
                    formatter:function(value,row,index1){
                        let mite = row.data1.split(',');
                            let data_time =0;
                            let detail =0;
                            let data_detail = [];
                            for(var i=0; i<mite.length;i++){
                                data_detail.push(mite[i].split(':'));
                                for(var j=0;j<data_detail.length;j++){
                                    if(data_detail[j][0] == va_day6){
                                        data_time = data_detail[j][0];
                                        detail =data_detail[j][1];
                                    }
                                } 
                            }
                            if(detail!=0){
                                return '<input type="checkbox" data_time = "'+data_time+'" data_goodId = "'+row.goods_id+'" >'+
                                '<span style="margin-left: 10px;">'+detail+'</span>';
                            }
                            return '<span style="margin-left: 10px;">-</span>';           
                        
                    },
                    valign:'middle'
                  },{
                  field:null,
                  title:va_day7,
                  align:'center',
                  formatter:function(value,row,index1){
                    let mite = row.data1.split(',');
                    let data_time =0;
                    let detail =0;
                    let data_detail = [];
                    for(var i=0; i<mite.length;i++){
                        data_detail.push(mite[i].split(':'));
                        for(var j=0;j<data_detail.length;j++){
                            if(data_detail[j][0] == va_day7){
                                data_time = data_detail[j][0];
                                detail =data_detail[j][1];
                            }
                        } 
                    }
                    if(detail!=0){
                        return '<input type="checkbox" data_time = "'+data_time+'" data_goodId = "'+row.goods_id+'" >'+
                        '<span style="margin-left: 10px;">'+detail+'</span>';
                    }
                    return '<span style="margin-left: 10px;">-</span>';           
                  },
                  valign:'middle'
              },{
                field:null,
                title:va_day8,
                align:'center',
                formatter:function(value,row,index1){
                    let mite = row.data1.split(',');
                            let data_time =0;
                            let detail =0;
                            let data_detail = [];
                            for(var i=0; i<mite.length;i++){
                                data_detail.push(mite[i].split(':'));
                                for(var j=0;j<data_detail.length;j++){
                                    if(data_detail[j][0] == va_day8){
                                        data_time = data_detail[j][0];
                                        detail =data_detail[j][1];
                                    }
                                } 
                            }
                            if(detail!=0){
                                return '<input type="checkbox" data_time = "'+data_time+'" data_goodId = "'+row.goods_id+'" >'+
                                '<span style="margin-left: 10px;">'+detail+'</span>';
                            }
                            return '<span style="margin-left: 10px;">-</span>';         
                },
                valign:'middle'
              }
	        ],onLoadSuccess:function(data){
               
	        },onExpandRow:function (index, row, $detail) {
                InitSubTable2(index, row, $detail);
            }
        });

    }

    (function(){
        //未结束的活动达成率子表 主表修改活动达成率
        $mcRepmentTable1Wrap.on('click','.dcl_btn',function(){
            var _self = $(this);
            var id = _self.attr('data-id');
            var brandName = $reportData.find('option:selected').text();
            var old_activity_replenish_rate = _self.prev().val();
            if(!old_activity_replenish_rate){
                return false;
            }

            $.ajax({
                url:"",
                dataType:'json',
                method : 'POST',
                data : {
                    "id" : id,
                    "brandName" : brandName,
                    "old_activity_replenish_rate" : old_activity_replenish_rate
                },
                success : function(data){
                    if(data.status == "success"){
                        alert("修改成功");
                    }else{
                        alert("修改失败");
                    }
                },error :function(){
                    alert("请求失败,请重试");
                }
            })
        });

        //未结束的活动达成率子表 表单中的修改预估活动达成率
        $mcRepmentTable1Wrap.on('click','.playokrote_btn',function(){
            var _self = $(this);
            var parentId = _self.attr('data-id'),
                old_activity_replenish_rate = _self.prev().val(),
                brandName = $reportData.find('option:selected').text(),
                goodsNo = _self.attr('data-goodsNo');
            if(!old_activity_replenish_rate){
                return false;
            }

            //修改活动单品表中的达成率接口
            $.ajax({
               url : '',
                dataType : 'json',
                method : 'POST',
                data : {
                    'parentId' : parentId,
                    'brandName' : brandName,
                    'goodsNo' : goodsNo,
                    'old_activity_replenish_rate' : old_activity_replenish_rate
                },
                success : function(data){
                    //待添加
                    if(data.status == "success"){
                        alert("修改成功");
                    }else{
                        alert("修改失败");
                    }
                },error : function(){
                    alert("请求失败,请重试");
                }
            });
        });

        //未结束的补货活动 底部品牌确认按钮
        $historyactive.find('.remove').show();
        $historyactive.find('.ok').hide();
        $(".unhistorical").on('click',function(){
            var brandCode = $reportData.val();
            var status = 2;
            $.ajax({
                url : '',
                dataType : 'json',
                method : 'POST',
                data : {
                    'brandCode' : brandCode,
                    'status' : status
                },
                success : function(data){
                    //待添加
                    if(data.status == "success"){
                        alert("修改成功");
                        var brandCode = $reportData.val();
                        $.ajax({
                            //url:"/maochao/survey/stock/selectBrandStatus",
                            dataType:'json',
                            method : 'POST',
                            data : {
                                "brandCode" : brandCode
                            },
                            success : function(data){
                                if(data.length>0){
                                    old_activity  = data[0].replenishment_status?data[0].replenishment_status:old_activity1;
                                }else{
                                    old_activity = old_activity1;
                                }
                                 var num1 = old_activity?old_activity.charAt(1):'';
                                 if(num1 == 1){
                                    $historyactive.find('.ok').show();
                                     $historyactive.find('.remove').hide();
                                 }else{
                                     $historyactive.find('.remove').show();
                                     $historyactive.find('.ok').hide();
                                 }
                            },
                            error : function(){
                                alert("请求失败,请重试");
                            }
                        });
                    }else{
                        alert("修改失败");
                    }
                },
                error : function(){
                    alert("请求失败,请重试");
                }
            });
        });

        //新活动  底部确认按钮
        $newactives.find('.remove').show();
        $newactives.find('.ok').hide();
        $(".new_active").on('click',function(){
            //请求方法结束
            var brandCode = $reportData.val();
            var status1 = 1;
            $.ajax({
                url : '',
                dataType : 'json',
                method : 'POST',
                data : {
                    'brandCode' : brandCode,
                    'status' : status1
                },
                success : function(data){
                    if(data.success){
                        alert("操作成功");
                        var brandCode = $reportData.val();
                        $.ajax({
                            url:"",
                            dataType:'json',
                            method : 'POST',
                            data : {
                                "brandCode" : brandCode
                            },
                            success : function(data){
                                if(data.length>0){
                                    old_activity  = data[0].replenishment_status?data[0].replenishment_status:old_activity1;
                                }else{
                                    old_activity = old_activity1;
                                }
                                 var num1 = old_activity?old_activity.charAt(1):'';
                                 if(num1 == 1){
                                    $historyactive.find('.ok').show();
                                     $historyactive.find('.remove').hide();
                                 }else{
                                     $historyactive.find('.remove').show();
                                     $historyactive.find('.ok').hide();
                                 }
                            },
                            error : function(){
                                alert("请求失败,请重试");
                            }
                        });
                    }else{
                        alert("操作失败");
                    }
                    
                },
                error : function(){
                    alert("请求失败,请重试");
                }
            });
        });

        //活动补报功能
        $mcRepmentTable3Wrap.on('click','.add_active',function(){
            $modal.modal('show');
        });



        //异常销量处理底部按钮
        $abnormalsales.find('.remove').show();
        $abnormalsales.find('.ok').hide();
        $(".abnormal_sales").on('click',function(){
            //请求方法结束
            var brandCode = $reportData.val();
            $.ajax({
                url : '',
                dataType : 'json',
                method : 'POST',
                data : {
                    'brandCode' : brandCode
                },
                success : function(data){
                    if(data.count>0){
                        alert("有活动审核未通过");
                    }else{
                         //请求方法结束
                        var brandCode = $reportData.val();
                        var status3 = 3;
                        $.ajax({
                           url : '',
                            dataType : 'json',
                            method : 'POST',
                            data : {
                                'brandCode' : brandCode,
                                'status' : status1
                            },
                            success : function(data){
                                if(data.count>0){
                                    alert("确认成功");
                                    var brandCode = $reportData.val();
                                    $.ajax({
                                      url:"",
                                        dataType:'json',
                                        method : 'POST',
                                        data : {
                                            "brandCode" : brandCode
                                         },
                                        success : function(data){
                                            if(data.length>0){
                                                old_activity  = data[0].replenishment_status?data[0].replenishment_status:old_activity1;
                                            }else{
                                                old_activity = old_activity1;
                                            }
                                             var num1 = old_activity?old_activity.charAt(1):'';
                                             if(num1 == 1){
                                                $abnormalsales.find('.ok').show();
                                                 $abnormalsales.find('.remove').hide();
                                             }else{
                                                 $abnormalsales.find('.remove').show();
                                                 $abnormalsales.find('.ok').hide();
                                             }
                                        },
                                        error : function(){
                                            alert("确认失败");
                                        }
                                    });
                                }else{
                                    alert("操作失败");
                                }
                                
                            },
                            error : function(){
                                alert("请求失败,请重试");
                            }
                        });
                    }
                    
                },
                error : function(){
                    alert("请求失败,请重试");
                }
            });
        });

        //一键提交活动补报按钮
        $key_prescribed.on('click',function(){
            //勾选数据拼接
            var day_news,day_one,day_two,day_three,day_four,day_five,day_six,day_seven,
            arr = [],arr1 = [],arr2 = [],arr3 = [],arr4 = [],arr5 = [],arr6 = [],arr7 = [];
            arr.splice(0,arr); arr1.splice(0,arr1); arr2.splice(0,arr2); arr3.splice(0,arr3); arr4.splice(0,arr4); arr5.splice(0,arr5);arr6.splice(0,arr6);arr7.splice(0,arr7);
            var brandCode = $reportData.val(),brandName = $reportData.find('option:selected').text();
            //获取勾选的品牌数据
            if( $("#mcRepmentTable3 tr").find("td").find("input[type=checkbox]").prop("checked")==true){
                //今天的数据
                
                if( $("#mcRepmentTable3 tr").find("td:eq(6)").find("input[type=checkbox]").prop("checked")==true){
                    $("#mcRepmentTable3 tr").find("td:eq(6)").find(":checkbox:checked").each(function(){
                        if($("#mcRepmentTable3 tr").find("td:eq(6)").find(":checkbox:checked").prop("checked")==true){
                            var good_id = $(this).attr('data_goodId');
                            arr.push(good_id);
                        }
                        
                    });
                    var date =$("#mcRepmentTable3 tr").find("td:eq(6)").find("input[type=checkbox]").attr('data_time');
                    var data = {
                      "data" : date,
                      "create_name": create_name,
                      "create_account":create_account,
                      "arr" : arr
                      }
                      day_news=data; 
                }

                //前一天的数据
                if( $("#mcRepmentTable3 tr").find("td:eq(7)").find("input[type=checkbox]").prop("checked")==true){
                    $("#mcRepmentTable3 tr").find("td:eq(7)").find(":checkbox:checked").each(function(){
                        if($("#mcRepmentTable3 tr").find("td:eq(7)").find(":checkbox:checked").prop("checked")==true){
                            var good_id = $(this).attr('data_goodId');
                            arr1.push(good_id);
                        }
                        
                    });
                    var date =$("#mcRepmentTable3 tr").find("td:eq(7)").find("input[type=checkbox]").attr('data_time');
                    var data = {
                      "data" : date,
                      "create_name": create_name,
                      "create_account":create_account,
                      "list" : arr1
                      }
                      day_one = data; 
                }

                //前两天的数据
                if( $("#mcRepmentTable3 tr").find("td:eq(8)").find("input[type=checkbox]").prop("checked")==true){
                    $("#mcRepmentTable3 tr").find("td:eq(8)").find(":checkbox:checked").each(function(){
                        if($("#mcRepmentTable3 tr").find("td:eq(8)").find(":checkbox:checked").prop("checked")==true){
                            var good_id = $(this).attr('data_goodId');
                            arr2.push(good_id);
                        }
                        
                    });
                    var date =$("#mcRepmentTable3 tr").find("td:eq(8)").find("input[type=checkbox]").attr('data_time');
                    var data = {
                      "data" : date,
                      "create_name": create_name,
                      "create_account":create_account,
                      "list" : arr2
                      }
                      day_two=data; 
                }

                //前三天的数据
                if( $("#mcRepmentTable3 tr").find("td:eq(9)").find("input[type=checkbox]").prop("checked")==true){
                    $("#mcRepmentTable3 tr").find("td:eq(9)").find(":checkbox:checked").each(function(){
                        if($("#mcRepmentTable3 tr").find("td:eq(9)").find(":checkbox:checked").prop("checked")==true){
                            var good_id = $(this).attr('data_goodId');
                            arr3.push(good_id);
                        }
                        
                    });
                    var date =$("#mcRepmentTable3 tr").find("td:eq(9)").find("input[type=checkbox]").attr('data_time');
                    var data = {
                      "data" : date,
                      "create_name": create_name,
                      "create_account":create_account,
                      "list" : arr3
                      }
                      day_three=data; 
                }
                //前四天的数据
                if( $("#mcRepmentTable3 tr").find("td:eq(10)").find("input[type=checkbox]").prop("checked")==true){
                    $("#mcRepmentTable3 tr").find("td:eq(10)").find(":checkbox:checked").each(function(){
                        if($("#mcRepmentTable3 tr").find("td:eq(10)").find(":checkbox:checked").prop("checked")==true){
                            var good_id = $(this).attr('data_goodId');
                            arr4.push(good_id);
                        }
                        
                    });
                    var date =$("#mcRepmentTable3 tr").find("td:eq(10)").find("input[type=checkbox]").attr('data_time');
                    var data = {
                      "data" : date,
                      "create_name": create_name,
                      "create_account":create_account,
                      "list" : arr4
                      }
                      day_four=data; 
                }

                //前五天的数据
                if( $("#mcRepmentTable3 tr").find("td:eq(11)").find("input[type=checkbox]").prop("checked")==true){
                    $("#mcRepmentTable3 tr").find("td:eq(11)").find(":checkbox:checked").each(function(){
                        if($("#mcRepmentTable3 tr").find("td:eq(11)").find(":checkbox:checked").prop("checked")==true){
                            var good_id = $(this).attr('data_goodId');
                            arr5.push(good_id);
                        }
                        
                    });
                    var date =$("#mcRepmentTable3 tr").find("td:eq(11)").find("input[type=checkbox]").attr('data_time');
                    var data = {
                      "data" : date,
                      "create_name": create_name,
                      "create_account":create_account,
                      "list" : arr5
                      }
                      day_five=data; 
                }

                //前六天的数据
                if( $("#mcRepmentTable3 tr").find("td:eq(12)").find("input[type=checkbox]").prop("checked")==true){
                    $("#mcRepmentTable3 tr").find("td:eq(12)").find(":checkbox:checked").each(function(){
                        if($("#mcRepmentTable3 tr").find("td:eq(12)").find(":checkbox:checked").prop("checked")==true){
                            var good_id = $(this).attr('data_goodId');
                            arr6=good_id;
                        }
                        
                    });
                    var date =$("#mcRepmentTable3 tr").find("td:eq(12)").find("input[type=checkbox]").attr('data_time');
                    var data = {
                      "data" : date,
                      "create_name": create_name,
                      "create_account":create_account,
                      "list" : arr6
                      }
                      day_six=data; 
                }


                ////前七天的数据
                if( $("#mcRepmentTable3 tr").find("td:eq(13)").find("input[type=checkbox]").prop("checked")==true){
                    $("#mcRepmentTable3 tr").find("td:eq(13)").find(":checkbox:checked").each(function(){
                        if($("#mcRepmentTable3 tr").find("td:eq(13)").find(":checkbox:checked").prop("checked")==true){
                            var good_id = $(this).attr('data_goodId');
                            arr7.push(good_id);
                        }
                        
                    });
                    var date =$("#mcRepmentTable3 tr").find("td:eq(13)").find("input[type=checkbox]").attr('data_time');
                    var data = {
                      "data" : date,
                      "create_name": create_name,
                      "create_account":create_account,
                      "list" : arr7
                      }
                      day_seven.push(data); 
                }
             }

             //数据整合
             var list = [];

             if(day_news){
                list.push(day_news);
             }
             if(day_one){
                list.push(day_one);
             }
             if(day_two){
                list.push(day_two);
             }
             if(day_three){
                list.push(day_three);
             }
             if(day_four){
                list.push(day_four);
             }if(day_five){
                list.push(day_five);
             }
             if(day_six){
                list.push(day_six);
             }
             if(day_seven){
                list.push(day_seven);
             }
             var data = {
                "brandCode" : brandCode,
                "brandName" : brandName,
                "list" :  list
             }
	     console.log(data);

            //ajax接口请求
            $.ajax({
                url : '',
                //dataType : 'json',
                method : 'POST',
                contentType: "application/json;charset=utf-8",
                data : JSON.stringify(data),
                success : function(data){
                    if(data.count == 1){
                        alert("操作成功");
                    }else if(data.count == 1){
                        alert("活动名称重复");
                    }else{
                        alert("操作失败");
                    }
                    
                },
                error : function(){
                    alert("请求失败,请重试");
                }
            });
        });

         //判断全选条件
        $day_all.click(function(){
            if(this.checked){ 
                $("#mcRepmentTable3 tr").find("td").find("input[type=checkbox]").prop("checked",true);
                $day.prop("checked",true);
                $day_one.prop("checked",true);
                $day_two.prop("checked",true);
                $day_three.prop("checked",true);
                $day_four.prop("checked",true);
                $day_five.prop("checked",true);
                $day_six.prop("checked",true);
                $day_server.prop("checked",true);
                $("#mcRepmentTable3 tr").find("td").find("input[type=checkbox]").change(function(){
                    if(!this.checked){
                    $day_all.prop("checked",false);
                    }
                });
            }else{
                $("#mcRepmentTable3 tr").find("td").find("input[type=checkbox]").prop("checked",false);
                $day.prop("checked",false);
                $day_one.prop("checked",false);
                $day_two.prop("checked",false);
                $day_three.prop("checked",false);
                $day_four.prop("checked",false);
                $day_five.prop("checked",false);
                $day_six.prop("checked",false);
                $day_server.prop("checked",false);
            }
            $("#mcRepmentTable3 tr").find("td").find("input[type=checkbox]").each(function(){
                if($(this).attr("checked")==true){
                    $day_all.prop("checked",true);
                }
            })
        });
    
        //判断今天的全选条件
        $day.on('click',function(){
            if(this.checked){ 
            $("#mcRepmentTable3 tr").find("td:eq(6)").find("input[type=checkbox]").prop("checked",true);
            $("#mcRepmentTable3 tr").find("td:eq(6)").find("input[type=checkbox]").change(function(){
                if(!this.checked){
                $day.prop("checked",false);
                }
            });
            }else{
                $("#mcRepmentTable3 tr").find("td:eq(6)").find("input[type=checkbox]").prop("checked",false);
            }
        });
    
        //判断前一天的全选条件
        $day_one.on('click',function(){
            if(this.checked){ 
                $("#mcRepmentTable3 tr").find("td:eq(7)").find("input[type=checkbox]").prop("checked",true);
                $("#mcRepmentTable3 tr").find("td:eq(7)").find("input[type=checkbox]").change(function(){
                if(!this.checked){
                    $day_one.prop("checked",false);
                }
            });
            }else{
                $("#mcRepmentTable3 tr").find("td:eq(7)").find("input[type=checkbox]").prop("checked",false);
            }
        });
    
        //判断前两天的全选条件
        $day_two.on('click',function(){
            if(this.checked){ 
                $("#mcRepmentTable3 tr").find("td:eq(8)").find("input[type=checkbox]").prop("checked",true);
                $("#mcRepmentTable3 tr").find("td:eq(8)").find("input[type=checkbox]").change(function(){
                if(!this.checked){
                    $day_two.prop("checked",false)
                }
                });
            }else{
                $("#mcRepmentTable3 tr").find("td:eq(8)").find("input[type=checkbox]").prop("checked",false);
            }
        });
    
        //判断前三天的全选条件
        $day_three.on('click',function(){
            if(this.checked){ 
                $("#mcRepmentTable3 tr").find("td:eq(9)").find("input[type=checkbox]").prop("checked",true);
                $("#mcRepmentTable3 tr").find("td:eq(9)").find("input[type=checkbox]").change(function(){
                    if(!this.checked){
                        $day_three.prop("checked",false)
                    }
                });
            }else{
                $("#mcRepmentTable3 tr").find("td:eq(9)").find("input[type=checkbox]").prop("checked",false);
            }
        });
    
        //判断前四天的全选条件
        $day_four.on('click',function(){
            if(this.checked){ 
                $("#mcRepmentTable3 tr").find("td:eq(10)").find("input[type=checkbox]").prop("checked",true);
                $("#mcRepmentTable3 tr").find("td:eq(10)").find("input[type=checkbox]").change(function(){
                    if(!this.checked){
                        $day_four.prop("checked",false)
                    }
                });
            }else{
                $("#mcRepmentTable3 tr").find("td:eq(10)").find("input[type=checkbox]").prop("checked",false);
            }
        });
    
        //判断前五天的全选条件
        $day_five.on('click',function(){
            if(this.checked){ 
                $("#mcRepmentTable3 tr").find("td:eq(11)").find("input[type=checkbox]").prop("checked",true);
                $("#mcRepmentTable3 tr").find("td:eq(11)").find("input[type=checkbox]").change(function(){
                    if(!this.checked){
                    $day_five.prop("checked",false)
                    }
                });
            }else{
                $("#mcRepmentTable3 tr").find("td:eq(11)").find("input[type=checkbox]").prop("checked",false);
            }
        });
    
        //判断前六天的全选条件
        $day_six.on('click',function(){
            if(this.checked){ 
                $("#mcRepmentTable3 tr").find("td:eq(12)").find("input[type=checkbox]").prop("checked",true);
                $("#mcRepmentTable3 tr").find("td:eq(12)").find("input[type=checkbox]").change(function(){
                    if(!this.checked){
                        $day_six.prop("checked",false)
                    }
                });
            }else{
                $("#mcRepmentTable3 tr").find("td:eq(12)").find("input[type=checkbox]").prop("checked",false);
            }
        });
    
          //判断前七天的全选条件
        $day_server.on('click',function(){
            if(this.checked){ 
                $("#mcRepmentTable3 tr").find("td:eq(13)").find("input[type=checkbox]").prop("checked",true);
                $("#mcRepmentTable3 tr").find("td:eq(13)").find("input[type=checkbox]").change(function(){
                    if(!this.checked){
                    $day_server.prop("checked",false)
                    }
                });
            }else{
            $("#mcRepmentTable3 tr").find("td:eq(13)").find("input[type=checkbox]").prop("checked",false);
            }
        });

    })();
    //异常销量处理结束
})();
