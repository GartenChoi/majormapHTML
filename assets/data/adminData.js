const palette = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074','#fb685b','#92d1d9', '#ffb293','#477056',  '#ffb653', '#f0d3cb','#434549','#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074','#fb685b','#92d1d9', '#ffb293','#477056',  '#ffb653', '#f0d3cb','#434549'];
let startDate = +new Date(2018, 1, 1);
let dates = [];
const parseDate=function(date){
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/')
};
while(parseDate(new Date(startDate))!==parseDate(new Date())){
    startDate += 24 * 3600 * 1000;
    dates.push(parseDate(new Date(startDate)));
}
const adminDefaultChartOption={
    line:{
        color:palette,
        grid: {top:40,right:40,bottom:80,left:40},
        tooltip: {trigger: 'axis', position: function (pt) {return [pt[0], '10%'];}},
        legend: {data:null,x:'right'},
        xAxis: {type: 'category', boundaryGap: false, data: dates},
        yAxis: {type: 'value', boundaryGap: [0, '100%']},
        dataZoom: [{
            type: 'inside', startValue:dates[dates.length-7]
        }, {
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {color: '#fff', shadowBlur: 3, shadowColor: 'rgba(0, 0, 0, 0.6)', shadowOffsetX: 2, shadowOffsetY: 2}
        }],
        series: null
    },
    bar:{
        grid: {top:40,right:40,bottom:40,left:40,containLabel:true},
        tooltip: {trigger:'axis', axisPointer:{type:'shadow'}},
        xAxis : [{
            type:'category',
            data:null,
            axisTick: {alignWithLabel: true}
        }],
        yAxis : [{type : 'value'}],
        series : [{
            type:'bar',
            barWidth: '60%',
            data:null
        }]
    }
};
const getAdminChartOption={
    line:(data)=>{
        let option=adminDefaultChartOption.line;
        option.legend.data=Object.keys(data);
        option.series=Object.keys(data).map(function(key){
            let returnValue={
                name:key,
                type:'line',
                symbol: 'none',
                sampling: 'average',
                data: data[key]
            };
            if(key.lastIndexOf('클릭 수')===key.length-4)returnValue.lineStyle={normal:{type:'dashed'}};
            return returnValue;
        });
        return option
    },
    bar:(data)=>{
        let option=adminDefaultChartOption.bar;
        option.xAxis[0].data=Object.keys(data);
        option.series[0].data=Object.values(data).map(function(value,index){return{
            value:value,
            itemStyle:{color:palette[index]}
        }});
        return option
    }
};

// @todo 예시데이터
function randomData(start,length){
    if(length===1)
    //숫자 하나
        return start+Math.round((Math.random() - 0.5) * start/2);
    let data=[start];
    for(let i=0;i<length-1;i++){
        data.push(start+Math.round((Math.random() - 0.5) * start/2))
    }
    // 숫자 7개 들어있는 배열
    return data;
}
const adminData={
    user:{
        // 최근 일주일 7개.
        '가입자 수':randomData(800,dates.length),
        '탈퇴자 수':randomData(100,dates.length),
        '총 이용자 수':randomData(900,dates.length)
    },
    click:{
        // 최근 일주일 7개.
        '상단 배너':{
            '상단 배너1 노출 수':randomData(800,dates.length),
            '상단 배너2 노출 수':randomData(500,dates.length),
            '상단 배너1 클릭 수':randomData(100,dates.length),
            '상단 배너2 클릭 수':randomData(100,dates.length)
        },
        '메인 배너':{
            '메인 배너1 노출 수':randomData(800,dates.length),
            '메인 배너2 노출 수':randomData(500,dates.length),
            '메인 배너1 클릭 수':randomData(100,dates.length),
            '메인 배너2 클릭 수':randomData(100,dates.length)
        },
        '하단 배너':{
            '하단 배너1 노출 수':randomData(800,dates.length),
            '하단 배너2 노출 수':randomData(500,dates.length),
            '하단 배너1 클릭 수':randomData(100,dates.length),
            '하단 배너2 클릭 수':randomData(100,dates.length)
        }
    },
    search:{
        // 최근 일주일 7개.
        대학:randomData(1000,dates.length),
        학과:randomData(1000,dates.length),
        전공분야:randomData(1000,dates.length)
    },
    studentuser:{
        // 전체 7개.
        초등학교:randomData(200,1),
        중학교:randomData(200,1),
        고등학교:randomData(200,1)
    },
    usertype:{
        // 전체 7개.
        이메일:randomData(200,1),
        구글:randomData(200,1),
        페이스북:randomData(200,1),
        네이버:randomData(200,1),
        카카오톡:randomData(200,1),
    },
};