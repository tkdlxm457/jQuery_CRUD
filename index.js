/**
 * 1. 토픽 목록을 불러온다.
 *  1.1. 불러온 데이터를 table에 렌더링한다.
 *  1.2. click 함수를 추가해서 선택된 row의 데이터를 객체에 저장한다.
 *  1.3. 선택된 row의 데이터를 입력상자에 바인딩 한다.
 * 
 * 2. 신규 데이터를 저장 요청한다.
 *  2.1. 입력상자에 입력 된 값을 서버에 저장요청 한다.
 * 
 * 3. row를 업데이트 한다.
 *  3.1. (1.2, 1.3)을 진행한다.
 *  3.2. 서버에 업데이트를 요청한다.
 * 
 * 4. row를 삭제한다.
 *  4.1. (1.2, 1.3)을 진행한다.
 *  4.2. 서버에 삭제를 요청한다.
 */
// http://tcpschool.com/jquery/jq_ajax_method

let topics = [];

$(document).ready(function () {
    getList();
});

function getList() {
    $.ajax({
        url: "http://localhost:3000/board",
        method: 'GET',
        dataType: "json",
        success: function (data) {
                    data.forEach((obj, index) => {
                        let tds = "";
                        for (const key in obj) {
                            if (Object.hasOwnProperty.call(obj, key)) {
                                const el = obj[key];
                                tds += `<td>${el}</td>`;
                            }
                        }
                        $("#t_list").append(`
                        <tr>
                            ${tds}
                        </tr>
                        `)          
                    });

                    // $.each(data, (index, obj) => {
                    //     $("#t_list").append
                    //     (`<tr>
                    //     <td>${obj.id}</td>
                    //     <td>${obj.description}</td>
                    //     <td>${obj.create}</td>
                    //     <td>${obj.author_id}</td>
                    //     </tr>`)     
                    // })

            // for(let i=0; i<=data.length; i++){
            //     $("#t_list").append
            //     (`<tr>
            //     <td>${data[i].id}</td>
            //     <td>${data[i].description}</td>
            //     <td>${data[i].create}</td>
            //     <td>${data[i].author_id}</td>
            //     </tr>`)
            // }
        },
        error: (error) => {
            console.log(error);
        },
        complete: () => {
            console.log("조회요청 완료!!!!!!!!");
        }
    });
}







function getTopics() {
    // XMLHttpRequest......

    // [TODO] ajax 구현 후 제거
    topics = [
        { id: 1, title: "타이틀입니다1.", description: "설명입니다1.", author_id: 1, create: "2021-07-08" },
        { id: 2, title: "타이틀입니다2.", description: "설명입니다2.", author_id: 1, create: "2021-07-08" },
        { id: 3, title: "타이틀입니다3.", description: "설명입니다3.", author_id: 1, create: "2021-07-08" },
        { id: 4, title: "타이틀입니다4.", description: "설명입니다4.", author_id: 1, create: "2021-07-08" },
    ];
};





























// let topics = [];

// function getTopics() {
//     // XMLHttpRequest......

//     // [TODO] ajax 구현 후 제거
//     topics = [
//         { id: 1, title: "타이틀입니다1.", description: "설명입니다1.", author_id: 1, create: "2021-07-08" },
//         { id: 2, title: "타이틀입니다2.", description: "설명입니다2.", author_id: 1, create: "2021-07-08" },
//         { id: 3, title: "타이틀입니다3.", description: "설명입니다3.", author_id: 1, create: "2021-07-08" },
//         { id: 4, title: "타이틀입니다4.", description: "설명입니다4.", author_id: 1, create: "2021-07-08" },
//     ];


//     // 1.1
//     var insertTr;

//     topics.forEach(topic => {
//         insertTr = ""

//         insertTr += `<tr onclick='selectRow(topic)'>`;
//         insertTr += `<td>${topic.id}</td>`;
//         insertTr += "<td>이순신</td>";
//         insertTr += "<td>부산</td>";
//         insertTr += "</tr>";

//         $("#tbody").append(insertTr);
//     });



// }

// function selectRow() {

// }

// function saveTopic() {

// }

// function updateTopic() {

// }

// function deleteTopic() {

// }